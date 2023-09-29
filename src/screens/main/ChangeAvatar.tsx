import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Center, VStack } from "native-base";
import Header from "../../components/Header";
import { Image } from "expo-image";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import * as ImagePicker from "expo-image-picker";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from "iconsax-react-native";
import { uploadImage } from "../../data/mockup";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import CustomButton from "../../components/CustomButton";
import { setUser } from "../../store/user.reducer";

type Props = {} & NativeStackScreenProps<RootStackParams, "ChangeAvatar">;

const ChangeAvatar = (props: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const [image, setImage] = useState<string | null>(user?.avatarUrl!);
  const { navigation } = props;

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

  const updateAvatar = async () => {
    const { avatarName, avatarUrl } = await uploadImage(image!);
    const newUser: any = {
      ...user,
      avatarName: avatarName,
      avatarUrl: avatarUrl,
    };
    await updateDoc(doc(firebaseDb, "users", user?.phone!), newUser);
    await dispatch(setUser(newUser));
    navigation.goBack();
  };
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader
        title="Xem trước ảnh đại diện"
        handleBtnBack={() => navigation.goBack()}
      />
      <VStack justifyContent={"space-between"} flex={1} p={12}>
        <Center flex={1}>
          <Box position={"relative"}>
            <Image
              source={{
                uri:
                  image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgc2u0F9JdscSSIM4LH0ca2FLNgVS-vat7LSZKFb73azHEfhVfW7vwnFaq5bidMl1_tsg&usqp=CAU",
              }}
              style={{ width: 256, height: 256, borderRadius: 500 }}
            />
          </Box>
          <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
            <Camera size="20" color="#1C1B1F" />
          </TouchableOpacity>
        </Center>
        <CustomButton btnText="Lưu" handleBtn={updateAvatar} />
      </VStack>
    </Box>
  );
};

export default ChangeAvatar;

const styles = StyleSheet.create({
  cameraBtn: {
    backgroundColor: "#D9D9D9",
    borderRadius: 40,
    padding: 8,
    bottom: 0,
    marginTop: -12,
  },
});
