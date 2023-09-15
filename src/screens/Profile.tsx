import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  Avatar,
  Box,
  HStack,
  IBoxProps,
  Text,
  VStack,
  useTheme,
} from "native-base";
import Header from "../components/Header";
import {
  ArrowRight2,
  InfoCircle,
  Lock,
  MessageQuestion,
} from "iconsax-react-native";
import CustomButton from "../components/CustomButton";

type Props = {};

const BoxInfo = ({ type }: { type: string }) => {
  const { colors } = useTheme();
  let title, IconTag;
  if (type == "password") {
    title = "Mật khẩu";
    IconTag = <Lock size="32" color={colors.coolGray[500]} variant="Bold" />;
  } else if (type == "info") {
    title = "Thông tin";
    IconTag = (
      <InfoCircle size="32" color={colors.coolGray[500]} variant="Bold" />
    );
  } else if (type == "policy") {
    title = "Chính sách bảo mật";
    IconTag = (
      <MessageQuestion size="32" color={colors.coolGray[500]} variant="Bold" />
    );
  }
  return (
    <TouchableOpacity>
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
  const { colors } = useTheme();
  const type = ["password", "info", "policy"];
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader title="Cá nhân" />
      <VStack flex={1} px={4} py={6} justifyContent={"space-between"}>
        <VStack space={4}>
          <TouchableOpacity>
            <Box p={3} borderRadius={16} bgColor={"coolGray.100"}>
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <HStack alignItems={"center"} space={4}>
                  <Avatar
                    size="12"
                    source={{
                      uri: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
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
          <CustomButton btnText="Đăng xuất" />
        </Box>
      </VStack>
    </Box>
  );
};

export default Profile;

const styles = StyleSheet.create({});