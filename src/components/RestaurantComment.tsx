import { StyleSheet } from "react-native";
import React from "react";
import { Box, HStack, Text, VStack } from "native-base";
import { Image } from "expo-image";

type Props = {};

const RestaurantComment = (props: Props) => {
  return (
    <VStack space={2}>
      <HStack alignItems={"center"} justifyContent={"space-between"}>
        <HStack alignItems={"center"} space={3}>
          <Box size={8} borderRadius={100} overflow={"hidden"}>
            <Image
              source={{
                uri: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
              }}
              style={{ width: 32, height: 32 }}
            />
          </Box>
          <VStack>
            <Text fontWeight={500} fontSize={14}>
              Charlie Siphron
            </Text>
            <Text fontWeight={400} fontSize={12} color="coolGray.500">
              26/08/23
            </Text>
          </VStack>
        </HStack>
        <Box>
          <Text fontWeight={700} fontSize={14} color="error.500">
            7.1
          </Text>
        </Box>
      </HStack>
      <Box>
        <Text fontWeight={400} fontSize={14}>
          Lorem ipsum dolor sit amet consectetur. Malesuada eget eu egestas
          pellentesque suspendisse
        </Text>
      </Box>
      <Box>
        <Image
          source={require("../../assets/comment_res.png")}
          style={{ height: 240, width: "100%" }}
        />
      </Box>
    </VStack>
  );
};

export default RestaurantComment;

const styles = StyleSheet.create({});
