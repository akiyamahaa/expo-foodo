import { StyleSheet } from "react-native";
import React from "react";
import { Box, Center, Text, VStack, useTheme } from "native-base";
import Header from "../components/Header";
import { Bookmark as BookmarkIcon } from "iconsax-react-native";
import ItemCard from "../components/ItemCard";

type Props = {};

const Bookmark = (props: Props) => {
  const { colors } = useTheme();
  const bookmark = true;
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader title="Đã lưu" />
      {bookmark ? (
        <Box flex={1}>
          <VStack p={4} flex={1} space={4}>
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </VStack>
        </Box>
      ) : (
        <Center flex={1}>
          <Box>
            <BookmarkIcon size="64" color={colors.coolGray[300]} />
          </Box>
          <Box>
            <Text fontWeight={400} fontSize={14} color={colors.coolGray[400]}>
              Bạn chưa lưu mục nào
            </Text>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Bookmark;

const styles = StyleSheet.create({});
