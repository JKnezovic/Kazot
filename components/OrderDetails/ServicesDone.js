import { useState, useEffect } from "react";
import { List } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../utils/constants";
import Parse from "parse/react-native.js";
import DateToDDMMYY from "../../utils/DateToDDMMYY";
import ServicesDialogWrapper from "./ServicesDialogWrapper";

const ServicesDone = ({ service, setSnackbar, open, setLoading }) => {
  const [expanded, setExpanded] = useState(open);
  const [visible, setVisible] = useState(false);
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceHistory, setServiceHistory] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    getServiceHistory();
  }, []);

  const prepareDialog = (service_description = "", itemID = "") => {
    setServiceDescription(service_description);
    setUpdateId(itemID);
    setVisible(true);
  };

  const getServiceHistory = async () => {
    const serviceQuery = new Parse.Query("ServicesHistory");
    serviceQuery.descending("createdAt");
    const serviceObject = new Parse.Object("Services", {
      id: service.serviceOrderId,
    });
    serviceQuery.equalTo("service_fkey", serviceObject);
    try {
      let ServiceHistory = await serviceQuery.find();
      setServiceHistory(ServiceHistory);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

  const SaveNewServiceHistory = async (service_description) => {
    setLoading(true);
    const currentUser = await Parse.User.currentAsync();
    let ServiceHistory = new Parse.Object("ServicesHistory");
    const serviceObject = new Parse.Object("Services", {
      id: service.serviceOrderId,
    });
    ServiceHistory.set("service_fkey", serviceObject);
    ServiceHistory.set("user_fkey", currentUser);
    ServiceHistory.set("user_name", currentUser.get("username"));
    ServiceHistory.set("service_description", service_description);

    try {
      let serviceHistory = await ServiceHistory.save();
      setVisible(false);
      setServiceDescription("");
      setSnackbar(true, "Saved successfully");
      setLoading(false);
      getServiceHistory();
      return true;
    } catch (error) {
      setLoading(false);
      setSnackbar(true, "Oops, something went wrong");
      return false;
    }
  };

  const UpdateServiceHistory = async (service_description) => {
    setLoading(true);
    let ServiceHistory = new Parse.Object("ServicesHistory");
    ServiceHistory.set("objectId", updateId);
    ServiceHistory.set("service_description", service_description);

    try {
      let serviceHistory = await ServiceHistory.save();
      setVisible(false);
      setServiceDescription("");
      setUpdateId("");
      setSnackbar(true, "Saved successfully");
      setLoading(false);
      getServiceHistory();
      return true;
    } catch (error) {
      setLoading(false);
      setSnackbar(true, "Oops, something went wrong");
      return false;
    }
  };

  const deleteServiceHistory = async () => {
    setLoading(true);
    const serviceQuery = new Parse.Object("ServicesHistory");
    serviceQuery.set("objectId", updateId);
    try {
      await serviceQuery.destroy();
      setVisible(false);
      setServiceDescription("");
      setUpdateId("");
      setIsDelete(false);
      setLoading(false);
      getServiceHistory();
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      setLoading(false);
      return false;
    }
  };

  const listItems = serviceHistory.map((item, key) => (
    <List.Item
      onPress={() => prepareDialog(item.get("service_description"), item.id)}
      key={key}
      right={() => (
        <View style={{ justifyContent: "center" }}>
          <AntDesign
            style={{ alignSelf: "center", paddingHorizontal: 10 }}
            name="edit"
            size={20}
            color={Colors.ORANGE_WEB}
          />
        </View>
      )}
      description={() => (
        <View style={styles.description}>
          <Text style={{ color: "grey" }}>
            {DateToDDMMYY(item.get("createdAt"))}
          </Text>
          <Text style={{ color: "gray", marginRight: 15 }}>
            {item.get("user_name")}
          </Text>
        </View>
      )}
      titleStyle={{ paddingHorizontal: 10 }}
      style={{ paddingLeft: 8 }}
      title={item.get("service_description")}
      titleNumberOfLines={15}
    />
  ));

  return (
    <>
      <List.Accordion
        style={styles.accordion}
        titleStyle={{ color: "#14213D" }}
        title={"Services Done"}
        left={(props) => <List.Icon {...props} icon="wrench" color="#fca311" />}
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item
          right={() => (
            <View style={{ justifyContent: "center", paddingHorizontal: 10 }}>
              <AntDesign
                style={{ alignSelf: "center" }}
                name="pluscircleo"
                size={24}
                color="green"
                onPress={() => prepareDialog()}
              />
            </View>
          )}
          titleStyle={{ fontWeight: "bold", paddingHorizontal: 10 }}
          title="Services"
        />

        {listItems}
      </List.Accordion>
      <ServicesDialogWrapper
        visible={visible}
        setVisible={setVisible}
        serviceDescription={serviceDescription}
        SaveNewServiceHistory={SaveNewServiceHistory}
        UpdateServiceHistory={UpdateServiceHistory}
        deleteServiceHistory={deleteServiceHistory}
        setIsDelete={setIsDelete}
        isDelete={isDelete}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  description: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  accordion: {
    backgroundColor: "rgba(229, 229, 229, 0.4)",
  },
});

export default ServicesDone;
