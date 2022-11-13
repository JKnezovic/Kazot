import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";

const SearchBar = ({ orders = [], initialOrders = [], setOrders }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery?.length) {
      filterOrders();
    } else setOrders(initialOrders);
  }, [searchQuery]);

  const filterOrders = () => {
    const searchQueryLower = searchQuery.toLowerCase();
    const filtered = orders.filter(
      (order) =>
        order
          .get("client_fkey")
          ?.get("name")
          .toLowerCase()
          .includes(searchQueryLower) ||
        order
          .get("client_fkey")
          ?.get("surname")
          .toLowerCase()
          .includes(searchQueryLower) ||
        order
          .get("client_fkey")
          ?.get("contact")
          .toLowerCase()
          .includes(searchQueryLower) ||
        order.get("issue").toLowerCase().includes(searchQueryLower) ||
        String(order.get("service_id"))
          .toLowerCase()
          .includes(searchQueryLower) ||
        order
          .get("vehicle_fkey")
          ?.get("model")
          .toLowerCase()
          .includes(searchQueryLower)
    );
    setOrders(filtered);
  };

  return (
    <Searchbar
      placeholder="Search for orders"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.search}
    />
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  search: {
    minWidth: "70%",
    borderRadius: 0,
  },
});
