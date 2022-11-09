import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View } from "react-native";
import { Button, Checkbox, Modal, Portal, Text, FAB } from "react-native-paper";
import { colours, filter } from "../../utils/constants";
import { moderateScale } from "../../Scaling";

const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState();
  const date = new Date();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const applyFilter = () => {
    // call filter function
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        icon="tune"
        mode="contained"
        style={styles.filterButton}
        onPress={() => setIsModalOpen(true)}
      >
        Filter
      </Button>
      <Portal>
        <Modal
          visible={isModalOpen}
          onDismiss={() => setIsModalOpen(false)}
          contentContainerStyle={styles.modalContainerStyle}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Filter orders list
          </Text>
          <View style={styles.body}>
            <Text variant="titleMedium">By order status</Text>
            {filter.map((element, key) => (
              <View {...key} style={styles.checkbox}>
                <Checkbox.Android status={"checked"} />
                <Text variant="labelMedium">{element.label}</Text>
              </View>
            ))}

            <Text variant="titleMedium">By date</Text>
            <FAB
              icon="calendar"
              label={"Selected date: "}
              mode="elevated"
              color="#14213D"
              style={{
                backgroundColor: "#E5E5E5",
                marginVertical: "4%",
                width: moderateScale(300),
                alignSelf: "center",
              }}
              onPress={() => setIsPickerOpen(true)}
            />
            {isPickerOpen && (
              <DateTimePicker
                value={selectedDate || date}
                mode="date"
                is24Hour={true}
                style={styles.picker}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              mode="contained"
              buttonColor={colours.ANTIQUE_RUBY}
              onPress={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              style={styles.button}
              mode="contained"
              buttonColor={colours.OXFORD_BLUE}
              onPress={applyFilter}
            >
              Apply
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default Filter;

const styles = StyleSheet.create({
  filterButton: {
    borderRadius: 0,
    minWidth: "30%",
  },
  modalContainerStyle: {
    backgroundColor: colours.WHITE,
    margin: 20,
    padding: 20,
  },
  modalTitle: {
    textAlign: "center",
    margin: 20,
  },
  checkbox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    backgroundColor: "blue",
    width: "100%",
  },
  button: {
    borderRadius: 0,
    margin: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: colours.PLATINUM,
    borderStyle: "solid",
    paddingTop: 10,
  },
  body: {
    paddingVertical: 10,
  },
});
