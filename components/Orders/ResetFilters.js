import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { Colors } from "../../utils/constants";

const ResetFilters = ({ setDateFilter, setStatusFilters }) => {
  const clearFilters = () => {
    setDateFilter(null);
    setStatusFilters([]);
  };

  return (
    <IconButton
      icon="backspace"
      onPress={clearFilters}
      containerColor={Colors.WHITE}
      iconColor={Colors.ORANGE_WEB}
      size={27}
    />
  );
};

export default ResetFilters;

const styles = StyleSheet.create({});
