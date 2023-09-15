import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, HStack, Icon, Input, Text, VStack, useTheme } from "native-base";
import { Add, ArrowLeft2, Location, SearchNormal } from "iconsax-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

const HomeHeader = ({ name = "Jack 5M" }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      bgColor={"primary.600"}
      px={4}
      py={2}
      style={{ paddingTop: insets.top }}
    >
      <VStack space={2}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <HStack space={1}>
            <Box>
              <Location size="24" color="#fff" />
            </Box>
            <Text fontSize={16} color="#fff">
              Hà nội
            </Text>
          </HStack>
          <Box size={8} borderRadius={100} overflow={"hidden"}>
            <Image
              source={{
                uri: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
              }}
              style={{ width: 32, height: 32 }}
            />
          </Box>
        </HStack>
        <SearchingBar />
      </VStack>
    </Box>
  );
};

const SearchingBar = () => {
  const { colors } = useTheme();
  return (
    <Box mb={2}>
      <Input
        backgroundColor={"#fff"}
        borderRadius={100}
        px={1.5}
        py={3}
        placeholder="Tìm kiếm"
        placeholderTextColor={colors.muted[400]}
        InputLeftElement={
          <TouchableOpacity>
            <Icon
              as={<SearchNormal size="16" color={colors.muted[400]} />}
              size={5}
              ml="2"
              color="muted.400"
            />
          </TouchableOpacity>
        }
      />
    </Box>
  );
};

type Props = {
  handleBtnBack?: any;
  handleAdd?: any;
  handleDone?: any;
  handleSearch?: any;
  title: string;
  bgColor?: string;
};

const BasicHeader = (props: Props) => {
  const insets = useSafeAreaInsets();
  // set when have user
  const user = true;
  const {
    title,
    handleBtnBack = null,
    handleAdd = null,
    handleDone = null,
    handleSearch = null,
    bgColor = "primary.600",
  } = props;
  return (
    <Box bgColor={bgColor} px={4} py={2} style={{ paddingTop: insets.top }}>
      <HStack alignItems={"center"} justifyContent={"space-between"} mb={2}>
        {handleBtnBack ? (
          <TouchableOpacity onPress={handleBtnBack}>
            <ArrowLeft2 size="32" color="#fff" />
          </TouchableOpacity>
        ) : (
          <Box size={8} />
        )}
        <Text fontSize={16} fontWeight={500} color="#fff">
          {title}
        </Text>

        {handleAdd && (
          <TouchableOpacity onPress={handleAdd}>
            <Add size="32" color="#fff" />
          </TouchableOpacity>
        )}
        {handleDone && (
          <TouchableOpacity onPress={handleAdd}>
            <Text fontSize={16} fontWeight={500}>
              Xong
            </Text>
          </TouchableOpacity>
        )}
        {!handleAdd && !handleDone && <Box size={8} />}
      </HStack>
      {handleSearch && <SearchingBar />}
    </Box>
  );
};

export default {
  BasicHeader,
  HomeHeader,
};

const styles = StyleSheet.create({});
