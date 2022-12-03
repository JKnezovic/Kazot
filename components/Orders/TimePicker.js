import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View, Text } from "react-native";
import { Button, Portal, Modal, IconButton } from "react-native-paper";
import { colours } from "../../utils/constants";
import { moderateScale } from "../../Scaling";
import DateToDDMMYY from "../../utils/DateToDDMMYY";

const TimePicker = ({ dateFilter = new Date(), setDateFilter }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [touched, setIsTouched] = useState(false);

  useEffect(() => {
    if (isPickerOpen) setIsTouched(false);
  }, [isPickerOpen]);

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
            style={styles.modal}
          >
            <Text style={styles.title}>Search by date</Text>
            <View style={styles.row}>
              <Text>
                Currently selected date:{" "}
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
    fontSize: moderateScale(20),
    marginBottom: moderateScale(5),
    textAlign: "center",
  },
  subtitle: {
    fontSize: moderateScale(15),
  },
  datePickerView: {
    paddingVertical: moderateScale(10),
  },
  modal: {
    borderRadius: 20,
    height: moderateScale(10),
    backgroundColor: colours.WHITE,
    height: "70%",
    marginHorizontal: 5,
    padding: moderateScale(20),
  },
  footer: { display: "flex", flexDirection: "row", justifyContent: "flex-end" },
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
