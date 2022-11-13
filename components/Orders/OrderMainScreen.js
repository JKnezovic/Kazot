import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { Portal, Snackbar } from "react-native-paper";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import useGetOrders from "./useGetOrders";
import OrdersList from "./OrdersList";
import useDeleteOrder from "./useDeleteOrder";
import { moderateScale } from "../../Scaling";

export default function OrderMainScreen({ navigation }) {
  const { getOrders, orders } = useGetOrders();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { deleteOrder, isLoading, isLoaded, reset } = useDeleteOrder();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    if (!isLoading && isLoaded) {
      setIsSnackbarVisible(true);
      reset();
      getOrders();
    }
  }, [isLoading, isLoaded]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}
    >
      <View>
        <Portal>
          <Snackbar
            visible={isSnackbarVisible}
            onDismiss={() => setIsSnackbarVisible(false)}
          >
            {" "}
            Order succesfully deleted.{" "}
          </Snackbar>
        </Portal>
        <View style={styles.header}>
          <SearchBar
            orders={filteredOrders}
            initialOrders={orders}
            setOrders={setFilteredOrders}
          />
          <Filter orders={filteredOrders} setOrders={setFilteredOrders} />
        </View>
        <OrdersList orders={filteredOrders} deleteOrder={deleteOrder} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  fab: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
    backgroundColor: "#fca311",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "blue",
    height: moderateScale(50),
  },
});
