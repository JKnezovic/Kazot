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
    const filtered = orders.filter((order) => order?.name.toLowerCase().includes(searchQueryLower));
    setOrders(filtered);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for orders"
        onChangeText={setSearchQuery}
        value={searchQuery}
        mode="view"
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
  },
  input: {
    paddingTop: 1,
    backgroundColor: colours.WHITE,
  },
});
