import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, HStack, Text, VStack } from "native-base";
import { Image } from "expo-image";
import { ICommentForm } from "../type/restaurant";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { IUserProfile } from "../type/user";
import { getDMY } from "../utils/utils";

type Props = {
  comments: ICommentForm;
  userId: string;
};

const RestaurantComment = (props: Props) => {
  const { comments } = props;
  const [user, setUser] = useState<IUserProfile>();

  const getUserFromId = async () => {
    const userRef = doc(firebaseDb, "users", props.userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as any as IUserProfile;
    setUser(userData);
  };

  useEffect(() => {
    getUserFromId();
  }, []);

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
              {user?.fullname}
            </Text>
            <Text fontWeight={400} fontSize={12} color="coolGray.500">
              {getDMY(comments.timestamp)}
            </Text>
          </VStack>
        </HStack>
        <Box>
          <Text fontWeight={700} fontSize={14} color="error.500">
            {comments.avgRating}
          </Text>
        </Box>
      </HStack>
      <Box>
        <Text fontWeight={700} fontSize={16}>
          {comments.title}
        </Text>
        <Text fontWeight={400} fontSize={14}>
          {comments.content}
        </Text>
      </Box>
      <Box>
        <Image
          source={{ uri: comments.imageUrl }}
          alt={comments.imageName}
          style={{ height: 240, width: "100%", borderRadius: 8 }}
        />
      </Box>
    </VStack>
  );
};

export default RestaurantComment;

const styles = StyleSheet.create({});
