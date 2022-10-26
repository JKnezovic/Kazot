import { StyleSheet, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import Parse from "parse/react-native.js";
import Client from "./Client";
import VehicleIssue from "./VehicleIssue";
import ServiceStatusHistory from "./ServiceStatusHistroy";
import ServicesDone from "./ServicesDone";
import PartsSpent from "./PartsSpent";
import Attachments from "./Attachments";
import { Divider } from "react-native-paper";

const OrderDetailsMainScreen = ({ route }) => {
  const [service, setService] = useState([]);
  const { serviceId } = route.params;

  const getService = async () => {
    const serviceQuery = new Parse.Query("Services");
    serviceQuery.include("vehicle_fkey");
    serviceQuery.include("client_fkey");
    serviceQuery.equalTo("objectId", serviceId);
    try {
      let Service = await serviceQuery.first();
      setService(Service);
      console.log(Service);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Client />
      <Divider bold={true} />
      <VehicleIssue />
      <Divider bold={true} />
      <ServiceStatusHistory />
      <Divider bold={true} />
      <ServicesDone />
      <Divider bold={true} />
      <PartsSpent />
      <Divider bold={true} />
      <Attachments />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default OrderDetailsMainScreen;
