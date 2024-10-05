import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../utils/constants";

const SearchBar = ({ orders = [], setFilteredOrders }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery?.length) {
      filterOrders();
    } else setFilteredOrders(orders);
  }, [searchQuery, orders]);

  const filterOrders = () => {
    const searchQueryLower = searchQuery.toLowerCase();
    const queryWithoutDiacritics = searchQueryLower
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
    const filtered = orders.filter(
      (order) =>
        `${order.clientName} ${order.clientSurname}`
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .toLowerCase()
          .includes(queryWithoutDiacritics) ||
        order.clientContact.toLowerCase().includes(searchQueryLower) ||
        order.issue.toLowerCase().includes(searchQueryLower) ||
        String(order.serviceId).toLowerCase().includes(searchQueryLower) ||
        order.vehicleModel.toLowerCase().includes(searchQueryLower) ||
        order.type.toLowerCase().includes(searchQueryLower)
    );
    setFilteredOrders(filtered);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for orders"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.input}
        mode="view"
        iconColor={Colors.OXFORD_BLUE}
      />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
  },
  menuButton: {
    backgroundColor: Colors.OXFORD_BLUE,
    borderRadius: 0,
  },
  menuButtonText: {
    color: Colors.WHITE,
  },
  itemSelected: {
    backgroundColor: Colors.PLATINUM,
  },
  input: {
    backgroundColor: Colors.WHITE,
    minWidth: "100%",
  },
});
