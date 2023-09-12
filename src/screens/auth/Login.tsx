import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Box, HStack, Text, VStack } from "native-base";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";
import BoxContainer from "../../components/BoxContainer";

type Props = {};

const Login = (props: Props) => {
  const [error, setError] = useState("");
  const handleForgetPassScreen = () => {};
  return (
    <BoxContainer justifyContent={"center"} alignItems={"center"} px={6}>
      <VStack flex={1} justifyContent={"center"} space={4}>
        <InputLabel
          label="Số điện thoại"
          placeholder="Nhập số điện thoại/Email"
        />
        <InputLabel
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
          showIcon={true}
        />
        <HStack justifyContent={"space-between"} mb={6}>
          <Box>
            {error && (
              <Text fontSize={12} fontWeight={400} color="error.500">
                {error}
              </Text>
            )}
          </Box>
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
        <Box px={"20%"}>
          <CustomButton btnText={"Đăng nhập"} />
        </Box>
      </VStack>
      <HStack mb={16} space={1}>
        <Text fontWeight={400} fontSize={14}>
          Bạn chưa có tài khoản?
        </Text>
        <TouchableOpacity>
          <Text
            fontWeight={400}
            fontSize={14}
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            Đăng ký
          </Text>
        </TouchableOpacity>
      </HStack>
    </BoxContainer>
  );
};

export default Login;

const styles = StyleSheet.create({});
