import React, { useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import useGetServicesForClient from "./useGetServicesForClient";
import { getDate } from "../../../utils/getDate";
import { Divider } from "react-native-paper";
import { colours } from "../../../utils/constants";
import { useNavigation } from "@react-navigation/native";

export default function ServicesHistory({ clientId }) {
  const { services, getServices, isLoaded } = useGetServicesForClient();
  const navigation = useNavigation();

  useEffect(() => {
    getServices({ clientId });
  }, []);
  const navigateToOrder = (orderId) => {
    console.log("navigate to order");
    // navigation.navigate("Service Order", orderId);
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Entypo name="tools" size={24} />
        <Text>Services History</Text>
      </View>

      <Divider style={styles.divider} bold />
      {!services.length && isLoaded ? (
        <Text style={styles.noOrders}>No services found</Text>
      ) : (
        services.map((service, key) => (
          <Pressable
            key={key}
            style={[styles.row, styles.item]}
            onPress={() => navigateToOrder(service.id)}
          >
            <Text>{getDate(service.get("updatedAt"))}</Text>
            <Feather name="external-link" size={24} color="black" />
          </Pressable>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: colours.WHITE,
    borderRadius: 5,
    marginVertical: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    backgroundColor: colours.WHITE,
    borderColor: colours.ORANGE_WEB,
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "space-between",
    marginBottom: 5,
    borderRadius: 20,
    padding: 10,
  },
  divider: {
    backgroundColor: colours.OXFORD_BLUE,
    marginVertical: 5,
  },
  noOrders: {
    alignSelf: "center",
    paddingVertical: 10,
  },
});
