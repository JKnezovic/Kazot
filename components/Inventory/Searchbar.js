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
    const filtered = orders.filter((order) =>
      order?.get("name").toLowerCase().includes(searchQueryLower)
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
      />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  input: {
    backgroundColor: colours.WHITE,
  },
});
