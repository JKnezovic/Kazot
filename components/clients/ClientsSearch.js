import React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { colours } from "../../utils/constants";

export default function ClientsSearch({ setQuery, searchQuery }) {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for clients"
        value={searchQuery}
        onChangeText={setQuery}
        style={styles.input}
        mode="view"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    paddingBottom: 2,
    paddingTop: 1,
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
  },
});
