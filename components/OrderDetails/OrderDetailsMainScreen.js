import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import Parse from "parse/react-native.js";
import Client from "./Client";
import VehicleIssue from "./VehicleIssue";
import ServiceStatusHistory from "./ServiceStatusHistory";
import ServicesDone from "./ServicesDone";
import PartsSpent from "./PartsSpent";
import Attachments from "./Attachments";
import {
  Divider,
  Snackbar,
  Button,
  Portal,
  Dialog,
  DataTable,
} from "react-native-paper";
import { colours } from "../../utils/constants";
import useScreenDimensions from "../../useScreenDimensions";
import { serviceStatuses } from "../../utils/constants";
import serviceOrderTransformer from "../Orders/serviceOrderTransformer";
import IsLoading from "../Inventory/IsLoading";

const OrderDetailsMainScreen = ({ route, navigation }) => {
  const [service, setService] = useState({});
  const { serviceId } = route.params;
  const [activityIndicator, setActivityIndicator] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [visible, setVisible] = useState(false);
  const screenData = useScreenDimensions();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getService();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: service?.serviceId,
      headerRight: () => (
        <Button
          mode="outlined"
          textColor={colours.ORANGE_WEB}
          style={{ borderColor: colours.ORANGE_WEB, marginLeft: 10 }}
          onPress={() => setVisible(true)}
        >
          {service.status}
        </Button>
      ),
      headerTitleAlign: "center",
    });
  }, [navigation, service]);

  const setSnackbar = (visible, message) => {
    setSnackbarMessage(message);
    setVisibleSnackbar(visible);
  };

  const getService = async () => {
    const serviceQuery = new Parse.Query("Services");
    serviceQuery.include("vehicle_fkey");
    serviceQuery.include("client_fkey");
    serviceQuery.equalTo("objectId", serviceId);
    try {
      let Service = await serviceQuery.first();
      setService(serviceOrderTransformer({ serviceOrder: Service }));
      setActivityIndicator(false);
      return true;
    } catch (error) {
      console.log("Error !", error.message);
      setSnackbar(true, "Oops, something went wrong!");
      return false;
    }
  };

  const SaveNewStatusHistory = async (value) => {
    setLoading(true);
    setVisible(false);
    const currentUser = await Parse.User.currentAsync();
    let StatusHistory = new Parse.Object("OrderStatusHistory");
    StatusHistory.set("status", value);
    let serviceObject = new Parse.Object("Services", {
      id: service.serviceOrderId,
    });
    StatusHistory.set("service_fkey", serviceObject);
    StatusHistory.set("user_name", currentUser.get("username"));

    serviceObject.set("status", value);

    try {
      let statusHistory = await StatusHistory.save();
      let serviceUpdate = await serviceObject.save();
      setService(serviceOrderTransformer({ serviceOrder: serviceUpdate }));
      setLoading(false);
      setSnackbar(true, "Saved successfully");
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      setLoading(false);
      console.log(error);
      return false;
    }
  };

  if (activityIndicator)
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#fca311"
          style={{ alignSelf: "center" }}
        />
      </View>
    );

  const items = serviceStatuses.map((item, index) => (
    <DataTable.Row key={index}>
      <DataTable.Cell onPress={() => SaveNewStatusHistory(item.value)}>
        {item.label}
      </DataTable.Cell>
    </DataTable.Row>
  ));

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={screenData.isLandscape && styles.landscapeLayout}>
          <View style={screenData.isLandscape && styles.landscapeItems}>
            <Client service={service} open={true} />
            <Divider bold={true} />
            <VehicleIssue
              service={service}
              open={true}
              setSnackbar={setSnackbar}
              getService={getService}
            />
            <Divider bold={true} />
            <ServiceStatusHistory
              service={service}
              open={screenData.isLandscape && true}
            />
            <Divider bold={true} />
          </View>
          <View style={screenData.isLandscape && styles.landscapeItems}>
            <ServicesDone
              service={service}
              setSnackbar={setSnackbar}
              open={screenData.isLandscape && true}
              setLoading={setLoading}
            />
            <Divider bold={true} />
            <PartsSpent
              service={service}
              setSnackbar={setSnackbar}
              open={screenData.isLandscape && true}
              setLoading={setLoading}
            />
            <Divider bold={true} />
            <Attachments
              service={service}
              setSnackbar={setSnackbar}
              open={screenData.isLandscape && true}
              setLoading={setLoading}
            />
          </View>
        </View>
      </ScrollView>
      <IsLoading loading={loading} />
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={1000}
      >
        {snackbarMessage}
      </Snackbar>
      <Portal>
        <Dialog
          style={{ backgroundColor: "#FFFFFF" }}
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          <Dialog.Title>Change Order Status</Dialog.Title>
          <Dialog.Content>
            <DataTable>
              <ScrollView>{items}</ScrollView>
            </DataTable>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  landscapeLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  landscapeItems: {
    width: "49%",
  },
});

export default OrderDetailsMainScreen;
