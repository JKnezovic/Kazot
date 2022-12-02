import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { colours } from "../../utils/constants";

const SearchBar = ({ filteredOrders = [], orders = [], setFilteredOrders }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery?.length) {
      filterOrders();
    } else setFilteredOrders(orders);
  }, [searchQuery, orders]);

  const filterOrders = () => {
    const searchQueryLower = searchQuery.toLowerCase();
    const filtered = orders.filter(
      (order) =>
        order.clientName.toLowerCase().includes(searchQueryLower) ||
        order.clientSurname.toLowerCase().includes(searchQueryLower) ||
        order.clientContact.toLowerCase().includes(searchQueryLower) ||
        order.issue.toLowerCase().includes(searchQueryLower) ||
        String(order.serviceId).toLowerCase().includes(searchQueryLower) ||
        order.vehicleModel.toLowerCase().includes(searchQueryLower) ||
        order.type.toLowerCase().includes(searchQueryLower)
    );
    setFilteredOrders(filtered);
  };

  return (
    <View>
      <Searchbar
        placeholder="Search for orders"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.input}
        iconColor={colours.OXFORD_BLUE}
      />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    paddingBottom: 5,
  },
  menuButton: {
    backgroundColor: colours.OXFORD_BLUE,
    borderRadius: 0,
  },
  menuButtonText: {
    color: colours.WHITE,
  },
  itemSelected: {
    backgroundColor: colours.PLATINUM,
  },
  input: {
    backgroundColor: colours.WHITE,
    minWidth: "100%",
  },
});
