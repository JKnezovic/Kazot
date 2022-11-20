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
import DateToDDMMYY from "../../utils/DateToDDMMYY";

const Filter = ({ orders = [], setOrders }) => {
  const [isModalOpen, setIsModalOpen] = useState();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { orderStatuses, getOrderStatuses } = useGetOrderStatuses();
  const [selectedTypes, setSelectedTypes] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isByDateOpen, setIsByDateOpen] = useState(false);
  const [isByOrderStatusOpen, setIsByOrderStatusOpen] = useState(false);

  const [initialOrders, setInitialOrders] = useState([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    getOrderStatuses();
  }, []);

  const checkForValue = (status) => {
    for (const [key, value] of Object.entries(selectedTypes)) {
      if (key === status && value === true) return true;
    }
    return false;
  };

  const filterByDate = (toFilter) => {
    return toFilter.filter(
      (order) =>
        DateToDDMMYY(order.get("createdAt")) === DateToDDMMYY(selectedDate)
    );
  };

  const applyFilter = () => {
    let filtered = orders.filter((order) => checkForValue(order.get("status")));
    if (filtered.length === 0) {
      //setOrders(initialOrders);
      filtered = [...initialOrders];
    }
    if (selectedDate !== null) filtered = filterByDate(filtered);

    setOrders(filtered);
    setIsModalOpen(false);
  };

  const handleCheckbox = (selected) => {
    setSelectedTypes((previous) => {
      let temp = previous;
      temp[selected] = !temp[selected];
      return { ...temp };
    });
  };

  useEffect(() => {
    if (isFirstRender.current && orders.length) {
      setInitialOrders(orders);
      isFirstRender.current = false;
    }
    setFilteredOrders(orders);
  }, [orders]);

  const setDate = (e, selDate) => {
    setSelectedDate(selDate);
    setIsPickerOpen(false);
  };

  const isListChecked = () => {
    return Object.values(selectedTypes).find((type) => type === true);
  };

  const clearByOrderStatus = () => {
    setSelectedTypes([]);
  };
  const clearByDate = () => {
    setSelectedDate(null);
  };

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
            <View style={styles.row}>
              <Pressable
                style={styles.title}
                onPress={() => setIsByOrderStatusOpen(!isByOrderStatusOpen)}
              >
                <Text variant="titleMedium">By order status</Text>
                <IconButton
                  icon="menu-down"
                  iconColor={
                    isByOrderStatusOpen
                      ? colours.ORANGE_WEB
                      : colours.OXFORD_BLUE
                  }
                />
              </Pressable>
              {isByOrderStatusOpen && isListChecked() && (
                <IconButton icon="close" onPress={clearByOrderStatus} />
              )}
            </View>

            {isByOrderStatusOpen &&
              orderStatuses.map((element, key) => (
                <Pressable
                  key={`${key}_${
                    selectedTypes[element.get("Name")] ? "checked" : "unchecked"
                  }`}
                  style={styles.checkbox}
                  onPress={() => handleCheckbox(element.get("Name"))}
                >
                  <Checkbox.Android
                    status={
                      selectedTypes[element.get("Name")]
                        ? "checked"
                        : "unchecked"
                    }
                  />
                  <Text variant="labelMedium">{element.get("Name")}</Text>
                </Pressable>
              ))}

            <View style={styles.row}>
              <Pressable
                style={styles.title}
                onPress={() => setIsByDateOpen(!isByDateOpen)}
              >
                <Text variant="titleMedium">By date</Text>
                <IconButton
                  icon="menu-down"
                  iconColor={
                    isByDateOpen ? colours.ORANGE_WEB : colours.OXFORD_BLUE
                  }
                />
              </Pressable>
              {isByDateOpen && selectedDate && (
                <IconButton icon="close" onPress={clearByDate} />
              )}
            </View>
            {isByDateOpen && (
              <View>
                <FAB
                  icon="calendar"
                  label={`${
                    selectedDate
                      ? "Selected date: " + DateToDDMMYY(selectedDate)
                      : "All dates"
                  }`}
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
                    testID="dateTimePicker"
                    value={selectedDate || new Date()}
                    mode="date"
                    is24Hour={true}
                    onChange={setDate}
                  />
                )}
              </View>
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
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
