import React, { useEffect, useState, useRef } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Button,
  Checkbox,
  Modal,
  Portal,
  Text,
  FAB,
  IconButton,
} from "react-native-paper";
import { colours } from "../../utils/constants";
import { moderateScale } from "../../Scaling";
import useGetOrderStatuses from "./useGetOrderStatuses";

const Filter = ({ orders = [], setOrders }) => {
  const [isModalOpen, setIsModalOpen] = useState();
  const date = new Date();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { orderStatuses, getOrderStatuses } = useGetOrderStatuses();
  const [selectedTypes, setSelectedTypes] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [initialOrders, setInitialOrders] = useState([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    getOrderStatuses();
  }, []);

  const checkForValue = (status) => {
    for (const [key, value] of Object.entries(selectedTypes)) {
      if (key === status && value === true) {
        return true;
      }
    }
    return false;
  };

  const applyFilter = () => {
    const filtered = orders.filter((order) =>
      checkForValue(order.get("status"))
    );
    setFilteredOrders(filtered);
    // call filter function
    setIsModalOpen(false);
  };

  const handleCheckbox = (selected) => {
    console.log(selectedTypes, selected);
    setSelectedTypes((previous) => {
      let temp = previous;
      temp[selected] = !temp[selected];
      return { ...temp };
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      setInitialOrders(orders);
      isFirstRender.current = false;
    }
    setFilteredOrders(orders);
  }, [orders]);

  return (
    <>
      <Button
        icon="tune"
        mode="contained"
        style={styles.filterButton}
        contentStyle={{ height: "100%" }}
        onPress={() => setIsModalOpen(true)}
        buttonColor={colours.ORANGE_WEB}
      >
        Filter
      </Button>
      <Portal>
        <Modal
          visible={isModalOpen}
          onDismiss={() => setIsModalOpen(false)}
          contentContainerStyle={styles.modalContainerStyle}
          key={JSON.stringify(selectedTypes)}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Filter orders list
          </Text>

          <View style={styles.body}>
            <Pressable style={styles.title}>
              <Text variant="titleMedium">By order status</Text>
              <IconButton icon="menu-down" />
            </Pressable>
            {orderStatuses.map((element, key) => (
              <View
                key={`${key}_${
                  selectedTypes[element.get("name")] ? "checked" : "unchecked"
                }`}
                style={styles.checkbox}
              >
                <Checkbox.Android
                  status={
                    selectedTypes[element.get("name")] ? "checked" : "unchecked"
                  }
                  onPress={() => handleCheckbox(element.get("name"))}
                />
                <Text variant="labelMedium">{element.get("name")}</Text>
              </View>
            ))}

            <Pressable style={styles.title}>
              <Text variant="titleMedium">By date</Text>
              <IconButton icon="menu-down" />
            </Pressable>
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
    minHeight: "100%",
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
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
