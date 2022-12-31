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
import useGetOrders from "./useGetOrders";
import OrdersList from "./OrdersList";
import useDeleteOrder from "./useDeleteOrder";
import { moderateScale } from "../../Scaling";
import { colours } from "../../utils/constants";
import Filters from "./Filters";

export default function OrderMainScreen({ navigation }) {
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
  const [statusFilters, setStatusFilters] = useState([
    "Called",
    "Created",
    "Diagnosed",
    "NO SHOW",
    "Not Registered",
    "Received",
    "Registered",
    "Waiting for Parts",
    "Won't come",
    "Opened",
  ]);
  const [dateFilter, setDateFilter] = useState(null);

  // rerender on back
  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      getOrders({ statusFilters, dateFilter });
    });
    return willFocusSubscription;
  }, [navigation, statusFilters, dateFilter]);

  useEffect(() => {
    if (showLoader && areOrdersLoaded) setShowLoader(false);
  }, [areOrdersLoaded]);

  useEffect(() => {
    if (!areOrdersLoading && areOrdersLoaded && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [orders, areOrdersLoading, areOrdersLoaded]);

  useEffect(() => {
    // fetch orders when user pulls list down
    if (isRefreshing) getOrders({ statusFilters, dateFilter });
  }, [isRefreshing]);

  useEffect(() => {
    getOrders({ statusFilters, dateFilter });
  }, [statusFilters, dateFilter]);

  useEffect(() => {
    if (!isLoading && isLoaded) {
      setIsSnackbarVisible(true);
      reset();
      getOrders({ statusFilters, dateFilter });
    }
  }, [isLoading, isLoaded]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Filters
          {...{ statusFilters, setStatusFilters, dateFilter, setDateFilter }}
        />
      ),
    });
  }, [navigation, statusFilters, dateFilter]);

  return (
    <TouchableWithoutFeedback
      style={[styles.container]}
      onPress={Keyboard.dismiss}
    >
      <View
        style={[
          {
            height: "100%",
            paddingBottom: tabBarHeight - 30,
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
            filteredOders={filteredOrders}
            orders={orders}
            setFilteredOrders={setFilteredOrders}
          />
        </View>
        {areOrdersLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator />
          </View>
        ) : (
          <OrdersList
            orders={filteredOrders}
            deleteOrder={deleteOrder}
            {...{ isRefreshing, setIsRefreshing }}
            getOrders={() => getOrders({ statusFilters, dateFilter })}
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
    height: moderateScale(50),
  },
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    height: "100%",
  },
});
