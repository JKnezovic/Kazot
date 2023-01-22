import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import Parse from "parse/react-native.js";
import Client from "./Client";
import VehicleIssue from "./VehicleIssue";
import ServiceStatusHistory from "./ServiceStatusHistory";
import ServicesDone from "./ServicesDone";
import PartsSpent from "./PartsSpent";
import Attachments from "./Attachments";
import { Divider, Snackbar } from "react-native-paper";
import useScreenDimensions from "../../useScreenDimensions";
import serviceOrderTransformer from "../Orders/serviceOrderTransformer";
import IsLoading from "../Inventory/IsLoading";
import BackButtonOrders from "./BackButtonOrders";
import OrderStatusButton from "./OrderStatusButton";
import ServiceStatusDialog from "./ServiceStatusDialog";
import { useFocusEffect } from "@react-navigation/native";
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
      headerLeft: () => <BackButtonOrders />,
      headerRight: () => (
        <OrderStatusButton service={service} setVisible={setVisible} />
      ),
      headerTitleAlign: "center",
    });
  }, [navigation, service]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (visible) {
          return false;
        } else {
          navigation.navigate("Orders");
          return true;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [visible])
  );

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
      <ServiceStatusDialog
        SaveNewStatusHistory={SaveNewStatusHistory}
        setVisible={setVisible}
        visible={visible}
      />
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
