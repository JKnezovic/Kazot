import React, { useEffect } from "react";
import { Modal, Portal, Button, Divider } from "react-native-paper";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { colours } from "../../utils/constants";
import { moderateScale } from "../../Scaling";

export default function DeleteOrderModal({
  isOpen,
  setIsOpen,
  deleteId,
  deleteOrder,
}) {
  const handleDelete = () => {
    deleteOrder({ orderId: deleteId });
    setIsOpen(false);
  };
  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={() => setIsOpen(false)}
        contentContainerStyle={styles.containerStyle}
      >
        <Text style={styles.title}>Delete Order</Text>
        <Divider />
        <Text style={styles.content}>
          Are you sure you want to delete this order?{" "}
        </Text>
        <View style={styles.footer}>
          <Button
            mode="outlined"
            uppercase
            textColor={colours.OXFORD_BLUE}
            style={{ marginRight: 5 }}
            onPress={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            uppercase
            buttonColor={colours.ANTIQUE_RUBY}
            onPress={handleDelete}
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
    borderRadius: moderateScale(20),
    backgroundColor: "white",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderStyle: "solid",
    borderColor: colours.PLATINUM,
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
