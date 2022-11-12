import { useState, useEffect } from "react";
import {
  List,
  Dialog,
  Portal,
  Button,
  TextInput,
  DataTable,
} from "react-native-paper";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Parse from "parse/react-native.js";
import DropDownPicker from "react-native-dropdown-picker";
import { moderateScale } from "../../Scaling";
import { colours } from "../../utils/constants";

const PartsSpent = ({ service, setSnackbar, open }) => {
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

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    getAllParts();
    getPartsUsed();
  }, []);

  const DeletePartsUsed = async () => {
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
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
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
    serviceQuery.equalTo("service_fkey", service);
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
    let PartsUsed = new Parse.Object("PartsUsed");
    PartsUsed.set("service_fkey", service);
    PartsUsed.set("quantity_spent", parseInt(number));
    PartsUsed.set("part_name", valuePU);
    PartsUsed.set("parts_fkey");

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
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      return false;
    }
  };

  const UpdatePartsUsed = async () => {
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
    setUpdateItem(null);
    setValuePU("");
    setVisible(true);
    setNumber("1");
    setDropdownDisabled(false);
    setUpdate(false);
  };

  const tableRows = partsUsed.map((item) => (
    <DataTable.Row key={item.id} onPress={() => prepareUpdate(item)}>
      <DataTable.Cell>{item.get("part_name")}</DataTable.Cell>
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
        title={"Parts Spent"}
        left={(props) => (
          <List.Icon {...props} icon="archive-cog" color="#fca311" />
        )}
        expanded={expanded}
        onPress={handlePress}
      >
        <DataTable style={{ paddingLeft: 0, paddingRight: 0 }}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Quantity</DataTable.Title>
            <DataTable.Title numeric>
              <AntDesign
                style={{ alignSelf: "center" }}
                name="pluscircleo"
                size={24}
                color="green"
                onPress={() => prepareAddNew()}
              />
            </DataTable.Title>
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
              listMode="SCROLLVIEW"
              closeOnBackPressed={true}
              itemSeparator={true}
              searchable={true}
              value={valuePU}
              open={openPU}
              //dropDownContainerStyle={Styles.form_input}
              items={allParts}
              placeholder="Select Part Used"
              onChangeValue={(text) => setValuePU(text)}
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

export default PartsSpent;
