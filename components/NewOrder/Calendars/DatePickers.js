import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { moderateScale } from "../../../Scaling";
import DateToDDMMYY from "../../../utils/DateToDDMMYY";
import { FAB } from "react-native-paper";
import IOSDatePicker from "./IOSDatePicker";
import AndroidDatePicker from "./AndroidDatePicker";

export default function DatePickers({ orderState, onChange, open, setOpen }) {
  return (
    <View>
      <FAB
        icon="calendar"
        label={"Selected date: " + DateToDDMMYY(orderState.date)}
        mode="flat"
        color="#14213D"
        style={styles.button}
        onPress={() => setOpen(true)}
      />

      {Platform.OS === "ios" && open ? (
        <IOSDatePicker
          onChange={onChange}
          orderState={orderState}
          open={open}
        />
      ) : open ? (
        <AndroidDatePicker onChange={onChange} orderState={orderState} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E5E5E5",
    marginVertical: "4%",
    width: moderateScale(300),
    alignSelf: "center",
  },
});
