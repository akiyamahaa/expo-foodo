import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Alert, Box, HStack, Text, VStack } from "native-base";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";
import BoxContainer from "../../components/BoxContainer";
import { useDispatch } from "react-redux";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { setUser } from "../../store/user.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserProfile } from "../../type/user";

type Props = {} & NativeStackScreenProps<RootStackParams, "Auth"> & any;

const Login = (props: Props) => {
  const { navigation } = props;
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleForgetPassScreen = () => {};
  const [phone, setPhone] = useState("0914728469");
  const [password, setPassword] = useState("12345678");

  const onForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogIn = async () => {
    dispatch(setLoading());
    try {
      const docRef = doc(firebaseDb, "users", phone);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.password !== password) {
          Alert("Sai mật khẩu");
        } else {
          const userProfile = {
            ...data,
          };
          await AsyncStorage.setItem("phone", phone);
          dispatch(setUser(userProfile as IUserProfile));
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("Số điện thoại chưa đăng ký");
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(removeLoading());
    }
  };
  return (
    <BoxContainer justifyContent={"center"} alignItems={"center"} px={6}>
      <VStack flex={1} justifyContent={"center"} space={4}>
        <InputLabel
          label="Số điện thoại"
          placeholder="Nhập số điện thoại/Email"
          value={phone}
          onChangeText={setPhone}

        />
        <InputLabel
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
          showIcon={true}
          value={password}
          onChangeText={setPassword}
        />
        <HStack justifyContent={"space-between"} mb={6}>
          <Box>
            {error && (
              <Text fontSize={12} fontWeight={400} color="error.500">
                {error}
              </Text>
            )}
          </Box>
          <TouchableOpacity onPress={onForgotPassword}>
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
          <CustomButton btnText={"Đăng nhập"} handleBtn={handleLogIn} />
        </Box>
      </VStack>
      <HStack mb={16} space={1}>
        <Text fontWeight={400} fontSize={14}>
          Bạn chưa có tài khoản?
        </Text>
        <TouchableOpacity onPress={onSignUp}>
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
