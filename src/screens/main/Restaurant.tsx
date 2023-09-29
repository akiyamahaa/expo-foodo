import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import {
  Bag2,
  Bookmark,
  DollarCircle,
  Gps,
  Location,
  Messages3,
  Shop,
} from "iconsax-react-native";
import BackgroundLayout from "../../components/BackgroundLayout";
import RestaurantComment from "../../components/RestaurantComment";
import Header from "../../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { IComment, IRestaurant } from "../../type/restaurant";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import {
  formatNumberToCurrency,
  getStatus,
  haversineDistance,
} from "../../utils/utils";
import { removeLoading, setLoading } from "../../store/loading.reducer";
type Props = {} & NativeStackScreenProps<RootStackParams, "Restaurant">;

const Restaurant = (props: Props) => {
  const { navigation, route } = props;
  const { id } = route.params;
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [listComment, setListComment] = useState<IComment[]>([]);
  const [isNotCommented, setIsNotCommented] = useState<boolean | null>(null);
  const user = useAppSelector((state: RootState) => state.user.user);
  const location = useAppSelector(
    (state: RootState) => state.location.location
  );
  const isBookmarkRes = user?.bookmark.includes(id);

  const [res, setRes] = useState<IRestaurant>();

  const distanceUser = haversineDistance(
    res?.lat || 0,
    res?.lng || 0,
    location?.lat!,
    location?.lng!
  );

  const handleBookmarkRes = async () => {
    if (user) {
      let newFavourite;
      // check isFavourite
      if (isBookmarkRes) {
        newFavourite = user.bookmark.filter((resId: string) => resId !== id);
      } else {
        newFavourite = [...user.bookmark, id];
      }
      const newUser = {
        ...user,
        bookmark: newFavourite,
      };
      await updateDoc(doc(firebaseDb, "users", user.phone), newUser);
      // navigation.navigate("TabNav");
    }
  };

  useEffect(() => {
    const fetchComment = async () => {
      const q = query(
        collection(firebaseDb, "comments"),
        where("resId", "==", id)
      );
      const commentSnapShot = await getDocs(q);
      const comments: IComment[] = [];
      commentSnapShot.forEach((doc) => {
        comments.push(doc.data() as any);
      });
      // check user comment
      const check = comments.filter((cmt) => cmt.userId == user?.phone);
      setIsNotCommented(!Boolean(check.length));
      setListComment(comments);
    };
    const getInfoRestaurant = async () => {
      try {
        dispatch(setLoading());
        const resRef = doc(firebaseDb, "restaurants", id);
        const resSnap = await getDoc(resRef);
        setRes(resSnap.data() as IRestaurant);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(removeLoading());
      }
    };
    getInfoRestaurant();
    fetchComment();
  }, []);

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Box height="350">
        <BackgroundLayout
          imageSource={{
            uri: res && res.image,
          }}
        >
          <VStack flex={1} justifyContent={"space-between"}>
            <Header.BasicHeader
              bgColor="transparent"
              title=""
              handleBtnBack={() => navigation.goBack()}
            />
            <HStack px={5} pb={3} justifyContent={"space-between"}>
              <VStack space={2}>
                <Box>
                  <Text fontSize={16} fontWeight={700} color="#fff">
                    {res?.name}
                  </Text>
                </Box>
                <HStack space={1} alignItems={"center"}>
                  <Shop size="24" color="#fff" />
                  {/* <Text color="#fff">18 địa điểm cùng hệ thống</Text> */}
                </HStack>
              </VStack>
              <VStack justifyContent={"space-between"}>
                <Text
                  textTransform={"uppercase"}
                  fontWeight={700}
                  fontSize={14}
                  color="green.600"
                  shadow={6}
                >
                  {getStatus(res?.time.open!, res?.time.close!)}
                </Text>
                <Text fontSize={13} fontWeight={400} color="#fff">
                  {res?.time.open} - {res?.time.close}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </BackgroundLayout>
      </Box>
      <VStack
        p={4}
        space={2}
        borderBottomWidth={1}
        borderColor={"coolGray.200"}
      >
        <HStack alignItems={"center"} space={1}>
          <Location size="20" color={colors.coolGray[500]} />
          <Text color={"coolGray.500"} fontWeight={400} fontSize={14}>
            {res?.address}
          </Text>
        </HStack>
        <HStack alignItems={"center"} space={1}>
          <Gps size="20" color={colors.coolGray[500]} />
          <Text color={"primary.600"} fontWeight={500} fontSize={14}>
            {distanceUser.toFixed(2)} km
          </Text>
        </HStack>
        <HStack alignItems={"center"} space={1}>
          <Bag2 size="20" color={colors.coolGray[500]} />
          <Text color={"coolGray.500"} fontWeight={400} fontSize={14}>
            {res?.category.toString().replace(",", " - ")}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <HStack alignItems={"center"} space={1}>
            <DollarCircle size="20" color={colors.coolGray[500]} />
            <Text color={"coolGray.500"} fontWeight={400} fontSize={14}>
              {formatNumberToCurrency(res?.price.min || 0, "đ")} -{" "}
              {formatNumberToCurrency(res?.price.max || 0, "đ")}
            </Text>
          </HStack>
          <HStack space={2} alignItems={"center"}>
            {isNotCommented && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CommentForm", {
                    id: id,
                  });
                }}
              >
                <Messages3 size="24" color={colors.coolGray[500]} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleBookmarkRes}>
              <Bookmark
                size="24"
                color={
                  isBookmarkRes ? colors.primary[600] : colors.coolGray[500]
                }
              />
            </TouchableOpacity>
            <Center size="8" borderRadius={100} bgColor={"primary.600"}>
              <Text fontWeight={700} fontSize={14} color="#fff">
                7.2
              </Text>
            </Center>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={4} space={4}>
          {listComment.map((comments) => (
            <Box key={comments.id}>
              <RestaurantComment comments={comments} />
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Restaurant;

const styles = StyleSheet.create({});
