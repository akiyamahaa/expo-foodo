import { StyleSheet } from "react-native";
import React from "react";
import { Box, Text } from "native-base";

type Props = {
  btnText: string;
  active?: boolean;
};

const CustomButton = (props: Props) => {
  const { btnText, active = true } = props;
  return (
    <Box
      width="100%"
      borderRadius={100}
      bgColor={active ? "primary.600" : "muted.900"}
      p={3}
      borderColor={"primary.600"}
      borderWidth={1}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text
        fontWeight={500}
        fontSize={16}
        color={active ? "text.50" : "primary.600"}
      >
        {btnText}
      </Text>
    </Box>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
