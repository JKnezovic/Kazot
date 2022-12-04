import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import { colours } from "../../utils/constants";

export default function ClientItem({
  client = {},
  selected = false,
  navigation,
}) {
  const openClientDetails = () => {
    navigation.navigate("Client Details", { clientId: client.clientId });
  };
  return (
    <View>
      <Pressable
        onPress={openClientDetails}
        style={[styles.item, selected && styles.selected]}
      >
        <Avatar.Text
          size={60}
          label={client.initials}
          labelStyle={styles.label}
          style={styles.initials}
          color={colours.WHITE}
        />
        <Text style={styles.text}>
          {client.name} {client.surname}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    height: 75,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    /*     shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, */
    borderRadius: 5,
    marginBottom: 1,
  },
  selected: {
    borderColor: colours.OXFORD_BLUE,
    borderStyle: "solid",
    borderWidth: 1,
  },
  text: {
    color: "grey",
    fontWeight: "400",
    fontSize: 18,
  },
  initials: {
    backgroundColor: colours.ORANGE_WEB,
    marginRight: 10,
  },
  label: {
    fontSize: 25,
  },
});
