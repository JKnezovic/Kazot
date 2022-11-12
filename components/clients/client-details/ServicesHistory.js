import React, { useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import useGetServicesForClient from "./useGetServicesForClient";
import { Divider } from "react-native-paper";
import { colours } from "../../../utils/constants";
import { useNavigation } from "@react-navigation/native";

export default function ServicesHistory({ clientId }) {
  const { services, getServices, isLoaded, reset } = useGetServicesForClient();
  const navigation = useNavigation();

  useEffect(() => {
    reset();
    getServices({ clientId });
  }, [clientId]);
  const navigateToOrder = (orderId) => {
    navigation.navigate("orderDetails", { serviceId: orderId });
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
            <Text>
              {service.get("updatedAt").toLocaleString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
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
