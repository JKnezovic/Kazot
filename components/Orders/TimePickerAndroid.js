import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { colours } from "../../utils/constants";

const TimePickerAndroid = ({ dateFilter = null, setDateFilter }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (dateFilter === null) {
      setSelectedDate(null);
    }
  }, [dateFilter]);

  const handlePicker = (event, date) => {
    if (event.type === "neutralButtonPressed") {
      setSelectedDate(null);
      setIsPickerOpen(false);
      setDateFilter(null);
    }
    if (event.type === "set") {
      setSelectedDate(date);
      setIsPickerOpen(false);
      setDateFilter(date);
    }
    if (event.type === "dismissed") {
      setIsPickerOpen(false);
      setSelectedDate(dateFilter);
    }
  };

  return (
    <View>
      <IconButton
        icon="calendar"
        size={27}
        onPress={() => setIsPickerOpen(true)}
        containerColor={colours.WHITE}
        iconColor={colours.ORANGE_WEB}
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
