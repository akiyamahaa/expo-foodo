import { StyleSheet, TouchableOpacity, Image as RNImage } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
  useTheme,
  Image, // native-base Image (dễ style), nếu muốn RNImage thì dùng RNImage
  Pressable,
} from "native-base";
import {
  Bag2,
  DollarCircle,
  Gps,
  Location,
  Messages3,
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
import { IComment, IMenuItem, IRestaurant } from "../../type/restaurant";
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
// nếu bạn có Category enum utils thì giữ, còn không phần Bag2 vẫn render như cũ
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

  // ======= MENU STATE (NEW) =======
  const menu: IMenuItem[] = useMemo(() => res?.menu ?? [], [res?.menu]);
  const menuCats = useMemo(() => {
    const set = new Set<string>();
    (menu || []).forEach((m) => m.category && set.add(m.category));
    return ["all", ...Array.from(set)];
  }, [menu]);
  const [activeMenuCat, setActiveMenuCat] = useState<string>("all");

  const filteredMenu = useMemo(() => {
    if (activeMenuCat === "all") return menu;
    return (menu || []).filter((m) => m.category === activeMenuCat);
  }, [menu, activeMenuCat]);

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
        if (isBookmarkRes) {
          newFavourite = user.bookmark.filter((resId: string) => resId !== id);
        } else {
          newFavourite = [...user.bookmark, id];
        }
        const newUser = { ...user, bookmark: newFavourite };
        dispatch(setUser(newUser));
        await updateDoc(doc(firebaseDb, "users", user.phone), newUser);
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
      const check = comments.filter((cmt) => cmt.userId == user?.phone);
      setIsNotCommented(!Boolean(check.length));
      setListComment(comments);

      const averageRating =
        comments.reduce((total, curComment) => {
          return total + curComment.comment.avgRating;
        }, 0) / comments.length;
      setRating(averageRating || 0);
    };

    const getInfoRestaurant = async () => {
      try {
        dispatch(setLoading());
        const resRef = doc(firebaseDb, "restaurants-2", id);
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
      {/* Header + Cover */}
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

      {/* Info block */}
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
              ?.map((cat: any) => selectCategory?.[cat]?.label ?? cat)
              ?.toString()
              ?.replaceAll(",", " - ")}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"} alignItems="center">
          <HStack alignItems={"center"} space={1}>
            <DollarCircle size="20" color={colors.coolGray[500]} />
            <Text color={"coolGray.500"} fontWeight={400} fontSize={14}>
              {formatNumberToCurrency(res?.price?.min || 0, "đ")} -{" "}
              {formatNumberToCurrency(res?.price?.max || 0, "đ")}
            </Text>
          </HStack>
          <HStack space={2} alignItems={"center"}>
            {isNotCommented && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CommentForm", { id });
                }}
              >
                <Messages3 size="24" color={colors.coolGray[500]} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleBookmarkRes}>
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

      {/* ===== MENU SECTION (NEW) ===== */}
      <ScrollView>
        <VStack p={4} space={4}>
          {/* Header + Category Chips */}
          <VStack space={2}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontSize={16} fontWeight={800} color="#0F172A">
                Menu
              </Text>
              <Text fontSize={12} color="coolGray.500">
                {filteredMenu.length} món
              </Text>
            </HStack>

            {/* Chips đơn giản, không phụ thuộc CategoryPills để giảm ràng buộc */}
            <HStack flexWrap="wrap" space={2}>
              {menuCats.map((cat) => {
                const active = activeMenuCat === cat;
                return (
                  <Pressable key={cat} onPress={() => setActiveMenuCat(cat)}>
                    <Box
                      px={3}
                      py={1.5}
                      borderRadius={999}
                      bgColor={active ? "primary.600" : "coolGray.100"}
                    >
                      <Text fontSize={13} color={active ? "#fff" : "#0F172A"}>
                        {cat === "all" ? "Tất cả" : cat}
                      </Text>
                    </Box>
                  </Pressable>
                );
              })}
            </HStack>
          </VStack>

          {/* Danh sách món */}
          {filteredMenu.length === 0 ? (
            <Box py={8} alignItems="center">
              <Text color="coolGray.500">Chưa có món trong danh mục này.</Text>
            </Box>
          ) : (
            <VStack space={3}>
              {filteredMenu.map((m, idx) => (
                <HStack
                  key={`${m.id ?? idx}`}
                  space={3}
                  alignItems="center"
                  borderWidth={1}
                  borderColor="coolGray.200"
                  borderRadius="lg"
                  p={2}
                >
                  {/* Ảnh món */}
                  {m.photo ? (
                    <Image
                      alt={m.name}
                      source={{ uri: m.photo }}
                      width={90}
                      height={70}
                      borderRadius={10}
                      resizeMode="cover"
                      bg="coolGray.100"
                    />
                  ) : (
                    <Box
                      width={90}
                      height={70}
                      borderRadius={10}
                      bg="coolGray.100"
                    />
                  )}

                  {/* Thông tin món */}
                  <VStack flex={1} space={0.5}>
                    <Text
                      numberOfLines={1}
                      fontWeight={700}
                      fontSize={14}
                      color="#0F172A"
                    >
                      {m.name}
                    </Text>
                    {m.category ? (
                      <Text fontSize={12} color="coolGray.500">
                        {m.category}
                      </Text>
                    ) : null}
                    {typeof m.basePrice === "number" ? (
                      <Text
                        fontSize={13}
                        fontWeight={600}
                        color="primary.600"
                        mt={1}
                      >
                        {formatNumberToCurrency(m.basePrice, "đ")}
                      </Text>
                    ) : null}
                  </VStack>
                </HStack>
              ))}
            </VStack>
          )}

          {/* ===== COMMENTS ===== */}
          <VStack mt={6} space={3}>
            <HStack
              alignItems="center"
              justifyContent="space-between"
              mb={1}
              px={1}
            >
              <Text fontSize={16} fontWeight={800} color="#0F172A">
                Đánh giá ({listComment.length})
              </Text>
              {/* Có thể thêm Sort sau này: Mới nhất / Điểm cao */}
              {/* <Select ... /> */}
            </HStack>

            <VStack space={3}>
              {listComment.map((cmt) => (
                <RestaurantComment key={cmt.id} comments={cmt} />
              ))}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Restaurant;
