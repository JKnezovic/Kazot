import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../../utils/constants";

const ContactLables = ({ client }) => {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.lightfont}>Mobile </Text>
        {client.email && <Text style={styles.lightfont}>Email </Text>}
      </View>
      <View>
        <Text selectable={true} style={styles.contactText}>
          {client.contact}
        </Text>
        {client.email && (
          <Text selectable={true} style={styles.contactText}>
            {client.email}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  lightfont: {
    color: "gray",
  },
  contactText: {
    color: Colors.OXFORD_BLUE,
    fontSize: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
});

export default ContactLables;
