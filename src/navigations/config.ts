import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParams = {
  Auth?: NavigatorScreenParams<AuthStackParams>;
  TabNav?: undefined;
  CreateMenu: undefined;
  CreateMenu2: undefined;
  BMI: undefined;
  Setting: undefined;
  Policy: undefined;
  NewPassword: undefined;
  CommentForm: {
    id: string;
  };
  Restaurant: {
    id: string;
  };
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
  ForgotPassword: undefined;
  PostAuth: {
    phone: string;
    password: string;
  };
};
