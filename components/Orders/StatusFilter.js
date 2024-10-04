import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, ScrollView } from "react-native";
import {
  Button,
  Checkbox,
  Modal,
  Portal,
  Text,
  IconButton,
} from "react-native-paper";
import { Colors } from "../../utils/constants";
import { moderateScale } from "../../Scaling";
import { serviceStatuses } from "../../utils/constants";
import { isSmartPhoneBasedOnRatio } from "../../Scaling";

const StatusFilter = ({
  statusFilters = [
    "Called",
    "Created",
    "Diagnosed",
    "NO SHOW",
    "Not Registered",
    "Received",
    "Registered",
    "Waiting for Parts",
    "Won't come",
    "Opened",
  ],
  setStatusFilters,
}) => {
  const [isModalOpen, setIsModalOpen] = useState();
  const [selectedTypes, setSelectedTypes] = useState({});
  const isTablet = !isSmartPhoneBasedOnRatio();

  useEffect(() => {
    if (isModalOpen) {
      setSelectedTypes((prevState) => {
        let temp = { ...prevState };
        statusFilters.forEach((statusFilter) => (temp[statusFilter] = true));
        return temp || {};
      });
    }
  }, [isModalOpen]);

  const applyFilter = () => {
    setStatusFilters(getFilters());
    setIsModalOpen(false);
  };
  const getFilters = () => {
    return Object.keys(selectedTypes).filter((key) => selectedTypes[key]);
  };

  const handleCheckbox = (selected) => {
    setSelectedTypes((previous) => {
      let temp = previous;
      temp[selected] = !temp[selected];
      return { ...temp };
    });
  };

  const isListChecked = () => {
    return Object.values(selectedTypes).find((type) => type === true);
  };

  const clearByOrderStatus = () => {
    setSelectedTypes([]);
  };

  return (
    <View>
      <IconButton
        icon="tune"
        onPress={() => setIsModalOpen(true)}
        containerColor={Colors.WHITE}
        iconColor={Colors.ORANGE_WEB}
        size={27}
      />
      <Portal>
        <Modal
          visible={isModalOpen}
          onDismiss={() => setIsModalOpen(false)}
          contentContainerStyle={styles.modalContainerStyle}
          key={JSON.stringify(selectedTypes)}
          style={
            isTablet && {
              marginHorizontal: "20%",
            }
          }
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Filter orders list
          </Text>

          <View style={styles.body}>
            <View style={styles.row}>
              <Text variant="titleMedium">By Order Status</Text>
              {isListChecked() && (
                <IconButton icon="close" onPress={clearByOrderStatus} />
              )}
            </View>
            <ScrollView>
              {serviceStatuses.map((element, key) => (
                <Pressable
                  key={`${key}_${
                    selectedTypes[element.value] ? "checked" : "unchecked"
                  }`}
                  style={styles.checkbox}
                  onPress={() => handleCheckbox(element.value)}
                >
                  <Checkbox.Android
                    status={
                      selectedTypes[element.value] ? "checked" : "unchecked"
                    }
                  />
                  <Text variant="labelMedium">{element.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              mode="outlined"
              onPress={() => setIsModalOpen(false)}
              uppercase
            >
              Cancel
            </Button>
            <Button
              style={styles.button}
              mode="contained"
              buttonColor={Colors.ORANGE_WEB}
              onPress={applyFilter}
              uppercase
            >
              Apply
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default StatusFilter;

const styles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: Colors.WHITE,
    margin: 20,
    padding: 20,
    borderRadius: moderateScale(20),
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
  button: {
    margin: 5,
    borderColor: Colors.ORANGE_WEB,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: Colors.PLATINUM,
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
    alignItems: "center",
    height: 40,
  },
});
