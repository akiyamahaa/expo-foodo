import { StyleSheet } from "react-native";
import React from "react";
import { Box, Text, VStack } from "native-base";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";

type Props = {};

const Home = (props: Props) => {
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.HomeHeader />
      <VStack p={4} flex={1} space={4}>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </VStack>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
