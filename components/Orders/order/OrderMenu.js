import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { IconButton, Menu, Portal, Snackbar } from "react-native-paper";
import getOrderOptions from "../../../utils/getOrderOptions";
import { useNavigation } from "@react-navigation/native";
import useHighlightOrder from "./useHighlightOrder";

const OrderMenu = ({
  order = {},
  client = null,
  getOrders,
  modal = {},
  setSelectedOrderId,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();
  const { highlightOrder, isLoading, isLoaded, reset } = useHighlightOrder();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const handleMenu = (action) => {
    setIsMenuOpen(false);
    switch (action) {
      case "delete_order":
        modal.setIsModalOpen(true);
        setSelectedOrderId(order.id);
        return;
      case "order_details":
        navigation.navigate("orderDetails", { serviceId: order.id });
        return;
      case "client_details":
        navigation.navigate("Client Details", client);
        return;
      case "highlight":
        highlightOrder({ order });
        return;
    }
  };

  useEffect(() => {
    if (isLoaded) {
      setIsMenuOpen(false);
      setIsSnackbarVisible(true);
      getOrders();
      reset();
    }
  }, [isLoaded]);
  return (
    <>
      <Menu
        visible={isMenuOpen}
        onDismiss={() => setIsMenuOpen(false)}
        anchor={
          <IconButton
            icon="dots-vertical"
            onPress={() => setIsMenuOpen(true)}
          />
        }
      >
        {getOrderOptions(order.isHighlighted).map((option, key) => (
          <Menu.Item
            key={key}
            onPress={() => handleMenu(option.value)}
            title={option.label}
          />
        ))}
      </Menu>
      <Portal>
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() => setIsSnackbarVisible(false)}
          elevation={5}
          action={{
            label: "Dismiss",
            onPress: () => {
              setIsSnackbarVisible(false);
            },
          }}
          wrapperStyle={styles.snackbar}
        >
          Service order updated.
        </Snackbar>
      </Portal>
    </>
  );
};

export default OrderMenu;

const styles = StyleSheet.create({});
