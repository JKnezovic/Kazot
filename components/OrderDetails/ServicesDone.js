import { useState, useEffect } from "react";
import {
  List,
  Button,
  TextInput,
  Dialog,
  Portal,
  Paragraph,
} from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colours } from "../../utils/constants";
import Parse from "parse/react-native.js";

const ServicesDone = ({ service, setSnackbar, open }) => {
  const [expanded, setExpanded] = useState(open);
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceHistory, setServiceHistory] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    getServiceHistory();
  }, []);

  const getServiceHistory = async () => {
    const serviceQuery = new Parse.Query("ServicesHistory");
    serviceQuery.descending("createdAt");
    serviceQuery.equalTo("service_fkey", service);
    try {
      let ServiceHistory = await serviceQuery.find();
      setServiceHistory(ServiceHistory);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

  const SaveNewServiceHistory = async () => {
    const currentUser = await Parse.User.currentAsync();
    let ServiceHistory = new Parse.Object("ServicesHistory");
    ServiceHistory.set("service_fkey", service);
    ServiceHistory.set("user_fkey", currentUser);
    ServiceHistory.set("user_name", currentUser.get("username"));
    ServiceHistory.set("service_description", serviceDescription);

    try {
      let serviceHistory = await ServiceHistory.save();
      setVisible(false);
      setServiceDescription("");
      setSnackbar(true, "Saved successfully");
      getServiceHistory();
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      return false;
    }
  };

  const deleteSetup = (item) => {
    setVisibleDelete(true);
    setDeleteItem(item);
  };

  const deleteServiceHistory = async () => {
    const serviceQuery = new Parse.Object("ServicesHistory");
    serviceQuery.set("objectId", deleteItem?.id);
    try {
      await serviceQuery.destroy();
      setVisibleDelete(false);
      getServiceHistory();
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

  const listItems = serviceHistory.map((item, key) => (
    <List.Item
      key={key}
      right={() => (
        <View style={{ justifyContent: "center" }}>
          <AntDesign
            style={{ alignSelf: "center", paddingHorizontal: 10 }}
            name="delete"
            size={20}
            color="red"
            onPress={() => deleteSetup(item)}
          />
        </View>
      )}
      description={() => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ color: "grey" }}>
            {item.get("createdAt").toLocaleDateString("de-DE")}
          </Text>
          <Text style={{ color: "gray" }}>{item.get("user_name")}</Text>
        </View>
      )}
      titleStyle={{ paddingHorizontal: 10 }}
      descriptionStyle={{ paddingHorizontal: 10 }}
      title={item.get("service_description")}
      titleNumberOfLines={3}
    />
  ));

  return (
    <View>
      <List.Accordion
        style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
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
                onPress={() => setVisible(true)}
              />
            </View>
          )}
          titleStyle={{ fontWeight: "bold", paddingHorizontal: 10 }}
          title="Services"
        />

        {listItems}
      </List.Accordion>
      <Portal>
        <Dialog
          style={{ backgroundColor: "#FFFFFF" }}
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          <Dialog.Title>Service description</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              activeOutlineColor="#fca311"
              onChangeText={(text) => setServiceDescription(text)}
              value={serviceDescription}
              style={{ backgroundColor: "#FFFFFF" }}
              multiline
              numberOfLines={4}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor={colours.OXFORD_BLUE}
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button
              textColor={colours.ORANGE_WEB}
              disabled={serviceDescription ? false : true}
              onPress={() => SaveNewServiceHistory()}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          style={{ backgroundColor: "#FFFFFF" }}
          visible={visibleDelete}
          onDismiss={() => setVisibleDelete(false)}
        >
          <Dialog.Content>
            <Paragraph style={{ fontWeight: "bold", fontSize: 15 }}>
              Are you sure you want to delete this item:
            </Paragraph>
            <Paragraph>{deleteItem?.get("service_description")}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor={colours.OXFORD_BLUE}
              onPress={() => setVisibleDelete(false)}
            >
              Cancel
            </Button>
            <Button
              textColor={colours.ANTIQUE_RUBY}
              onPress={() => deleteServiceHistory()}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ServicesDone;
