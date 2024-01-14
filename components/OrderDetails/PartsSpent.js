import { useState, useEffect } from "react";
import {
  List,
  Dialog,
  Portal,
  Button,
  TextInput,
  DataTable,
  IconButton,
} from "react-native-paper";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Parse from "parse/react-native.js";
import DropDownPicker from "react-native-dropdown-picker";
import { moderateScale } from "../../Scaling";
import { colours } from "../../utils/constants";

const PartsSpent = ({ service, setSnackbar, open, setLoading }) => {
  const [expanded, setExpanded] = useState(open);
  const [allParts, setAllParts] = useState([]);
  const [partsUsed, setPartsUsed] = useState([]);
  const [visible, setVisible] = useState(false);
  const [valuePU, setValuePU] = useState("");
  const [openPU, setOpenPU] = useState(false);
  const [number, setNumber] = useState("1");
  const [updateItem, setUpdateItem] = useState(null);
  const [dropdownDisabled, setDropdownDisabled] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    getAllParts();
    getPartsUsed();
  }, []);

  const DeletePartsUsed = async () => {
    setLoading(true);
    let PartsUsed = new Parse.Object("PartsUsed");
    PartsUsed.set("objectId", updateItem.objectId);

    try {
      await PartsUsed.destroy();
      updateInventory(updateItem, updateItem.quantity_spent);
      setVisible(false);
      setValuePU("");
      setNumber("1");
      setSnackbar(true, "Saved successfully");
      getPartsUsed();
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      setLoading(false);
      return false;
    }
  };

  const updateInventory = async (item, difference = 0) => {
    let query = new Parse.Query("Inventory");
    // equalTo can be used in any data type
    query.equalTo("name", item.part_name);

    try {
      let queryResult = await query.first();

      let updateQuery = new Parse.Object("Inventory");
      updateQuery.set("objectId", queryResult.id);
      updateQuery.set("stock", queryResult.get("stock") + difference);
      let result = await updateQuery.save();
      setLoading(false);
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      setLoading(false);
      console.log(error);
      return false;
    }
  };

  const getAllParts = async () => {
    const serviceQuery = new Parse.Query("Inventory");
    try {
      let Parts = await serviceQuery.findAll();
      let resultJSON = JSON.parse(JSON.stringify(Parts));
      setAllParts(resultJSON);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

  const getPartsUsed = async () => {
    const serviceQuery = new Parse.Query("PartsUsed");
    const serviceObject = new Parse.Object("Services", {
      id: service.serviceOrderId,
    });
    serviceQuery.equalTo("service_fkey", serviceObject);
    try {
      let PartsUsed = await serviceQuery.find();
      setPartsUsed(PartsUsed);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

  const SavePartsUsed = async () => {
    setLoading(true);
    let PartsUsed = new Parse.Object("PartsUsed");
    const serviceObject = new Parse.Object("Services", {
      id: service.serviceOrderId,
    });
    PartsUsed.set("service_fkey", serviceObject);
    PartsUsed.set("quantity_spent", parseInt(number));
    PartsUsed.set("part_name", valuePU);
    PartsUsed.set("SKU", selectedItem.SKU);
    PartsUsed.set("parts_fkey", selectedItem.objectId);

    try {
      let partsUsed = await PartsUsed.save();
      updateInventory(JSON.parse(JSON.stringify(partsUsed)), -parseInt(number));
      setVisible(false);
      setValuePU("");
      setNumber("1");
      setSnackbar(true, "Saved successfully");
      getPartsUsed();
      return true;
    } catch (error) {
      setLoading(false);
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      return false;
    }
  };

  const UpdatePartsUsed = async () => {
    setLoading(true);
    let PartsUsed = new Parse.Object("PartsUsed");
    PartsUsed.set("objectId", updateItem.objectId);
    PartsUsed.set("quantity_spent", parseInt(number));
    try {
      let partsUsed = await PartsUsed.save();
      setVisible(false);
      updateInventory(updateItem, updateItem.quantity_spent - parseInt(number));
      setValuePU("");
      setNumber("1");
      setSnackbar(true, "Saved successfully");
      getPartsUsed();
      return true;
    } catch (error) {
      setLoading(false);
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      return false;
    }
  };

  const prepareUpdate = (item) => {
    setUpdateItem(JSON.parse(JSON.stringify(item)));
    setValuePU(item.get("part_name"));
    setVisible(true);
    setNumber(item.get("quantity_spent").toString());
    setDropdownDisabled(true);
    setUpdate(true);
  };

  const prepareAddNew = () => {
    setSelectedItem(null);
    setUpdateItem(null);
    setValuePU("");
    setVisible(true);
    setNumber("1");
    setDropdownDisabled(false);
    setUpdate(false);
  };

  const increment = () => {
    var value = parseInt(number) + 1;
    setNumber(value.toString());
  };

  const decrement = () => {
    var value = parseInt(number) - 1;
    setNumber(value.toString());
  };

  const tableRows = partsUsed.map((item) => (
    <DataTable.Row key={item.id} onPress={() => prepareUpdate(item)}>
      <View style={styles.customCell}>
        <Text numberOfLines={5}>
          {item.get("SKU") ? item.get("SKU") : item.get("part_name")}
        </Text>
      </View>
      <DataTable.Cell numeric>{item.get("quantity_spent")}</DataTable.Cell>
      <DataTable.Cell numeric>
        <AntDesign
          style={{ alignSelf: "center" }}
          name="edit"
          size={24}
          color={colours.ORANGE_WEB}
        />
      </DataTable.Cell>
    </DataTable.Row>
  ));

  return (
    <>
      <List.Accordion
        style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
        titleStyle={{ color: "#14213D" }}
        title={"Parts Used"}
        left={(props) => (
          <List.Icon {...props} icon="archive-cog" color="#fca311" />
        )}
        expanded={expanded}
        onPress={handlePress}
      >
        <DataTable style={{ paddingLeft: 0, paddingRight: 0 }}>
          <DataTable.Header>
            <View style={styles.customCell}>
              <Text style={styles.text}>SKU</Text>
            </View>
            <View style={styles.customTitle}>
              <Text style={[styles.text, styles.end]}> Quantity</Text>
            </View>
            <Pressable
              onPress={() => prepareAddNew()}
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
      </List.Accordion>
      <Portal>
        <Dialog
          style={{ backgroundColor: "#FFFFFF" }}
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          <Dialog.Title>Add parts used</Dialog.Title>
          <Dialog.Content>
            <DropDownPicker
              schema={{
                label: "name",
                value: "name",
              }}
              disabled={dropdownDisabled}
              listMode="MODAL"
              closeOnBackPressed={true}
              itemSeparator={true}
              searchable={true}
              value={valuePU}
              open={openPU}
              //dropDownContainerStyle={Styles.form_input}
              items={allParts}
              placeholder="Select Part Used"
              onChangeValue={(text) => setValuePU(text)}
              onSelectItem={(item) => {
                setSelectedItem(JSON.parse(JSON.stringify(item)));
              }}
              setItems={setAllParts}
              setValue={setValuePU}
              setOpen={setOpenPU}
            ></DropDownPicker>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Text style={{ alignSelf: "center" }}>
                {"Quantity Spent:   "}
              </Text>
              <IconButton
                style={{ alignSelf: "center" }}
                icon="minus"
                mode="outlined"
                iconColor={colours.ORANGE_WEB}
                size={20}
                onPress={() => decrement()}
              />
              <TextInput
                style={{
                  width: moderateScale(50),
                  marginVertical: 20,
                  backgroundColor: "#FFFFFF",
                }}
                activeUnderlineColor={colours.ORANGE_WEB}
                keyboardType="number-pad"
                value={number}
                onChangeText={(text) => setNumber(text)}
              />
              <IconButton
                icon="plus"
                style={{ alignSelf: "center" }}
                mode="outlined"
                iconColor={colours.ORANGE_WEB}
                size={20}
                onPress={() => increment()}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor={colours.OXFORD_BLUE}
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>
            {update ? (
              <>
                <Button
                  textColor={colours.ANTIQUE_RUBY}
                  onPress={() => DeletePartsUsed()}
                >
                  Delete
                </Button>
                <Button
                  textColor={colours.ORANGE_WEB}
                  onPress={() => UpdatePartsUsed()}
                >
                  Update
                </Button>
              </>
            ) : (
              <Button
                textColor={colours.ORANGE_WEB}
                disabled={valuePU ? false : true}
                onPress={() => SavePartsUsed()}
              >
                Save
              </Button>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  customCell: {
    width: "60%",
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

export default PartsSpent;
