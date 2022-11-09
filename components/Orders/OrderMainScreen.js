import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Portal, Snackbar, FAB } from "react-native-paper";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import useGetOrders from "./useGetOrders";
import OrdersList from "./OrdersList";
import useDeleteOrder from "./useDeleteOrder";

export default function OrderMainScreen({ navigation }) {
  const { getOrders, orders } = useGetOrders();
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

  return (
    <View style={styles.container}>
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
        <SearchBar />
        <Filter />
      </View>
      <OrdersList {...{ orders, deleteOrder }} />

      <FAB
        icon="plus"
        customSize={80}
        style={styles.fab}
        onPress={() => navigation.navigate("NewOrder")}
      />
    </View>
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
  },
});
