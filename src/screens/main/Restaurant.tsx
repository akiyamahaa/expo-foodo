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
import { setUser } from "../../store/user.reducer";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { selectCategory } from "../../data/utils";
type Props = {} & NativeStackScreenProps<RootStackParams, "Restaurant">;

const Restaurant = (props: Props) => {
  const { navigation, route } = props;
  const { id } = route.params;
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [listComment, setListComment] = useState<IComment[]>([]);
  const [isNotCommented, setIsNotCommented] = useState<boolean | null>(null);
  const [rating, setRating] = useState(0);
  const user = useAppSelector((state: RootState) => state.user.user);
  const location = useAppSelector(
    (state: RootState) => state.location.location
  );
  const isBookmarkRes = user?.bookmark.includes(id);

  const isFocused = useIsFocused();

  const [res, setRes] = useState<IRestaurant | any>();
  const [textLen, setTextLen] = useState(10);

  const distanceUser = haversineDistance(
    res?.lat || 0,
    res?.lng || 0,
    location?.lat!,
    location?.lng!
  );

  const handleBookmarkRes = async () => {
    dispatch(setLoading());
    try {
      if (user) {
        let newFavourite;
        // check isFavourite
        if (isBookmarkRes) {
          newFavourite = user.bookmark.filter((resId: string) => resId !== id);
        } else {
          newFavourite = [...user.bookmark, id];
        }
        // console.log(newFavourite);

        const newUser = {
          ...user,
          bookmark: newFavourite,
        };

        dispatch(setUser(newUser));

        await updateDoc(doc(firebaseDb, "users", user.phone), newUser);
        // navigation.navigate("TabNav");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(removeLoading());
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

      // Calculate Average Rating
      const averageRating =
        comments.reduce((total, curComment) => {
          return total + curComment.comment.avgRating;
        }, 0) / comments.length;
      setRating(averageRating || 0);
    };
    const getInfoRestaurant = async () => {
      try {
        dispatch(setLoading());
        const resRef = doc(firebaseDb, "restaurants", id);
        const resSnap = await getDoc(resRef);
        setRes(resSnap.data() as IRestaurant);
        setTextLen(resSnap.data()!.name.length);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(removeLoading());
      }
    };
    getInfoRestaurant();
    fetchComment();
  }, [isFocused]);

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Box height="240">
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
              <VStack space={2} style={{ alignSelf: "center", flex: 1 }}>
                <Text
                  fontSize={textLen < 30 ? 20 : 16}
                  fontWeight={700}
                  color="#fff"
                  paddingRight={8}
                >
                  {res?.name}
                </Text>
              </VStack>
              <VStack justifyContent={"flex-end"}>
                <Text
                  textTransform={"uppercase"}
                  fontWeight={700}
                  fontSize={14}
                  color={
                    getStatus(res?.time?.open, res?.time?.close) ==
                    "Đã đóng cửa"
                      ? "red.600"
                      : "green.600"
                  }
                  shadow={6}
                >
                  {getStatus(res?.time?.open, res?.time?.close)}
                </Text>
                <Text fontSize={13} fontWeight={400} color="#fff">
                  {res?.time?.open} - {res?.time?.close}
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
          <Text
            color={"coolGray.500"}
            fontWeight={400}
            fontSize={14}
            paddingRight={8}
          >
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
            {res?.category
              .map((cat: any) => selectCategory[cat].label)
              .toString()
              .replaceAll(",", " - ")}
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
                    // restaurant: {
                    //   ...res,
                    //   rating: rating || 0,
                    //   commentCount: listComment.length || 0,
                    // },
                  });
                }}
              >
                <Messages3 size="24" color={colors.coolGray[500]} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                handleBookmarkRes();
              }}
            >
              <Ionicons
                name={isBookmarkRes ? "bookmark" : "bookmark-outline"}
                size={24}
                color={
                  isBookmarkRes ? colors.primary[600] : colors.coolGray[500]
                }
              />
            </TouchableOpacity>
            <Center size="8" borderRadius={100} bgColor={"primary.600"}>
              <Text fontWeight={700} fontSize={14} color="#fff">
                {rating.toFixed(1)}
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
