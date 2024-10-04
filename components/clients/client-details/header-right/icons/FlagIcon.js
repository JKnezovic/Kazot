import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colours } from "../../../../../utils/constants";
import { StyleSheet } from "react-native";

const FlagIcon = ({ isFlagged }) =>
  isFlagged ? (
    <Ionicons
      name="flag"
      size={28}
      color={colours.ANTIQUE_RUBY}
      style={styles.icon}
    />
  ) : (
    <Ionicons name="flag-outline" size={28} color="black" style={styles.icon} />
  );

export default FlagIcon;

const styles = StyleSheet.create({
  icon: {
    padding: 5,
  },
});
