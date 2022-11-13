import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
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
      <View style={{ height: moderateScale(20) }} />
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
