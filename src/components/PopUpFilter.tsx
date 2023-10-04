import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Center,
  Modal,
  VStack,
  useTheme,
  HStack,
} from "native-base";
import { CloseSquare } from "iconsax-react-native";
import CustomSelect from "./CustomSelect";
import { selectCategory, selectDistrict } from "../data/utils";
import CustomButton from "./CustomButton";

type Props = {
  showModal: boolean;
  setShowModal: any;
  handleBtn: any;
};

const PopUpFilter = (props: Props) => {
  const { colors } = useTheme();
  const { showModal, setShowModal, handleBtn } = props;
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");

  const handleCancelFilter = () => {
    setDistrict("");
    setCategory("");
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => {}} size={"md"}>
        <Modal.Content>
          <Modal.Body>
            <VStack px={4}>
              <HStack
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={8}
              >
                <Text fontWeight={700} fontSize={20} color={"primary.600"}>
                  Bộ lọc
                </Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <CloseSquare size="32" color="#373737" />
                </TouchableOpacity>
              </HStack>
              <VStack space={8}>
                <VStack space={2}>
                  <CustomSelect
                    label="Khu vực"
                    placeholder="Quận"
                    value={district}
                    setValue={setDistrict}
                    selectData={selectDistrict}
                  />
                  <CustomSelect
                    label="Ẩm thực"
                    placeholder="Chọn loại"
                    value={category}
                    setValue={setCategory}
                    selectData={selectCategory}
                  />
                </VStack>
                <HStack justifyContent={"space-between"} space={4}>
                  <Box flex={1}>
                    <CustomButton
                      btnText="Lọc"
                      handleBtn={() => handleBtn(district, category)}
                    />
                  </Box>
                  <Box flex={1}>
                    <CustomButton
                      btnText="Hủy lọc"
                      handleBtn={handleCancelFilter}
                      background={"#fff"}
                      color={"red.100"}
                      active={false}
                    />
                  </Box>
                </HStack>
              </VStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default PopUpFilter;

const styles = StyleSheet.create({});
