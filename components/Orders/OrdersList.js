import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Portal, Snackbar } from "react-native-paper";
import { moderateScale } from "../../Scaling";
import { colours } from "../../utils/constants";
import Order from "./Order";
import DeleteOrderModal from "./DeleteOrderModal";

const OrdersList = ({ orders = [], deleteOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <DeleteOrderModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        deleteId={selectedOrderId}
        deleteOrder={deleteOrder}
      />
      {orders.map((order, key) => (
        <Order
          modal={{ isModalOpen, setIsModalOpen }}
          {...{ key, order, setSelectedOrderId }}
        />
      ))}
    </ScrollView>
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.PLATINUM,
    height: "100%",
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(10),
  },
});
