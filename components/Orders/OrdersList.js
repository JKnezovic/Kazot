import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { moderateScale } from "../../Scaling";
import Order from "./Order";
import DeleteOrderModal from "./DeleteOrderModal";

const OrdersList = ({
  orders = [],
  deleteOrder,
  isRefreshing = false,
  setIsRefreshing,
  getOrders,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <View style={styles.container}>
      <DeleteOrderModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        deleteId={selectedOrderId}
        deleteOrder={deleteOrder}
      />
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <Order
            modal={{ isModalOpen, setIsModalOpen }}
            order={item}
            {...{ setSelectedOrderId, getOrders }}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={() => setIsRefreshing(true)}
        refreshing={isRefreshing}
        style={styles.list}
      />
    </View>
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(10),
  },
});
