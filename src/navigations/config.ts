import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParams = {
  Auth?: NavigatorScreenParams<AuthStackParams>;
  TabNav?: undefined;
  CreateMenu: undefined;
  CreateMenu2: undefined;
  BMI: undefined;
  Setting: undefined;
};
export type BottomTabsParams = {
  Home: undefined;
  Bookmark: undefined;
  Profile: undefined;
};

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
  Phone: undefined;
  OTP: undefined;
  ChangePassword: undefined;
};
