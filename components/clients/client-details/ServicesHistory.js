import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useGetServicesForClient from "./useGetServicesForClient";
import { List } from "react-native-paper";
import { colours } from "../../../utils/constants";
import { useNavigation } from "@react-navigation/native";

export default function ServicesHistory({ clientId }) {
  const { services, getServices, isLoaded, reset } = useGetServicesForClient();
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleExpansion = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    reset();
    getServices({ clientId });
  }, [clientId]);
  const navigateToOrder = (orderId) => {
    navigation.navigate("orderDetails", { serviceId: orderId });
  };
  return (
    <View style={styles.container}>
      <List.Accordion
        style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
        titleStyle={{ color: "#14213D" }}
        title="Services History"
        left={(props) => <List.Icon {...props} icon="hammer-wrench" />}
        expanded={isExpanded}
        onPress={handleExpansion}
      >
        {!services.length && isLoaded ? (
          <List.Item
            title="No orders found"
            titleStyle={{
              textAlign: "center",
            }}
            right={() => <View />}
          />
        ) : (
          services.map((service, key) => (
            <List.Item
              onPress={() => navigateToOrder(service.serviceOrderId)}
              key={key}
              title={service.createdAt}
              right={(props) => <List.Icon {...props} icon="open-in-new" />}
            />
          ))
        )}
      </List.Accordion>
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
