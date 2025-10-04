import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Box, HStack, VStack, Text, useTheme, Pressable } from "native-base";
import { Image } from "expo-image";
import { DirectDown, DirectUp } from "iconsax-react-native";
import { Ionicons } from "@expo/vector-icons";
import { IComment } from "../type/restaurant";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { IUserProfile } from "../type/user";
import { getDMY } from "../utils/utils";
import { useAppSelector, RootState } from "../store";

type Props = {
  comments: IComment;
};

const StarRow = ({ value }: { value: number }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const arr = new Array(5)
    .fill(0)
    .map((_, i) => (i < full ? "full" : i === full && half ? "half" : "empty"));
  return (
    <HStack space={0.5}>
      {arr.map((t, idx) => (
        <Ionicons
          key={idx}
          name={
            t === "full" ? "star" : t === "half" ? "star-half" : "star-outline"
          }
          size={14}
          color="#F59E0B"
        />
      ))}
    </HStack>
  );
};

const RestaurantComment = ({ comments }: Props) => {
  const { colors } = useTheme();
  const currentUser = useAppSelector((s: RootState) => s.user.user);
  const [commentState, setCommentState] = useState<IComment>(comments);
  const [user, setUser] = useState<IUserProfile | undefined>();
  const [expanded, setExpanded] = useState(false);

  // Tổng điểm = up - down
  const score = useMemo(() => {
    const votes = Object.values(commentState.comment.vote || {});
    const up = votes.filter((v) => v === 1).length;
    const down = votes.filter((v) => v === -1).length;
    return up - down;
  }, [commentState.comment.vote]);

  // Người dùng hiện tại đã vote gì?
  const myVote: -1 | 0 | 1 = useMemo(() => {
    const uid = currentUser?.phone;
    if (!uid) return 0;
    const v = (commentState.comment.vote || {})[
      uid as keyof typeof commentState.comment.vote
    ];
    return (v as -1 | 1) ?? 0;
  }, [commentState.comment.vote, currentUser?.phone]);

  useEffect(() => {
    (async () => {
      const userRef = doc(firebaseDb, "users", comments.userId);
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data() as IUserProfile | undefined);
    })();
  }, [comments.userId]);

  const handleVote = async (voteValue: -1 | 1) => {
    try {
      const uid = currentUser?.phone;
      if (!uid) return; // chưa đăng nhập
      const clone = { ...commentState };
      const hasSame = clone.comment.vote?.[uid] === voteValue;

      // khởi tạo map nếu chưa có
      if (!clone.comment.vote) clone.comment.vote = {};

      if (hasSame) {
        // bấm lại để gỡ vote
        delete clone.comment.vote[uid];
      } else {
        clone.comment.vote[uid] = voteValue;
      }

      setCommentState(clone); // optimistic update
      await updateDoc(doc(firebaseDb, "comments", clone.id!), clone);
    } catch (e) {
      console.log("vote error:", e);
    }
  };

  const content = commentState.comment.content || "";
  const isLong = content.length > 180;
  const visibleContent = expanded ? content : content.slice(0, 180);

  return (
    <Box
      bg="#fff"
      borderRadius="2xl"
      borderWidth={1}
      borderColor="coolGray.200"
      p={4}
      shadow={1}
    >
      {/* Header */}
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space={3} alignItems="center" flex={1}>
          <Box size={12} borderRadius={999} overflow="hidden" bg="coolGray.100">
            <Image
              source={{
                uri:
                  user?.avatarUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgc2u0F9JdscSSIM4LH0ca2FLNgVS-vat7LSZKFb73azHEfhVfW7vwnFaq5bidMl1_tsg&usqp=CAU",
              }}
              style={{ width: 48, height: 48 }}
            />
          </Box>
          <VStack flex={1}>
            <Text
              fontWeight={700}
              fontSize={14}
              color="#0F172A"
              numberOfLines={1}
            >
              {user?.fullname || "Ẩn danh"}
            </Text>
            <HStack alignItems="center" space={2}>
              <StarRow value={Number(commentState.comment.avgRating) || 0} />
              <Text fontSize={12} color="coolGray.500">
                • {getDMY(commentState.comment.timestamp)}
              </Text>
            </HStack>
          </VStack>
        </HStack>

        {/* Vote */}
        <HStack alignItems="center" space={2}>
          <Pressable onPress={() => handleVote(1)}>
            <DirectUp
              size="24"
              color={myVote === 1 ? colors.primary[600] : colors.coolGray[500]}
            />
          </Pressable>
          <Text
            fontWeight={700}
            fontSize={16}
            color="#0F172A"
            minWidth={18}
            textAlign="center"
          >
            {score}
          </Text>
          <Pressable onPress={() => handleVote(-1)}>
            <DirectDown
              size="24"
              color={myVote === -1 ? colors.primary[600] : colors.coolGray[500]}
            />
          </Pressable>
        </HStack>
      </HStack>

      {/* Title + content */}
      {!!commentState.comment.title && (
        <Text mt={3} fontWeight={800} fontSize={15} color="#0F172A">
          {commentState.comment.title}
        </Text>
      )}
      {!!content && (
        <Text mt={2} fontSize={14} color="coolGray.700" lineHeight={20}>
          {visibleContent}
          {isLong && !expanded ? "…" : ""}
        </Text>
      )}
      {isLong && (
        <Pressable onPress={() => setExpanded((s) => !s)}>
          <Text mt={1} fontSize={12} color="primary.600" underline>
            {expanded ? "Thu gọn" : "Xem thêm"}
          </Text>
        </Pressable>
      )}

      {/* Image */}
      {!!commentState.comment.imageUrl && (
        <Box mt={3} overflow="hidden" borderRadius={12} bg="coolGray.100">
          <Image
            source={{ uri: commentState.comment.imageUrl }}
            contentFit="cover"
            style={{ width: "100%", height: 200 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default RestaurantComment;

const styles = StyleSheet.create({});
