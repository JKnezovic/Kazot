import React, { useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { moderateScale } from "../../Scaling";
import Order from "./Order";
import DeleteOrderModal from "./DeleteOrderModal";
import { FlashList } from "@shopify/flash-list";

const OrdersList = ({
  orders = [],
  deleteOrder,
  isRefreshing = false,
  setIsRefreshing,
  getOrders,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const renderListItem = ({ item }) => (
    <Order
      modal={{ isModalOpen, setIsModalOpen }}
      order={item}
      {...{ setSelectedOrderId, getOrders }}
    />
  );

  return (
    <View style={styles.container}>
      <DeleteOrderModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        deleteId={selectedOrderId}
        deleteOrder={deleteOrder}
      />
      {orders.length > 0 ? (
        <FlashList
          data={orders}
          renderItem={renderListItem}
          keyExtractor={(item) => item.serviceOrderId}
          onRefresh={() => setIsRefreshing(true)}
          refreshing={isRefreshing}
          estimatedItemSize={125}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.noOrders}>
          <Text style={styles.noOrdersText}>Ø No orders found</Text>
        </View>
      )}
    </View>
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  list: {
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(10),
  },
  noOrders: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noOrdersText: {
    fontSize: moderateScale(30),
    color: "grey",
    fontWeight: "300",
    fontStyle: "italic",
  },
});
