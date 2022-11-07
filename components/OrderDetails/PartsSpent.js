import { useState, useEffect } from "react";
import { List, Dialog, Portal, Button, TextInput } from "react-native-paper";
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
  const [updateNumber, setUpdateNumber] = useState(null);

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    getAllParts();
    getPartsUsed();
  }, []);

  const DeletePartsUsed = async () => {
    let PartsUsed = new Parse.Object("PartsUsed");
    PartsUsed.set("objectId", updateItem.id);

    try {
      await PartsUsed.destroy();
      updateInventory(updateItem, updateItem.get("quantity_spent"));
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
    console.log(difference);
    let query = new Parse.Query("Inventory");
    // equalTo can be used in any data type
    query.equalTo("name", item.get("part_name"));

    try {
      let queryResult = await query.first();
      console.log(queryResult);

      let updateQuery = new Parse.Object("Inventory");
      updateQuery.set("objectId", queryResult.id);
      updateQuery.set("stock", queryResult.get("stock") + difference);
      let result = await updateQuery.save();
      console.log(result);
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
      updateInventory(partsUsed, -parseInt(number));
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
    PartsUsed.set("objectId", updateItem.id);
    PartsUsed.set("quantity_spent", parseInt(number));
    try {
      let partsUsed = await PartsUsed.save();
      setVisible(false);
      updateInventory(updateItem, updateNumber - parseInt(number));
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
    setUpdateItem(item);
    setValuePU(item.get("part_name"));
    setVisible(true);
    setUpdateNumber(item.get("quantity_spent"));
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

  const listItems = partsUsed.map((item) => (
    <List.Item
      key={item.id}
      left={() => (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ alignSelf: "center" }}>{item.get("part_name")}</Text>
        </View>
      )}
      right={() => (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <AntDesign
            style={{ alignSelf: "center" }}
            name="edit"
            size={24}
            color={colours.ORANGE_WEB}
            onPress={() => prepareUpdate(item)}
          />
        </View>
      )}
      titleStyle={{ alignSelf: "center" }}
      title={item.get("quantity_spent")}
    />
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
        <List.Item
          left={() => (
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                {"Name"}
              </Text>
            </View>
          )}
          right={() => (
            <View style={{ justifyContent: "center", flex: 1 }}>
              <AntDesign
                style={{ alignSelf: "center" }}
                name="pluscircleo"
                size={24}
                color="green"
                onPress={() => prepareAddNew()}
              />
            </View>
          )}
          titleStyle={{ alignSelf: "center", fontWeight: "bold" }}
          title="Quantity"
        />
        {listItems}
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
