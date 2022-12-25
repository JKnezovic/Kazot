import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { colours } from "../../utils/constants";

const ResetFilters = ({ setDateFilter, setStatusFilters, setSelectedDate }) => {
  const clearFilters = () => {
    setDateFilter(null);
    setSelectedDate(null);
    setStatusFilters([
      "Called",
      "Created",
      "Diagnosed",
      "NO SHOW",
      "Not Registered",
      "Received",
      "Registered",
      "Waiting for Parts",
      "Won't come",
      "Opened",
    ]);
  };

  return (
    <IconButton
      icon="backspace"
      onPress={clearFilters}
      containerColor={colours.WHITE}
      iconColor={colours.ORANGE_WEB}
      size={27}
    />
  );
};

export default ResetFilters;

const styles = StyleSheet.create({});
