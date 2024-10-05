import React, { useEffect } from "react";
import { Modal, Portal, Button, Divider } from "react-native-paper";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Colors } from "../../../utils/constants";

export default function DeleteVehiclesModal({
  isOpen,
  setIsOpen,
  deleteId,
  deleteVehicle,
}) {
  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={() => setIsOpen(false)}
        contentContainerStyle={styles.containerStyle}
      >
        <Text style={styles.title}>Delete Vehicle</Text>
        <Divider />
        <Text style={styles.content}>
          Are you sure you want to delete this vehicle?{" "}
        </Text>
        <View style={styles.footer}>
          <Button
            mode="outlined"
            uppercase
            textColor={Colors.OXFORD_BLUE}
            style={{ marginRight: 5 }}
            onPress={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            uppercase
            buttonColor={Colors.ANTIQUE_RUBY}
            onPress={() => deleteVehicle({ vehicleId: deleteId })}
          >
            Delete
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    margin: 20,
    backgroundColor: "white",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderStyle: "solid",
    borderColor: Colors.PLATINUM,
    borderTopWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
    padding: 10,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
