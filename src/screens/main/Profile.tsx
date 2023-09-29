import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Box, HStack, Text, VStack, useTheme } from "native-base";
import {
  ArrowRight2,
  InfoCircle,
  Lock,
  MessageQuestion,
} from "iconsax-react-native";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { removeUser } from "../../store/user.reducer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { useNavigation } from "@react-navigation/native";

type Props = {} & NativeStackScreenProps<RootStackParams, "TabNav">;

const BoxInfo = ({ type }: { type: string }) => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  let title, IconTag;
  if (type == "Password") {
    title = "Mật khẩu";
    IconTag = <Lock size="32" color={colors.coolGray[500]} variant="Bold" />;
  } else if (type == "UserInfo") {
    title = "Thông tin";
    IconTag = (
      <InfoCircle size="32" color={colors.coolGray[500]} variant="Bold" />
    );
  } else if (type == "Policy") {
    title = "Chính sách bảo mật";
    IconTag = (
      <MessageQuestion size="32" color={colors.coolGray[500]} variant="Bold" />
    );
  }
  return (
    <TouchableOpacity onPress={() => navigation.navigate(type)}>
      <HStack alignItems={"center"} justifyContent={"space-between"}>
        <HStack space={3} alignItems={"center"} py={4}>
          {IconTag}
          <Text fontWeight={400} fontSize={16} color={"coolGray.800"}>
            {title}
          </Text>
        </HStack>
        <Box>
          <ArrowRight2 size="24" color={colors.coolGray[300]} />
        </Box>
      </HStack>
    </TouchableOpacity>
  );
};

const Profile = (props: Props) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const type = ["Password", "UserInfo", "Policy"];

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(removeUser());
  };

  const handleAvatar = () => {
    navigation.navigate("ChangeAvatar");
  };
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader title="Cá nhân" />
      <VStack flex={1} px={4} py={6} justifyContent={"space-between"}>
        <VStack space={4}>
          <TouchableOpacity onPress={handleAvatar}>
            <Box p={3} borderRadius={16} bgColor={"coolGray.100"}>
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <HStack alignItems={"center"} space={4}>
                  <Avatar
                    size="12"
                    source={{
                      uri:
                        user?.avatarUrl ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgc2u0F9JdscSSIM4LH0ca2FLNgVS-vat7LSZKFb73azHEfhVfW7vwnFaq5bidMl1_tsg&usqp=CAU",
                    }}
                  />
                  <Box>
                    <Text fontWeight={400} fontSize={16}>
                      Đổi hình đại diện
                    </Text>
                  </Box>
                </HStack>
                <Box>
                  <ArrowRight2 size="24" color={colors.coolGray[300]} />
                </Box>
              </HStack>
            </Box>
          </TouchableOpacity>
          <Box px={4} borderRadius={16} bgColor={"coolGray.100"}>
            {type.map((value) => (
              <Box
                key={value}
                borderBottomWidth={1}
                borderColor={"coolGray.200"}
              >
                <BoxInfo type={value} />
              </Box>
            ))}
          </Box>
        </VStack>
        <Box>
          <CustomButton btnText="Đăng xuất" handleBtn={handleLogout} />
        </Box>
      </VStack>
    </Box>
  );
};

export default Profile;

const styles = StyleSheet.create({});
