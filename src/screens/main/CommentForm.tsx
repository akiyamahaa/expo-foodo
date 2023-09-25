import { StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Box,
  HStack,
  Input,
  Slider,
  Text,
  TextArea,
  VStack,
  useTheme,
} from "native-base";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";

type Props = {};
type RatingProps = {
  title: string;
  handleValue?: () => {};
};
const Rating = (props: RatingProps) => {
  const [onChangeValue, setOnChangeValue] = useState(5);
  return (
    <Box width="100%" px={2}>
      <HStack space={3} alignItems={"center"}>
        <Box width={20}>
          <Text fontWeight={400} fontSize={14}>
            {props.title}
          </Text>
        </Box>
        <Box flex={1}>
          <Slider
            maxValue={10}
            minValue={0}
            defaultValue={5}
            size="md"
            onChange={(v) => {
              setOnChangeValue(Math.floor(v));
            }}
            // onChangeEnd={(v) => {
            //   v && setOnChangeEndValue(Math.floor(v));
            // }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb bgColor={"#fff"} shadow={1} />
          </Slider>
        </Box>
        <Box>
          <Text fontWeight={400} fontSize={16}>
            {onChangeValue}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

const CommentForm = (props: Props) => {
  const { colors } = useTheme();
  const handleBtnBack = () => {};

  const ratingOption = [
    "Vị trí",
    "Giá cả",
    "Chất lượng",
    "Dịch vụ",
    "Không gian",
  ];

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader
        title="Viết bình luận"
        handleBtnBack={handleBtnBack}
      />
      <VStack flex={1} px={4} py={6} justifyContent={"space-between"}>
        <VStack space={4}>
          <Box>
            <Input
              p={3}
              fontSize={16}
              borderColor={colors.coolGray[300]}
              borderRadius={16}
              color={colors.coolGray[800]}
              placeholder="Tiêu đề (Không bắt buộc)"
              placeholderTextColor={colors.coolGray[400]}
            />
          </Box>
          <Box>
            <TextArea
              borderRadius={16}
              p={4}
              fontSize={16}
              autoCompleteType={true}
              h={40}
              borderColor={colors.coolGray[300]}
              placeholder="Nội dung..."
              placeholderTextColor={colors.coolGray[400]}
              color={colors.coolGray[800]}
              w="100%"
            />
          </Box>
          <VStack space={4}>
            {ratingOption.map((value) => (
              <Box key={value}>
                <Rating title={value} />
              </Box>
            ))}
          </VStack>
          {/* TODO: Make Add image Camera Func */}
        </VStack>
        <Box mb={4}>
          <CustomButton btnText="Gửi" />
        </Box>
      </VStack>
    </Box>
  );
};

export default CommentForm;

const styles = StyleSheet.create({});
