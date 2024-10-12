import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";

const ContactLabels = ({ client }) => {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.lightfont}>Mobile </Text>
        {client.email && <Text style={styles.lightfont}>Email </Text>}
      </View>
      <View>
        <Text selectable style={styles.contactText}>
          {client.contact}
        </Text>
        {client.email && (
          <Text selectable style={styles.contactText}>
            {client.email}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ContactLabels;
