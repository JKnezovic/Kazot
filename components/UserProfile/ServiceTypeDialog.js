import { Dialog, Button, DataTable } from "react-native-paper";
import { Colors } from "../../utils/constants";
import { moderateScale } from "../../Scaling";
import { StyleSheet, View, ScrollView, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import Parse from "parse/react-native.js";
import { AntDesign } from "@expo/vector-icons";
import DeleteDialog from "../Inventory/Dialogs/DeleteDialog";
import AddDialog from "./AddDialog";

const ServiceTypeDialog = ({ visible, setVisible, setSnackbar }) => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  useEffect(() => {
    getServiceTypes();
  }, []);

  const getServiceTypes = async function () {
    const parseQuery = new Parse.Query("ServiceType");
    parseQuery.ascending("name");
    try {
      let serviceType = await parseQuery.find();
      var serviceTypeJSON = JSON.parse(JSON.stringify(serviceType));
      setServiceTypes(serviceTypeJSON);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

  const saveServiceType = async (serviceName) => {
    let service_type = new Parse.Object("ServiceType");
    service_type.set("name", serviceName);

    try {
      await service_type.save();
      // Success
      setIsAdd(false);
      getServiceTypes();
      setSnackbar(true, "New service type added successfully!");
      return true;
    } catch (error) {
      setSnackbar(true, "Ops, something went wrong!");
      console.log(error);
      return false;
    }
  };

  const deleteServiceType = async () => {
    let service_type = new Parse.Object("ServiceType");
    service_type.set("objectId", deleteItem.objectId);

    try {
      await service_type.destroy();
      setDeleteItem(null);
      setIsDelete(false);
      setSnackbar(true, "Deleted successfully");
      getServiceTypes();
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      return false;
    }
  };

  const removeItem = (item) => {
    setDeleteItem(item);
    setIsDelete(true);
  };

  const tableRows = serviceTypes.map((x) => (
    <DataTable.Row key={x.objectId}>
      <View style={styles.customCell}>
        <Text numberOfLines={5}>{x.name}</Text>
      </View>
      <DataTable.Cell numeric>
        <AntDesign
          style={{ alignSelf: "center" }}
          name="close"
          size={24}
          color={Colors.ANTIQUE_RUBY}
          onPress={() => removeItem(x)}
        />
      </DataTable.Cell>
    </DataTable.Row>
  ));

  return (
    <Dialog
      style={styles.dialog}
      visible={visible}
      onDismiss={() => setVisible(false)}
    >
      {isDelete && (
        <DeleteDialog
          doDelete={deleteServiceType}
          setIsDelete={setIsDelete}
          item={deleteItem?.name}
        />
      )}
      {isAdd && <AddDialog doSave={saveServiceType} setIsAdd={setIsAdd} />}
      {!isDelete && !isAdd && (
        <>
          <Dialog.Title>{"Service types"}</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{ height: "70%" }}>
              <DataTable style={{ marginVertical: 20 }}>
                <DataTable.Header>
                  <View style={styles.customCell}>
                    <Text>Name</Text>
                  </View>
                  <Pressable
                    onPress={() => setIsAdd(true)}
                    style={styles.customTitle}
                  >
                    <AntDesign
                      style={styles.end}
                      name="pluscircleo"
                      size={25}
                      color="green"
                    />
                  </Pressable>
                </DataTable.Header>
                {tableRows}
              </DataTable>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor={Colors.OXFORD_BLUE}
              onPress={() => setVisible(false)}
            >
              Close
            </Button>
          </Dialog.Actions>
        </>
      )}
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#FFFFFF",
    width: moderateScale(330),
    alignSelf: "center",
  },
  textInput: {
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
  },
  downPush: {
    backgroundColor: "#FFFFFF",
  },
  customCell: {
    width: "80%",
    marginVertical: 8,
    justifyContent: "center",
  },
  customTitle: {
    alignSelf: "center",
    width: "20%",
  },
  text: {
    color: "gray",
    fontWeight: "500",
  },
  end: {
    alignSelf: "flex-end",
  },
});

export default ServiceTypeDialog;
