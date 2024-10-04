import React from "react";
import { Ionicons } from "@expo/vector-icons";

const FlagIcon = ({ isFlagged }) =>
  isFlagged ? (
    <Ionicons name="flag" size={24} color="red" />
  ) : (
    <Ionicons name="flag-outline" size={24} color="black" />
  );

export default FlagIcon;
