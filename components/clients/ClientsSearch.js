import React, { useState } from "react";
import { StyleSheet, View, Text, Keyboard } from "react-native";
import { TextInput, Searchbar } from "react-native-paper";
import { colours } from "../../utils/constants";

export default function ClientsSearch({ setQuery, searchQuery }) {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for clients"
        value={searchQuery}
        onChangeText={setQuery}
        style={styles.input}
        mode="outlined"
        outlineColor={colours.OXFORD_BLUE}
        activeOutlineColor={colours.ORANGE_WEB}
        iconColor={colours.OXFORD_BLUE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
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
  },
});
