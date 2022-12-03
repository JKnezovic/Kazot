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
import { colours } from "../../utils/constants";
import { moderateScale } from "../../Scaling";
import { serviceStatuses } from "../../utils/constants";

const StatusFilter = ({ statusFilters = [], setStatusFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState();
  const [selectedTypes, setSelectedTypes] = useState({});
  const [isByOrderStatusOpen, setIsByOrderStatusOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedTypes((prevState) => {
        let temp = { ...prevState };
        statusFilters.forEach((statusFilter) => (temp[statusFilter] = true));
        return temp || null;
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
        containerColor={colours.WHITE}
        iconColor={colours.ORANGE_WEB}
        size={27}
      />
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
              <Text variant="titleMedium">By order status</Text>
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
              buttonColor={colours.ORANGE_WEB}
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
    backgroundColor: colours.WHITE,
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
    borderColor: colours.ORANGE_WEB,
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
