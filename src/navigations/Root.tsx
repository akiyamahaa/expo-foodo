import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ErrorOverlay from "../components/ErrorOverlay";
import LoadingOverlay from "../components/LoadingOverlay";
import { RootStackParams } from "./config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, useTheme } from "native-base";
import { StatusBar } from "expo-status-bar";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import AuthStack from "./AuthStack";
import TabNav from "./TabNav";
import Restaurant from "../screens/Restaurant";
import CommentForm from "../screens/CommentForm";
import NewPassword from "../screens/NewPassword";
import Policy from "../screens/Policy";

const Stack = createNativeStackNavigator<any>();

const Root = () => {
  // const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const user = true;

  return (
    <Box
      style={{
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: colors.primary[600],
        flex: 1,
      }}
    >
      <StatusBar style="light" />
      <LoadingOverlay />
      <ErrorOverlay />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Policy" component={Policy} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="CommentForm" component={CommentForm} />
          {user && <Stack.Screen name="TabNav" component={TabNav} />}
          <Stack.Screen name="Restaurant" component={Restaurant} />
          {!user && <Stack.Screen name="Auth" component={AuthStack} />}
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default Root;

const styles = StyleSheet.create({});
