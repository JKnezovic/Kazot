import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import Parse from "parse/react-native.js";
import Client from "./Client";
import VehicleIssue from "./VehicleIssue";
import ServiceStatusHistory from "./ServiceStatusHistory";
import ServicesDone from "./ServicesDone";
import PartsSpent from "./PartsSpent";
import Attachments from "./Attachments";
import { Divider, Snackbar, Button, Portal, Dialog } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { colours } from "../../utils/constants";
import useScreenDimensions from "../../useScreenDimensions";

const OrderDetailsMainScreen = ({ route, navigation }) => {
  const [service, setService] = useState(null);
  const { serviceId } = route.params;
  const [activityIndicator, setActivityIndicator] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const screenData = useScreenDimensions();

  useEffect(() => {
    getService();
    getOrderStatuses();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: service?.get("service_id"),
      headerRight: () => (
        <Button
          mode="outlined"
          textColor={colours.ORANGE_WEB}
          style={{ borderColor: colours.ORANGE_WEB, marginLeft: 10 }}
          onPress={() => setVisible(true)}
        >
          {service?.get("status")}
        </Button>
      ),
      headerTitleAlign: "center",
    });
  }, [navigation, service]);

  const getOrderStatuses = async () => {
    const serviceQuery = new Parse.Query("OrderStatus");
    try {
      let statuses = await serviceQuery.findAll();
      let resultJSON = JSON.parse(JSON.stringify(statuses));
      setOrderStatuses(resultJSON);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

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
      setService(Service);
      setActivityIndicator(false);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      setSnackbar(true, "Oops, something went wrong!");
      return false;
    }
  };

  const setChange = (text) => {
    setValue(text);
    setVisible(false);
    SaveNewStatusHistory();
  };

  const SaveNewStatusHistory = async () => {
    const currentUser = await Parse.User.currentAsync();
    let StatusHistory = new Parse.Object("OrderStatusHistory");
    StatusHistory.set("status", value);
    StatusHistory.set("service_fkey", service);
    StatusHistory.set("user_name", currentUser.get("username"));

    let serviceQuery = new Parse.Object("Services");
    serviceQuery.set("objectId", service.id);
    serviceQuery.set("status", value);

    try {
      let statusHistory = await StatusHistory.save();
      let serviceUpdate = await serviceQuery.save();
      setVisible(false);
      setValue("");
      setService(serviceUpdate);
      setSnackbar(true, "Saved successfully");
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
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
            />
            <Divider bold={true} />
            <PartsSpent
              service={service}
              setSnackbar={setSnackbar}
              open={screenData.isLandscape && true}
            />
            <Divider bold={true} />
            <Attachments
              service={service}
              setSnackbar={setSnackbar}
              open={screenData.isLandscape && true}
            />
          </View>
        </View>
      </ScrollView>
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
          <Dialog.Title>Change order status:</Dialog.Title>
          <Dialog.Content>
            <DropDownPicker
              schema={{
                label: "Name",
                value: "Name",
              }}
              listMode="SCROLLVIEW"
              closeOnBackPressed={true}
              itemSeparator={true}
              value={value}
              open={open}
              items={orderStatuses}
              placeholder="Select Status"
              onChangeValue={(text) => setChange(text)}
              setItems={setOrderStatuses}
              setValue={setValue}
              setOpen={setOpen}
            ></DropDownPicker>
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
