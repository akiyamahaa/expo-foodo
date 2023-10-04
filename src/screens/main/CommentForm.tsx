import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Center, Input, TextArea, VStack, useTheme } from "native-base";
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
import { uploadImage } from "../../data/mockup";
import { collection, doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { IComment } from "../../type/restaurant";

type Props = {} & NativeStackScreenProps<RootStackParams, "CommentForm">;

const CommentForm = (props: Props) => {
  const { navigation, route } = props;
  const { id } = route.params;
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const handleBtnBack = () => {
    navigation.goBack();
  };
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
    const cloneRate = { ...rate, [title]: value };
    setRate(cloneRate);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.canceled) {
      dispatch(setLoading());
      setImage(result.assets[0].uri);
      dispatch(removeLoading());
    }
  };

  //TODO: Handle Rating Restaurant
  const handleAddComment = async () => {
    try {
      const avgRating = Object.values(rate)
        .reduce((total, current) => {
          return total + current / 5;
        }, 0)
        .toFixed(1);
      const { avatarName, avatarUrl } = await uploadImage(image!);
      const fullComment: IComment = {
        userId: user?.phone!,
        resId: id,
        comment: {
          title: title,
          content: content,
          avgRating: Number(avgRating),
          imageUrl: avatarUrl,
          imageName: avatarName,
          timestamp: new Date(),
          vote: {},
        },
      };
      const commentDocRef = doc(collection(firebaseDb, "comments"));
      await setDoc(commentDocRef, {
        id: commentDocRef.id,
        ...fullComment,
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const disabledComment = !title || !content || !image;

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader
        title="Viết bình luận"
        handleBtnBack={handleBtnBack}
      />
      <VStack flex={1} px={4} py={6} justifyContent={"space-between"}>
        <VStack space={4}>
          <Box>
            <Input
              p={3}
              fontSize={16}
              borderColor={colors.coolGray[300]}
              borderRadius={16}
              color={colors.coolGray[800]}
              placeholder="Tiêu đề (Không bắt buộc)"
              placeholderTextColor={colors.coolGray[400]}
              value={title}
              onChangeText={setTitle}
            />
          </Box>
          <Box>
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
          </Box>
          <Center>
            <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
              <Camera size="20" color="#1C1B1F" />
            </TouchableOpacity>
            {image && (
              <Box width={"100%"} overflow={"hidden"}>
                <Image
                  source={image && { uri: image }}
                  contentFit="contain"
                  style={{ width: "100%", height: 200 }}
                />
              </Box>
            )}
          </Center>
          <VStack space={4}>
            {ratingOption.map((value) => (
              <Box key={value}>
                <RatingGroup title={value} getValueRating={getValueRating} />
              </Box>
            ))}
          </VStack>
          {/* TODO: Make Add image Camera Func */}
        </VStack>
        <Box mb={4}>
          <CustomButton
            btnText="Gửi"
            handleBtn={handleAddComment}
            disabled={disabledComment}
          />
        </Box>
      </VStack>
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
