// src/components/PopUpFilter.tsx
import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
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
import CustomSelect from "./CustomSelect"; // (bản mới ở dưới)
import CustomButton from "./CustomButton";
import { selectCategory, selectDistrict } from "../firebase/data/utils";

type Props = {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  handleBtn: (district: string, category: string) => void;
};

const PopUpFilter = ({ showModal, setShowModal, handleBtn }: Props) => {
  const { colors } = useTheme();
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");

  const handleCancelFilter = () => {
    setDistrict("");
    setCategory("");
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <Modal.Content>
          {/* DÙNG Box thay cho Modal.Body để tránh ScrollView */}
          <Box px={4} py={4}>
            <VStack>
              <HStack alignItems="center" justifyContent="space-between" mb={8}>
                <Text fontWeight={700} fontSize={20} color="primary.600">
                  Bộ lọc
                </Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <CloseSquare size="32" color="#373737" />
                </TouchableOpacity>
              </HStack>

              <VStack space={8}>
                <VStack space={4}>
                  <CustomSelect
                    label="Khu vực"
                    placeholder="Quận"
                    value={district}
                    onChange={setDistrict}
                    options={selectDistrict}
                  />
                  <CustomSelect
                    label="Ẩm thực"
                    placeholder="Chọn loại"
                    value={category}
                    onChange={setCategory}
                    options={selectCategory}
                  />
                </VStack>

                <HStack justifyContent="space-between" space={4}>
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
                      background="#fff"
                      color="red.100"
                      active={false}
                    />
                  </Box>
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default PopUpFilter;

const styles = StyleSheet.create({});
