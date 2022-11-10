import {
  DataTable,
  Dialog,
  Portal,
  Button,
  TextInput,
  Snackbar,
} from "react-native-paper";
import { useState, useEffect } from "react";
import Parse from "parse/react-native.js";
import { colours } from "../../utils/constants";
import { moderateScale } from "../../Scaling";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const numberOfItemsPerPageList = [5, 10, 20];

const InventoryMainScreen = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const [allParts, setAllParts] = useState([]);
  const to = Math.min((page + 1) * numberOfItemsPerPage, allParts.length);
  const [visible, setVisible] = useState(false);
  const [MSQ, setMSQ] = useState(0);
  const [stock, setStock] = useState(0);
  const [inventoryStock, setInventoryStock] = useState(0);
  const [title, setTitle] = useState("temp");
  const [name, setName] = useState("temp");
  const navigation = useNavigation();
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);
  const [activityIndicator, setActivityIndicator] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [showAction, setShowAction] = useState(false);

  const getAllParts = async () => {
    const serviceQuery = new Parse.Query("Inventory");
    try {
      let Parts = await serviceQuery.findAll();
      setAllParts(Parts);
      setActivityIndicator(false);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      setActivityIndicator(false);
      setSnackbar(true, "Oops, something went wrong!");

      return false;
    }
  };

  const updateInventory = async () => {
    let Inventory = new Parse.Object("Inventory");
    Inventory.set("objectId", updateItem.objectId);
    Inventory.set("stock", parseInt(stock));
    Inventory.set("MSQ", parseInt(MSQ));
    Inventory.set("inventory_stock", parseInt(inventoryStock));
    if (parseInt(stock) !== updateItem.stock)
      Inventory.set("last_purchase", new Date());
    if (parseInt(inventoryStock) !== updateItem.inventory_stock)
      Inventory.set("last_inventory_check", new Date());

    try {
      let result = await Inventory.save();
      setVisible(false);
      setSnackbar(true, "Updated successfully");
      getAllParts();
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      return false;
    }
  };

  const DeleteInventoryItem = async () => {
    let Inventory = new Parse.Object("Inventory");
    Inventory.set("objectId", updateItem.objectId);

    try {
      await Inventory.destroy();
      setVisible(false);
      setShowAction(false);
      setSnackbar(true, "Deleted successfully");
      getAllParts();
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      return false;
    }
  };

  const SaveInventoryItem = async () => {
    let Inventory = new Parse.Object("Inventory");
    Inventory.set("stock", parseInt(stock));
    Inventory.set("MSQ", parseInt(MSQ));
    Inventory.set("inventory_stock", parseInt(inventoryStock));
    Inventory.set("name", name);
    Inventory.set("last_purchase", new Date());
    Inventory.set("last_inventory_check", new Date());

    try {
      let inventory = await Inventory.save();
      setVisible(false);
      setSnackbar(true, "Saved successfully");
      getAllParts();
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      return false;
    }
  };

  const setSnackbar = (visible, message, deleteItem = false) => {
    setSnackbarMessage(message);
    setVisibleSnackbar(visible);
    if (deleteItem) setShowAction(true);
  };

  const prepareDialogAddNew = () => {
    setIsUpdate(false);
    setMSQ("");
    setStock("");
    setInventoryStock("");
    setTitle("Create new item");
    setName("");
    setVisible(true);
  };

  const prepareDialogUpdate = (item) => {
    setIsUpdate(true);
    setMSQ(item.get("MSQ").toString());
    setStock(item.get("stock").toString());
    setInventoryStock(item.get("inventory_stock").toString());
    setTitle("Update " + item.get("name"));
    setUpdateItem(JSON.parse(JSON.stringify(item)));
    setVisible(true);
  };

  useEffect(() => {
    getAllParts();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          mode="outlined"
          textColor={colours.ORANGE_WEB}
          style={{ borderColor: colours.ORANGE_WEB, marginRight: 5 }}
          onPress={() => prepareDialogAddNew()}
        >
          {"Add new"}
        </Button>
      ),
    });
  }, [navigation]);

  const tableRows = allParts
    .slice(
      page * numberOfItemsPerPage,
      page * numberOfItemsPerPage + numberOfItemsPerPage
    )
    .map((item) => (
      <DataTable.Row
        onPress={() => prepareDialogUpdate(item)}
        key={item.id}
        style={
          item.get("stock") <= item.get("MSQ") && {
            backgroundColor: "rgba(255, 0, 0, 0.2);",
          }
        }
      >
        <DataTable.Cell>{item.get("name")}</DataTable.Cell>
        <DataTable.Cell>
          {item.get("last_inventory_check").toLocaleDateString("en-GB")}
        </DataTable.Cell>
        <DataTable.Cell numeric>{item.get("stock")}</DataTable.Cell>
        <DataTable.Cell numeric>{item.get("MSQ")}</DataTable.Cell>
        <DataTable.Cell numeric>{item.get("inventory_stock")}</DataTable.Cell>
      </DataTable.Row>
    ));

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
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Purchased</DataTable.Title>
          <DataTable.Title numeric>Stock</DataTable.Title>
          <DataTable.Title numeric>MSQ</DataTable.Title>
          <DataTable.Title numeric>Inventory</DataTable.Title>
        </DataTable.Header>
        {tableRows}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(allParts.length / numberOfItemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${allParts.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
      <Portal>
        <Dialog
          style={{
            backgroundColor: "#FFFFFF",
            width: moderateScale(300),
            alignSelf: "center",
          }}
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            {!isUpdate && (
              <TextInput
                mode="outlined"
                label="Name"
                style={{
                  //width: moderateScale(50),
                  marginVertical: 5,
                  backgroundColor: "#FFFFFF",
                }}
                activeUnderlineColor={colours.ORANGE_WEB}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            )}
            <TextInput
              mode="outlined"
              label="stock"
              style={{
                //width: moderateScale(50),
                marginVertical: 5,
                backgroundColor: "#FFFFFF",
              }}
              activeUnderlineColor={colours.ORANGE_WEB}
              keyboardType="number-pad"
              value={stock}
              onChangeText={(text) => setStock(text)}
            />

            <TextInput
              mode="outlined"
              label="MSQ"
              style={{
                //width: moderateScale(50),
                marginVertical: 5,
                backgroundColor: "#FFFFFF",
              }}
              activeUnderlineColor={colours.ORANGE_WEB}
              keyboardType="number-pad"
              value={MSQ}
              onChangeText={(text) => setMSQ(text)}
            />

            <TextInput
              mode="outlined"
              label="Inventory"
              style={{
                //width: moderateScale(300),
                marginVertical: 5,
                backgroundColor: "#FFFFFF",
              }}
              activeUnderlineColor={colours.ORANGE_WEB}
              keyboardType="number-pad"
              value={inventoryStock}
              onChangeText={(text) => setInventoryStock(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor={colours.OXFORD_BLUE}
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>
            {isUpdate ? (
              <>
                <Button
                  textColor={colours.ANTIQUE_RUBY}
                  onPress={() =>
                    setSnackbar(true, "Are you sure you want to delete", true)
                  }
                >
                  Delete
                </Button>
                <Button
                  textColor={colours.ORANGE_WEB}
                  onPress={() => updateInventory()}
                >
                  Update
                </Button>
              </>
            ) : (
              <Button
                textColor={colours.ORANGE_WEB}
                disabled={name && MSQ && stock && inventoryStock ? false : true}
                onPress={() => SaveInventoryItem()}
              >
                Save
              </Button>
            )}
          </Dialog.Actions>
        </Dialog>
        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => setVisibleSnackbar(false)}
          duration={showAction ? 3000 : 1000}
          action={
            showAction && {
              label: "Delete",
              onPress: () => DeleteInventoryItem(),
            }
          }
        >
          {snackbarMessage}
        </Snackbar>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InventoryMainScreen;
