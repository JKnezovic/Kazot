import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View, Text, Platform } from "react-native";
import { Button, Portal, Modal, IconButton } from "react-native-paper";
import { colours } from "../../utils/constants";
import { moderateScale } from "../../Scaling";
import DateToDDMMYY from "../../utils/DateToDDMMYY";

const TimePickerAndroid = ({ dateFilter = new Date(), setDateFilter }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePicker = (event, date) => {
    if (event.type === "neutralButtonPressed") {
      setSelectedDate(null);
      setDateFilter(null);
      setIsPickerOpen(false);
    }
    if (event.type === "set") {
      date.setHours(0, 0, 0, 0);
      console.log(date);
      setSelectedDate(date);
      setDateFilter(date);
      setIsPickerOpen(false);
    }
    if (event.type === "dismissed") {
      setSelectedDate(dateFilter);
      setIsPickerOpen(false);
    }
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon="calendar"
        mode="contained"
        style={styles.filterButton}
        contentStyle={{ height: "100%" }}
        onPress={() => setIsPickerOpen(true)}
        containerColor={colours.ORANGE_WEB}
        iconColor={colours.WHITE}
      />

      {isPickerOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate || new Date()}
          onChange={(event, date) => handlePicker(event, date)} // handleAndroidPicker
          positiveButtonLabel="Save"
          negativeButtonLabel="Cancel"
          neutralButtonLabel="Clear"
        />
      )}
    </View>
  );
};

export default TimePickerAndroid;

const styles = StyleSheet.create({
  container: {
    width: "50%",
  },

  filterButton: {
    borderRadius: 0,
    margin: 0,
    height: "100%",
    width: "100%",
    borderLeftColor: colours.PLATINUM,
    borderLeftWidth: 1,
  },
});
