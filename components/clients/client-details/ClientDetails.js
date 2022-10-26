import React from "react";
import { StyleSheet, ScrollView, View, Text, Linking } from "react-native";
import { Avatar } from "react-native-paper";
import { colours } from "../../../utils/constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Vehicles from "./Vehicles";
import ServicesHistory from "./ServicesHistory";

const ClientDetails = ({ client }) => {
  // open contact
  // will not work on a simulator
  const goToCall = async () => {
    await Linking.openURL(`tel://${client.get("contact")}`);
  };
  const goToEmail = async () => {
    await Linking.openURL(`mailto://${client.get("email")}`);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heading}>
        <View style={styles.info}>
          <Text> ID: {client.id}</Text>
          <Text>
            Created at: {client.get("createdAt").toLocaleString("en-GB")}
          </Text>
        </View>
        <Avatar.Text
          size={120}
          label={`${client.get("name")[0]}${client.get("surname")[0]}`}
          style={styles.initials}
          color={colours.WHITE}
        />
        <Text style={[styles.title]}>
          {client.get("name")} {client.get("surname")}
        </Text>

        <View style={[styles.row, styles.contact]}>
          <View style={styles.row}>
            <Ionicons name="call" size={20} color={colours.OXFORD_BLUE} />
            <Text onPress={goToCall} style={styles.contactText}>
              {client.get("contact")}
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="email" size={20} color={colours.OXFORD_BLUE} />
            <Text onPress={goToEmail} style={styles.contactText}>
              {" "}
              {client.get("email")}
            </Text>
          </View>
        </View>
      </View>
      <Vehicles clientId={client.id} />
      <ServicesHistory clientId={client.id} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: colours.PLATINUM,
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: colours.WHITE,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  initials: {
    backgroundColor: colours.ORANGE_WEB,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contact: {
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  contactText: {
    color: colours.OXFORD_BLUE,
    fontSize: 15,
  },
});

export default ClientDetails;
