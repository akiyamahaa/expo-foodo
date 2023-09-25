import { StyleSheet } from "react-native";
import React from "react";
import { Box, Text, VStack } from "native-base";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";

type Props = {} & NativeStackScreenProps<RootStackParams, "TabNav">;

const Home = (props: Props) => {
  const { navigation } = props;
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.HomeHeader />
      <VStack p={4} flex={1} space={4}>
        <ItemCard handleBtn={() => navigation.navigate("Restaurant")} />
        <ItemCard handleBtn={() => navigation.navigate("Restaurant")} />
        <ItemCard handleBtn={() => navigation.navigate("Restaurant")} />
        <ItemCard handleBtn={() => navigation.navigate("Restaurant")} />
      </VStack>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
