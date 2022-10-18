import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { colours } from "../../utils/constants";

export default function ClientItem({ client = {} }) {
  const navigation = useNavigation();
  const openClientDetails = () => {
    // if vertical
    navigation.navigate("Client Details", client);
    // if landscape
    // open client details in same view
  };
  return (
    <View>
      <Pressable onPress={openClientDetails} style={styles.item}>
        <Avatar.Text
          size={60}
          label={`${client.get("name")[0]}${client.get("surname")[0]}`}
          style={styles.initials}
          color={colours.WHITE}
        />
        <Text style={styles.text}>
          {client.get("name")} {client.get("surname")}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 75,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "grey",
    fontWeight: "400",
    fontSize: 18,
  },
  initials: {
    backgroundColor: colours.ORANGE_WEB,
    marginRight: 5,
  },
});
