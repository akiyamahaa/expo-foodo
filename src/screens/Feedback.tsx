import { StyleSheet } from "react-native";
import React from "react";
import { Box, Text, TextArea, VStack, useTheme } from "native-base";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";

type Props = {};

const Feedback = (props: Props) => {
  const { colors } = useTheme();
  const handleBtnBack = () => {};
  return (
    <Box flex={1} bgColor={"muted.900"}>
      <Header.BasicHeader handleBtnBack={handleBtnBack} title="Gửi phản hồi" />
      <VStack py={6} px={6} flex={1} justifyContent={"space-between"}>
        <TextArea
          backgroundColor={colors.muted[800]}
          borderRadius={16}
          p={4}
          fontSize={16}
          autoCompleteType={true}
          h={40}
          placeholder="Nội dung"
          placeholderTextColor={colors.text[500]}
          color={"white"}
          w="100%"
        />
        <Box>
          <CustomButton btnText="Gửi" />
        </Box>
      </VStack>
    </Box>
  );
};

export default Feedback;

const styles = StyleSheet.create({});
