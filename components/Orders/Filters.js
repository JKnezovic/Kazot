import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import StatusFilter from "./StatusFilter";
import TimePicker from "./TimePicker";
import { moderateScale } from "../../Scaling";
import TimePickerAndroid from "./TimePickerAndroid";
import ResetFilters from "./ResetFilters";

export default function Filters({
  statusFilters,
  setStatusFilters,
  dateFilter,
  setDateFilter,
}) {
  return (
    <View style={styles.row}>
      <StatusFilter {...{ statusFilters, setStatusFilters }} />
      {Platform.OS === "ios" ? (
        <TimePicker {...{ dateFilter, setDateFilter }} />
      ) : (
        <TimePickerAndroid {...{ dateFilter, setDateFilter }} />
      )}
      <ResetFilters {...{ setStatusFilters, setDateFilter }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    height: moderateScale(50),
    alignItems: "center",
  },
});
