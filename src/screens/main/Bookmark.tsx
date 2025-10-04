import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Center, Text, VStack, useTheme } from "native-base";
import Header from "../../components/Header";
import { Bookmark as BookmarkIcon } from "iconsax-react-native";
import ItemCard from "../../components/ItemCard";
import { IRestaurantMockup } from "../../type/restaurant";
import { RootState, useAppSelector } from "../../store";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";

type Props = {};

const Bookmark = ({}: Props) => {
  const { colors } = useTheme();
  const user = useAppSelector((state: RootState) => state.user.user);

  const [listRes, setListRes] = useState<IRestaurantMockup[]>([]);

  const fetchBookmarkRes = async () => {
    const list: any = [];
    const resArr: any = user?.bookmark.map(async (resId) => {
      const resRef = doc(firebaseDb, "restaurants-2", resId);
      const resSnap = await getDoc(resRef);
      // TODO: remove id, it will added when created.
      list.push({ ...resSnap.data(), id: resId });
    });
    await Promise.all(resArr);
    setListRes(list);
  };

  useEffect(() => {
    fetchBookmarkRes();
  }, []);

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader title="Đã lưu" />
      {listRes.length > 0 ? (
        <Box flex={1}>
          <VStack p={4} flex={1} space={4}>
            {listRes.map((res) => (
              <Box key={res.id}>
                <ItemCard restaurant={res} />
              </Box>
            ))}
          </VStack>
        </Box>
      ) : (
        <Center flex={1}>
          <Box>
            <BookmarkIcon size="64" color={colors.coolGray[300]} />
          </Box>
          <Box>
            <Text fontWeight={400} fontSize={14} color={colors.coolGray[400]}>
              Bạn chưa lưu mục nào
            </Text>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Bookmark;

const styles = StyleSheet.create({});
