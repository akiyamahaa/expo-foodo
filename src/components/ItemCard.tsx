import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, HStack, Text, VStack, useTheme } from "native-base";
import { Image } from "expo-image";
import { Location, Star1 } from "iconsax-react-native";


type Props = {
  handleBtn: any;
};

const ItemCard = (props: Props) => {
  const { handleBtn } = props;
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={handleBtn}>
      <Box p={3} bgColor={"coolGray.100"} borderRadius={16}>
        <HStack space={4} alignItems={"center"}>
          <Box>
            <Image
              source={require("../../assets/restaurant1.png")}
              style={{ width: 120, height: 80 }}
            />
          </Box>
          <VStack space={2}>
            <Text fontWeight={700} fontSize={16}>
              Cà phê Ngon
            </Text>
            <HStack alignItems={"center"} space={2}>
              <Location size="16" color={colors.coolGray[500]} />
              <Text fontSize={12} fontWeight={400} color={colors.coolGray[500]}>
                2,5 Km
              </Text>
            </HStack>
            <HStack alignItems={"center"} space={1}>
              <Star1 size="16" color={colors.yellow[400]} variant="Bold" />
              <Text fontSize={12} fontWeight={400}>
                4,8
              </Text>
              <Text fontSize={12} fontWeight={400}>
                (310 đánh giá)
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({});
