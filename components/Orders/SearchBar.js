import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search for orders"
      onChangeText={onChangeSearch}
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
