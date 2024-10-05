import React, { useMemo } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../utils/constants";

const DropdownRow = ({ item, inputName, updateForm }) => {
  /**
   * Render row text based on which dropdown input is being used
   */
  const textContent = useMemo(() => {
    if (inputName === "first_name")
      return item.name + " " + item.surname + "   " + item.contact;
    if (inputName === "surname")
      return item.surname + " " + item.name + "   " + item.contact;
    return item.contact + "  " + item.name + " " + item.surname;
  }, [item, inputName]);

  return (
    <Pressable onPress={() => updateForm(item)} style={styles.row}>
      <Text style={styles.text}>{textContent}</Text>
      <View style={styles.iconContainer}>
        {item.isFavorite && (
          <AntDesign
            name="heart"
            size={20}
            color={Colors.ORANGE_WEB}
            style={styles.icon}
          />
        )}
        {item.isFlagged && (
          <Ionicons
            name="flag"
            size={20}
            color={Colors.ANTIQUE_RUBY}
            style={styles.icon}
          />
        )}
      </View>
    </Pressable>
  );
};

export default DropdownRow;

const styles = StyleSheet.create({
  icon: {
    padding: 5,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    height: 40,
    borderBottomColor: Colors.PLATINUM,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
  },
});
