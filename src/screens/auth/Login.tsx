import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, Center, Checkbox, HStack, Text, VStack } from "native-base";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";

type Props = {};

const Login = (props: Props) => {
  const handleForgetPassScreen = () => {};
  return (
    <Box
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"muted.900"}
      px={6}
    >
      <VStack flex={1} justifyContent={"center"} space={4}>
        <InputLabel
          label="Số điện thoại"
          placeholder="Nhập số điện thoại/Email"
        />
        <InputLabel
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          showIcon={true}
        />
        <HStack justifyContent={"space-between"} mb={6}>
          <HStack space={2}>
            <Checkbox
              value="test"
              accessibilityLabel="This is a dummy checkbox"
              borderRadius={100}
              backgroundColor={"transparent"}
            />
            <Text fontWeight={400} fontSize={12} color={"text.600"}>
              Ghi nhớ đăng nhập
            </Text>
          </HStack>
          <TouchableOpacity onPress={handleForgetPassScreen}>
            <Text
              fontSize={12}
              color={"text.600"}
              textDecorationLine={"underline"}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </HStack>
        <Box>
          <CustomButton btnText={"Đăng nhập"} />
        </Box>
      </VStack>
      <HStack mb={16} space={1}>
        <Text fontWeight={400}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity>
          <Text
            fontWeight={500}
            fontSize={12}
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            Đăng ký
          </Text>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default Login;

const styles = StyleSheet.create({});
