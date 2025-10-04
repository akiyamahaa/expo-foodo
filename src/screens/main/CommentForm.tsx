import { StyleSheet, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Center,
  Input,
  TextArea,
  VStack,
  useTheme,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { Camera } from "iconsax-react-native";
import RatingGroup from "../../components/RatingGroup";
import { collection, doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { IComment } from "../../type/restaurant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ensureSmallImage, uploadImage } from "../../utils/image";

type Props = {} & NativeStackScreenProps<RootStackParams, "CommentForm">;

const BUTTON_HEIGHT = 56;

const CommentForm = (props: Props) => {
  const { navigation, route } = props;
  const { id } = route.params;
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const handleBtnBack = () => navigation.goBack();

  const [rate, setRate] = useState({
    "Vị trí": 5,
    "Giá cả": 5,
    "Chất lượng": 5,
    "Dịch vụ": 5,
    "Không gian": 5,
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const ratingOption = [
    "Vị trí",
    "Giá cả",
    "Chất lượng",
    "Dịch vụ",
    "Không gian",
  ];

  const getValueRating = (value: number, title: string) => {
    setRate((prev) => ({ ...prev, [title]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      dispatch(setLoading());
      setImage(result.assets[0].uri);
      dispatch(removeLoading());
    }
  };

  const submittingRef = useRef(false);
  useEffect(
    () => () => {
      submittingRef.current = false;
    },
    []
  );

  const handleAddComment = async () => {
    if (!image || submittingRef.current) return;
    submittingRef.current = true;
    dispatch(setLoading());
    try {
      const avgRating = Number(
        Object.values(rate)
          .reduce((t, cur) => t + cur / 5, 0)
          .toFixed(1)
      );

      // 🔒 Resize/nén trước khi upload
      const safeUri = await ensureSmallImage(image);

      const { avatarName, avatarUrl } = await uploadImage(
        safeUri,
        `comments/${id}`
      );

      const fullComment: IComment = {
        userId: user?.phone!,
        resId: id,
        comment: {
          title,
          content,
          avgRating,
          imageUrl: avatarUrl,
          imageName: avatarName,
          timestamp: new Date(),
          vote: {},
        },
      };

      const commentDocRef = doc(collection(firebaseDb, "comments"));
      await setDoc(commentDocRef, { id: commentDocRef.id, ...fullComment });
      navigation.goBack();
    } catch (err) {
      console.log("upload/comment error:", err);
      // bạn có thể hiện Toast ở đây
    } finally {
      submittingRef.current = false;
      dispatch(removeLoading());
    }
  };

  const disabledComment = !title || !content || !image;

  return (
    <Box flex={1} bgColor="#fff">
      <Header.BasicHeader
        title="Viết bình luận"
        handleBtnBack={handleBtnBack}
      />

      {/* Đẩy nội dung khi bàn phím mở */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        {/* Cuộn toàn màn hình, không bị overlay bởi nút dưới */}
        <ScrollView
          flex={1}
          px={4}
          pt={6}
          // chừa chỗ cho footer button + safe area
          contentContainerStyle={{
            paddingBottom: BUTTON_HEIGHT + insets.bottom + 24,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <VStack space={4}>
            <Input
              p={3}
              fontSize={16}
              borderColor={colors.coolGray[300]}
              borderRadius={16}
              color={colors.coolGray[800]}
              placeholder="Tiêu đề"
              placeholderTextColor={colors.coolGray[400]}
              value={title}
              onChangeText={setTitle}
              returnKeyType="next"
              blurOnSubmit={false}
            />

            <TextArea
              borderRadius={16}
              p={4}
              fontSize={16}
              autoCompleteType={true}
              h={40}
              borderColor={colors.coolGray[300]}
              placeholder="Nội dung..."
              placeholderTextColor={colors.coolGray[400]}
              color={colors.coolGray[800]}
              w="100%"
              value={content}
              onChangeText={setContent}
            />

            <Center>
              <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
                <Camera size="20" color="#1C1B1F" />
              </TouchableOpacity>

              {image && (
                <Box width="100%" overflow="hidden">
                  <Image
                    source={{ uri: image }}
                    contentFit="cover"
                    style={{ width: "100%", height: 200, borderRadius: 12 }}
                  />
                </Box>
              )}
            </Center>

            <VStack space={4}>
              {ratingOption.map((value) => (
                <RatingGroup
                  key={value}
                  title={value}
                  getValueRating={getValueRating}
                />
              ))}
            </VStack>
          </VStack>
        </ScrollView>

        {/* Footer button cố định đáy, không bị bàn phím đè */}
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          px={4}
          pb={Math.max(insets.bottom, 8)}
          pt={8}
          bg="#fff"
          borderTopWidth={1}
          borderColor="coolGray.200"
        >
          <CustomButton
            btnText="Gửi"
            handleBtn={handleAddComment}
            disabled={disabledComment}
          />
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default CommentForm;

const styles = StyleSheet.create({
  cameraBtn: {
    backgroundColor: "#D9D9D9",
    borderRadius: 40,
    padding: 8,
    marginBottom: 12,
  },
});
