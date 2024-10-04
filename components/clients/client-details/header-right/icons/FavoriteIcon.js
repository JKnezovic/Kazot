import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { colours } from "../../../../../utils/constants";
import { StyleSheet } from "react-native";

const FavoriteIcon = ({ isFavorite }) =>
  isFavorite ? (
    <AntDesign
      name="heart"
      size={28}
      color={colours.ANTIQUE_RUBY}
      style={styles.icon}
    />
  ) : (
    <AntDesign name="hearto" size={28} color="black" style={styles.icon} />
  );

export default FavoriteIcon;

const styles = StyleSheet.create({
  icon: {
    padding: 5,
  },
});
