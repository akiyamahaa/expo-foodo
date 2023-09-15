import { StyleSheet } from "react-native";
import React from "react";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import BackgroundLayout from "../components/BackgroundLayout";
import Header from "../components/Header";
import {
  Bag2,
  Bookmark,
  DollarCircle,
  Gps,
  Location,
  Messages3,
  Shop,
} from "iconsax-react-native";
import RestaurantComment from "../components/RestaurantComment";

type Props = {};

const Restaurant = (props: Props) => {
  const { colors } = useTheme();
  const handleBtnBack = () => {};
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Box height="350">
        <BackgroundLayout
          imageSource={require("../../assets/restaurant_image.png")}
        >
          <VStack flex={1} justifyContent={"space-between"}>
            <Header.BasicHeader
              bgColor="transparent"
              title=""
              handleBtnBack={handleBtnBack}
            />
            <HStack px={5} pb={3} justifyContent={"space-between"}>
              <VStack space={2}>
                <Box>
                  <Text fontSize={16} fontWeight={700} color="#fff">
                    Cà Phê Ngon
                  </Text>
                </Box>
                <HStack space={1} alignItems={"center"}>
                  <Shop size="24" color="#fff" />
                  <Text color="#fff">18 địa điểm cùng hệ thống</Text>
                </HStack>
              </VStack>
              <VStack justifyContent={"space-between"}>
                <Text
                  textTransform={"uppercase"}
                  fontWeight={500}
                  fontSize={12}
                  color="green.600"
                >
                  Đang mở cửa
                </Text>
                <Text fontSize={12} fontWeight={400} color="#fff">
                  09:00 - 22:30
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </BackgroundLayout>
      </Box>
      <VStack
        p={4}
        space={2}
        borderBottomWidth={1}
        borderColor={"coolGray.200"}
      >
        <HStack alignItems={"center"} space={1}>
          <Location size="20" color={colors.coolGray[500]} />
          <Text color={"coolGray.500"} fontWeight={400} fontSize={14}>
            539 Lĩnh Nam, P.Lĩnh Nam, Q.Hoàng Mai, Hà Nội
          </Text>
        </HStack>
        <HStack alignItems={"center"} space={1}>
          <Gps size="20" color={colors.coolGray[500]} />
          <Text color={"primary.600"} fontWeight={500} fontSize={14}>
            2,5 Km
          </Text>
        </HStack>
        <HStack alignItems={"center"} space={1}>
          <Bag2 size="20" color={colors.coolGray[500]} />
          <Text color={"coolGray.500"} fontWeight={400} fontSize={14}>
            Cafe/Dessert - Món Việt
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <HStack alignItems={"center"} space={1}>
            <DollarCircle size="20" color={colors.coolGray[500]} />
            <Text color={"coolGray.500"} fontWeight={400} fontSize={14}>
              30,000đ - 60,000đ
            </Text>
          </HStack>
          <HStack space={2} alignItems={"center"}>
            <Messages3 size="24" color="#FF8A65" />
            <Bookmark size="24" color="#FF8A65" />
            <Center size="8" borderRadius={100} bgColor={"primary.600"}>
              <Text fontWeight={700} fontSize={14} color="#fff">
                7.2
              </Text>
            </Center>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={4} space={4}>
          <RestaurantComment />
          <RestaurantComment />
          <RestaurantComment />
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Restaurant;

const styles = StyleSheet.create({});
