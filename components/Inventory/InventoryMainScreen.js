import { DataTable, Snackbar } from "react-native-paper";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import IsLoading from "./IsLoading";
import { useNavigation } from "@react-navigation/native";
import FABGroup from "./FABGroup";
import AddNewDialog from "./Dialogs/AddNewDialog";
import UpdateDialog from "./Dialogs/UpdateDialog";
import ItemViewDetails from "./Dialogs/ItemViewDetails";
import Parse from "parse/react-native.js";
import Searchbar from "./Searchbar";
import partsTransformer from "./partsTransformer";
import { AntDesign } from "@expo/vector-icons";
const numberOfItemsPerPageList = [5, 10, 20, "Show All"];
const defaultItem = {
  MSQ: 0,
  stock: 0,
  inventoryStock: 0,
  name: "",
};

const InventoryMainScreen = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const [allParts, setAllParts] = useState([]);
  const [partsFiltered, setPartsFiltered] = useState([]);
  const to = Math.min((page + 1) * numberOfItemsPerPage, allParts.length);
  const [visible, setVisible] = useState(false);
  const [newItem, setNewItem] = useState(defaultItem);
  const [title, setTitle] = useState("temp");
  const navigation = useNavigation();
  const [isPurchase, setIsPurchase] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [activityIndicator, setActivityIndicator] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [sortDirection, setSortDirection] = useState(1);
  const [sortColumn, setSortColumn] = useState("name");
  const [loading, setLoading] = useState(false);

  const onItemsPerPageChange = (num) => {
    if (num === "Show All") setNumberOfItemsPerPage(allParts.length);
    else setNumberOfItemsPerPage(num);
  };

  const getAllParts = async () => {
    setActivityIndicator(true);
    const inventoryQuery = new Parse.Query("Inventory");
    inventoryQuery.ascending("name");
    inventoryQuery.limit(999999);
    try {
      let parts = await inventoryQuery.find();
      setAllParts(partsTransformer({ parts }));
      setActivityIndicator(false);
    } catch (error) {
      console.log("Error!", error.message);
      setActivityIndicator(false);
      setSnackbar(true, "Oops, something went wrong!");
    }
  };

  const DeleteInventoryItem = async () => {
    setLoading(true);
    let Inventory = new Parse.Object("Inventory");
    Inventory.set("objectId", viewItem.partId);

    try {
      await Inventory.destroy();
      //setVisible(true);
      setShowAction(false);
      setSnackbar(true, "Deleted successfully");
      getAllParts();
      setLoading(false);
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      setLoading(false);
      console.log(error);
    }
  };

  const SaveInventoryItem = async () => {
    setLoading(true);
    let Inventory = new Parse.Object("Inventory");
    Inventory.set("stock", parseInt(newItem.stock));
    Inventory.set("MSQ", parseInt(newItem.MSQ));
    Inventory.set("inventory_stock", parseInt(newItem.inventoryStock));
    Inventory.set("name", newItem.name);
    Inventory.set("last_purchase", new Date());
    Inventory.set("last_inventory_check", new Date());

    try {
      let inventory = await Inventory.save();
      setVisible(false);
      setSnackbar(true, "Saved successfully");
      getAllParts();
      setLoading(false);
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      setLoading(false);
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
    setNewItem(defaultItem);
    setTitle("Create new item");
    setVisible(true);
  };

  const prepareDialogUpdate = (isInventory) => {
    if (isInventory) {
      setTitle("Inventory update");
      setIsPurchase(false);
    } else {
      setTitle("Purchase items");
      setIsPurchase(true);
    }
    setUpdateDialogVisible(true);
  };

  const prepareDialogView = (item) => {
    setViewItem(item);
    setViewDialogVisible(true);
  };

  const handleSortColumn = (name) => {
    if (sortColumn === name) setSortDirection(sortDirection * -1);
    else setSortColumn(name);
  };

  const renderSortIcon = (name) => {
    if (sortColumn === name)
      return sortDirection === 1 ? "descending" : "ascending";
    else return null;
  };

  useEffect(() => {
    getAllParts();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  useEffect(() => {
    setPage(0);
  }, [partsFiltered]);

  useEffect(() => {
    setPartsFiltered(allParts);
  }, [allParts]);

  const tableRows = partsFiltered
    .sort((a, b) =>
      a[sortColumn] > b[sortColumn]
        ? 1 * sortDirection
        : b[sortColumn] > a[sortColumn]
        ? -1 * sortDirection
        : 0
    )
    .slice(
      page * numberOfItemsPerPage,
      page * numberOfItemsPerPage + numberOfItemsPerPage
    )
    .map((item) => (
      <DataTable.Row
        onPress={() => prepareDialogView(item)}
        key={item.partId}
        style={
          item.stock <= item.MSQ && {
            backgroundColor: "rgba(255, 0, 0, 0.2);",
          }
        }
      >
        <View style={styles.customCell}>
          <Text numberOfLines={5}>{item.name}</Text>
        </View>
        <DataTable.Cell numeric>{item.inventoryStock}</DataTable.Cell>
        <DataTable.Cell numeric>{item.MSQ}</DataTable.Cell>
        <DataTable.Cell numeric>{item.stock}</DataTable.Cell>
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
      <Searchbar
        orders={partsFiltered}
        initialOrders={allParts}
        setOrders={setPartsFiltered}
      />
      <ScrollView style={{ flex: 1 }}>
        <DataTable style={{ marginBottom: 80 }}>
          <DataTable.Header>
            <Pressable
              style={[styles.customCell, styles.iconContainer]}
              sortDirection={renderSortIcon("name")}
              onPress={() => handleSortColumn("name")}
            >
              <Text>{"Name   "}</Text>
              {renderSortIcon("name") === "descending" ? (
                <AntDesign name="arrowdown" size={15} color="black" />
              ) : renderSortIcon("name") === "ascending" ? (
                <AntDesign name="arrowup" size={15} color="black" />
              ) : null}
            </Pressable>
            <DataTable.Title
              sortDirection={renderSortIcon("inventoryStock")}
              onPress={() => handleSortColumn("inventoryStock")}
              numeric
            >
              Inventory
            </DataTable.Title>

            <DataTable.Title
              sortDirection={renderSortIcon("MSQ")}
              onPress={() => handleSortColumn("MSQ")}
              numeric
            >
              MSQ
            </DataTable.Title>
            <DataTable.Title
              sortDirection={renderSortIcon("stock")}
              onPress={() => handleSortColumn("stock")}
              numeric
            >
              Stock
            </DataTable.Title>
          </DataTable.Header>
          {tableRows}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(
              partsFiltered.length / numberOfItemsPerPage
            )}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${partsFiltered.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </ScrollView>
      <FABGroup
        prepareDialogAddNew={prepareDialogAddNew}
        prepareDialogUpdate={prepareDialogUpdate}
      />
      <AddNewDialog
        visible={visible}
        setVisible={setVisible}
        title={title}
        SaveInventoryItem={SaveInventoryItem}
        newItem={newItem}
        setNewItem={setNewItem}
      />
      <UpdateDialog
        visible={updateDialogVisible}
        setVisible={setUpdateDialogVisible}
        title={title}
        setSnackbar={setSnackbar}
        isPurchase={isPurchase}
        setLoading={setLoading}
        parts={allParts}
        getAllParts={getAllParts}
      />
      <ItemViewDetails
        visible={viewDialogVisible}
        setVisible={setViewDialogVisible}
        DeleteInventoryItem={DeleteInventoryItem}
        item={viewItem}
      />
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
      <IsLoading loading={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    marginRight: 15,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  customCell: {
    width: "40%",
    marginVertical: 8,
    justifyContent: "center",
  },
});

export default InventoryMainScreen;
