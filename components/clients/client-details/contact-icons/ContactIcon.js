import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../../../utils/constants";

const ContactIcon = ({ onPress, iconName, iconColor, iconType }) => {
  const IconComponent = iconType === "FontAwesome" ? FontAwesome : Feather;

  return (
    <View style={styles.row}>
      <Text onPress={onPress} style={styles.contactText}>
        <IconComponent name={iconName} size={30} color={iconColor} />
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    color: Colors.OXFORD_BLUE,
    fontSize: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
});
export default ContactIcon;
