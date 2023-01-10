import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View } from "react-native";
import { Button, Portal, Modal, IconButton, Text } from "react-native-paper";
import { colours } from "../../utils/constants";
import { moderateScale } from "../../Scaling";
import DateToDDMMYY from "../../utils/DateToDDMMYY";
import { isSmartPhoneBasedOnRatio } from "../../Scaling";

/// Time picker for IOS

const TimePicker = ({ dateFilter = null, setDateFilter }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [touched, setIsTouched] = useState(false);
  const isTablet = !isSmartPhoneBasedOnRatio();

  useEffect(() => {
    if (isPickerOpen) setIsTouched(false);
  }, [isPickerOpen]);

  useEffect(() => {
    if (dateFilter === null) {
      setSelectedDate(null);
    }
  }, [dateFilter]);

  useEffect(() => {
    if (selectedDate !== null) {
      if (DateToDDMMYY(selectedDate) !== DateToDDMMYY(dateFilter) && !touched)
        setIsTouched(true);
      if (DateToDDMMYY(selectedDate) === DateToDDMMYY(dateFilter))
        setIsTouched(false);
    }
  }, [selectedDate]);

  const cancelModal = () => {
    setIsPickerOpen(false);
    setSelectedDate(dateFilter);
  };

  const applyFilter = () => {
    // set date to filter by
    // close modal
    setDateFilter(selectedDate);
    setIsPickerOpen(false);
  };

  const setDate = (event, date) => {
    setSelectedDate(date);
  };
  const clearDate = () => {
    setSelectedDate(null);
    setIsTouched(true);
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
        <Portal>
          <Modal
            visible={isPickerOpen}
            onDismiss={cancelModal}
            contentContainerStyle={styles.modalContainerStyle}
            style={
              isTablet && {
                marginHorizontal: "20%",
              }
            }
          >
            <Text variant="titleLarge" style={styles.title}>
              Filter By Date
            </Text>
            <View style={styles.row}>
              <Text variant="titleMedium">
                Currently Selected Date:{" "}
                {selectedDate ? DateToDDMMYY(selectedDate) : "All time"}
              </Text>
              {selectedDate && (
                <IconButton
                  icon="close"
                  onPress={clearDate}
                  size={20}
                  style={{ height: moderateScale(20) }}
                />
              )}
            </View>

            <View style={styles.datePickerView}>
              <DateTimePicker
                testID="dateTimePicker"
                value={selectedDate || new Date()}
                mode="date"
                display={"inline"}
                is24Hour={true}
                onChange={setDate}
                style={styles.datePicker}
              />
            </View>
            <View style={styles.footer}>
              <Button
                mode="outlined"
                uppercase
                style={styles.button}
                onPress={cancelModal}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                uppercase
                onPress={applyFilter}
                buttonColor={touched ? colours.ORANGE_WEB : colours.PLATINUM}
                disabled={!touched}
              >
                Apply
              </Button>
            </View>
          </Modal>
        </Portal>
      )}
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  title: {
    margin: 20,
    textAlign: "center",
  },
  datePickerView: {
    paddingVertical: moderateScale(10),
  },
  modalContainerStyle: {
    backgroundColor: colours.WHITE,
    margin: 20,
    padding: 20,
    borderRadius: moderateScale(20),
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: colours.PLATINUM,
    borderStyle: "solid",
    paddingTop: 10,
  },
  button: {
    marginRight: moderateScale(5),
    borderColor: colours.ORANGE_WEB,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: moderateScale(20),
  },
});
