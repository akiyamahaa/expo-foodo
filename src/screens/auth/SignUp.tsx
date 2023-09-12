import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, Center, Checkbox, HStack, Text, VStack } from "native-base";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";
import BoxContainer from "../../components/BoxContainer";

type Props = {};

const SignUp = (props: Props) => {
  const handleForgetPassScreen = () => {};
  return (
    <BoxContainer
      justifyContent={"center"}
      alignItems={"center"}
      px={6}
    >
      <VStack flex={1} justifyContent={"center"} space={4}>
        <InputLabel
          label="Số điện thoại"
          placeholder="Nhập số điện thoại/Email"
        />
        <InputLabel
          label="Nhập mật khẩu"
          placeholder="Nhập mật khẩu"
          showIcon={true}
          secureTextEntry={true}
        />
        <InputLabel
          label="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
          showIcon={true}
          secureTextEntry={true}
        />
        <Box mt={8}>
          <CustomButton btnText={"Đăng ký"} />
        </Box>
      </VStack>
      <HStack mb={16} space={1}>
        <Text fontWeight={400}>Bạn đã có tài khoản?</Text>
        <TouchableOpacity>
          <Text
            fontWeight={500}
            fontSize={12}
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </HStack>
    </BoxContainer>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
