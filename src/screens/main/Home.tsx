import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, VStack } from "native-base";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { collection, getDocs } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { IRestaurant } from "../../type/restaurant";
import PopUpFilter from "../../components/PopUpFilter";

type Props = {} & NativeStackScreenProps<RootStackParams, "TabNav">;

const Home = (props: Props) => {
  const [listRes, setListRes] = useState<IRestaurant[]>([]);
  const [allRes, setAllRes] = useState<IRestaurant[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleSearch = (textSearch: string) => {
    if (textSearch) {
      const newRes = allRes.filter((res) => res.name.includes(textSearch));
      setListRes(newRes);
    } else {
      setListRes(allRes);
    }
  };

  const fetchAllRestaurant = async () => {
    // TODO: Define type for book
    const queryRes = await getDocs(collection(firebaseDb, "restaurants"));
    const restaurants: IRestaurant[] = [];
    queryRes.forEach((doc: any) => {
      restaurants.push({ ...doc.data() });
    });
    setListRes(restaurants);
    setAllRes(restaurants);
  };

  useEffect(() => {
    fetchAllRestaurant();
  }, []);

  const handleFilterBtn = (district: string, category: string) => {
    let newRestaurant = [];
    if (district && category) {
      newRestaurant = allRes.filter(
        (res) => res.category.includes(category) && res.district == district
      );
    } else if (district && !category) {
      newRestaurant = allRes.filter((res) => res.district == district);
    } else if (category && !district) {
      newRestaurant = allRes.filter((res) => res.category.includes(category));
    } else {
      newRestaurant = [...allRes];
    }
    setListRes(newRestaurant);
    setShowModal(false);
  };

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.HomeHeader
        handleSearch={handleSearch}
        handleFilter={() => setShowModal(true)}
      />
      <PopUpFilter
        showModal={showModal}
        setShowModal={setShowModal}
        handleBtn={handleFilterBtn}
      />
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
