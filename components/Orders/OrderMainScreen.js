import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Portal, Snackbar, ActivityIndicator } from "react-native-paper";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import useGetOrders from "./useGetOrders";
import OrdersList from "./OrdersList";
import useDeleteOrder from "./useDeleteOrder";
import { moderateScale, isSmartPhoneBasedOnRatio } from "../../Scaling";
import { colours } from "../../utils/constants";

export default function OrderMainScreen() {
  const {
    getOrders,
    orders,
    isLoading: areOrdersLoading,
    isLoaded: areOrdersLoaded,
  } = useGetOrders();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { deleteOrder, isLoading, isLoaded, reset } = useDeleteOrder();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const tabBarHeight = useBottomTabBarHeight();
  useEffect(() => {
    if (showLoader && areOrdersLoaded) setShowLoader(false);
  }, [areOrdersLoaded]);

  useEffect(() => {
    if (!areOrdersLoading && areOrdersLoaded && isRefreshing) {
      console.log(areOrdersLoading, areOrdersLoaded);
      setIsRefreshing(false);
    }
  }, [orders, areOrdersLoading, areOrdersLoaded]);

  useEffect(() => {
    // fetch orders when user pulls list down
    if (isRefreshing) getOrders();
  }, [isRefreshing]);

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
      style={[styles.container]}
      onPress={Keyboard.dismiss}
    >
      <View
        style={[
          {
            paddingBottom:
              tabBarHeight +
              moderateScale(isSmartPhoneBasedOnRatio() ? 40 : 70),
          },
        ]}
      >
        <Portal>
          <Snackbar
            visible={isSnackbarVisible}
            onDismiss={() => setIsSnackbarVisible(false)}
          >
            Order succesfully deleted.
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
        {showLoader ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator />
          </View>
        ) : (
          <OrdersList
            orders={filteredOrders}
            deleteOrder={deleteOrder}
            {...{ isRefreshing, setIsRefreshing }}
            getOrders={getOrders}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colours.PLATINUM,
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
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    height: "100%",
  },
});
