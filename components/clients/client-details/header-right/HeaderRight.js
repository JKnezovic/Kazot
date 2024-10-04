import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Pressable } from "react-native";
import FavoriteIcon from "./icons/FavoriteIcon";
import FlagIcon from "./icons/FlagIcon";

const HeaderRight = ({ clientId, isFavorite, isFlagged, updateClient }) => (
  <View style={styles.container}>
    <Pressable
      onPress={() =>
        updateClient({
          clientId,
          key: "isFavorite",
          value: !isFavorite,
        })
      }
    >
      <FavoriteIcon isFavorite={isFavorite} />
    </Pressable>
    <Pressable
      onPress={() =>
        updateClient({
          clientId,
          key: "isFlagged",
          value: !isFlagged,
        })
      }
    >
      <FlagIcon isFlagged={isFlagged} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});

export default HeaderRight;
