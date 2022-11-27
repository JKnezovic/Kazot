import React from "react";
import { StyleSheet, ScrollView, View, Text, Linking } from "react-native";
import { Avatar, FAB } from "react-native-paper";
import { colours } from "../../../utils/constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Vehicles from "./Vehicles";
import ServicesHistory from "./ServicesHistory";
import { moderateScale } from "../../../Scaling";
import { useNavigation } from "@react-navigation/native";

const ClientDetails = ({ client }) => {
  const navigation = useNavigation();

  // open contact
  // will not work on a simulator
  const goToCall = async () => {
    await Linking.openURL(`tel:${client.get("contact")}`);
  };
  const goToEmail = async () => {
    await Linking.openURL(`mailto:${client.get("email")}`);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heading}>
        <Avatar.Text
          size={120}
          label={
            client.get("surname")[0]
              ? `${client.get("name")[0]}${client.get("surname")[0]}`
              : `${client.get("name")[0]}${client.get("name")[1]}`
          }
          style={styles.initials}
          labelStyle={styles.label}
          color={colours.WHITE}
        />
        <Text style={[styles.title]}>
          {client.get("name")} {client.get("surname")}
        </Text>

        <View style={[styles.row, styles.contact]}>
          <View style={[styles.row, styles.contactWrap]}>
            <Ionicons name="call" size={20} color={colours.OXFORD_BLUE} />
            <Text onPress={goToCall} style={styles.contactText}>
              {" "}
              {client.get("contact")}
            </Text>
          </View>
          {client.get("surname") && (
            <View style={[styles.row, styles.contactWrap]}>
              <MaterialIcons
                name="email"
                size={20}
                color={colours.OXFORD_BLUE}
              />
              <Text onPress={goToEmail} style={styles.contactText}>
                {" "}
                {client.get("email")}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Vehicles clientId={client.id} />
      <ServicesHistory clientId={client.id} />
      <FAB
        icon="plus"
        label={"New Order"}
        mode="elevated"
        color={colours.OXFORD_BLUE}
        style={styles.FAB}
        onPress={() => navigation.navigate("New Order", { client: client })}
      />
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
    paddingHorizontal: 5,
    paddingVertical: 10,
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
    justifyContent: "flex-end",
    width: "100%",
  },
  initials: {
    backgroundColor: colours.ORANGE_WEB,
    marginVertical: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contact: {
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: moderateScale(5),
  },
  contactText: {
    color: colours.OXFORD_BLUE,
    fontSize: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  FAB: {
    backgroundColor: colours.ORANGE_WEB,
    position: "absolute",
    bottom: "3%",
    right: "3%",
  },
  contactWrap: {
    paddingVertical: moderateScale(8),
  },
  label: {
    fontSize: 50,
  },
});

export default ClientDetails;
