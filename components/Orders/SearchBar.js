import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { colours } from "../../utils/constants";

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
    <View>
      <Searchbar
        placeholder="Search for orders"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.input}
        mode="outlined"
        outlineColor={colours.OXFORD_BLUE}
        activeOutlineColor={colours.ORANGE_WEB}
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
    borderBottomWidth: 1,
    borderBottomColor: colours.OXFORD_BLUE,
    minWidth: "70%",
    borderRadius: 0,
    height: "100%",
  },
});
