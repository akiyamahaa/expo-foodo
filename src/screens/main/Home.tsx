import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, VStack } from "native-base";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { RootState, useAppSelector } from "../../store";
import { collection, getDocs } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { IRestaurant } from "../../type/restaurant";

type Props = {} & NativeStackScreenProps<RootStackParams, "TabNav">;

const Home = (props: Props) => {
  const [listRes, setListRes] = useState<IRestaurant[]>([]);
  const location = useAppSelector(
    (state: RootState) => state.location.location
  );
  const handleSearch = () => {};

  const fetchAllRestaurant = async () => {
    // TODO: Define type for book
    const queryRes = await getDocs(collection(firebaseDb, "restaurants"));
    const restaurants: IRestaurant[] = [];
    queryRes.forEach((doc: any) => {
      restaurants.push({ ...doc.data() });
    });
    setListRes(restaurants);
  };

  useEffect(() => {
    fetchAllRestaurant();
  }, []);

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.HomeHeader handleSearch={handleSearch} />
      <VStack p={4} flex={1} space={4}>
        {listRes.map((res) => (
          <Box key={res.id}>
            <ItemCard restaurant={res} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
