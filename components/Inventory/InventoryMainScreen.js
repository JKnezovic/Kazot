import { DataTable, Snackbar } from "react-native-paper";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
} from "react-native";
import IsLoading from "./IsLoading";
import ItemViewDetails from "./Dialogs/ItemViewDetails";
import Parse from "parse/react-native.js";
import Searchbar from "./Searchbar";
import partsTransformer from "./partsTransformer";
import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

const InventoryMainScreen = () => {
  const [allParts, setAllParts] = useState([]);
  const [partsFiltered, setPartsFiltered] = useState([]);
  const [viewItem, setViewItem] = useState(null);
  const [activityIndicator, setActivityIndicator] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [sortDirection, setSortDirection] = useState(1);
  const [sortColumn, setSortColumn] = useState("name");
  const [loading, setLoading] = useState(false);

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
      setSnackbar(true, "Deleted successfully");
      getAllParts();
      setLoading(false);
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      setLoading(false);
      console.log(error);
    }
  };

  const updateInventory = async () => {
    setLoading(true);
    let updateQuery = new Parse.Object("Inventory");
    let originalItem = allParts.filter((item) => {
      return item.partId === viewItem.partId;
    });
    updateQuery.set("objectId", viewItem.partId);
    updateQuery.set("stock", parseInt(viewItem.stock));
    updateQuery.set("inventory_stock", parseInt(viewItem.inventoryStock));
    updateQuery.set("MSQ", parseInt(viewItem.MSQ));
    if (originalItem[0].inventoryStock !== viewItem.inventoryStock)
      updateQuery.set("last_inventory_check", new Date());
    try {
      await updateQuery.save();
      setLoading(false);
      setViewDialogVisible(false);
      getAllParts();
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      setLoading(false);
      console.log(error);
    }
  };

  const setSnackbar = (visible, message) => {
    setSnackbarMessage(message);
    setVisibleSnackbar(visible);
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
    setPartsFiltered(allParts);
  }, [allParts]);

  partsFiltered.sort((a, b) =>
    a[sortColumn] > b[sortColumn]
      ? 1 * sortDirection
      : b[sortColumn] > a[sortColumn]
      ? -1 * sortDirection
      : 0
  );

  const renderItem = ({ item }) => (
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
  );

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
      <DataTable>
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
      </DataTable>
      <FlashList
        data={partsFiltered}
        renderItem={renderItem}
        //onRefresh={() => setIsRefreshing(true)}
        //refreshing={isRefreshing}
        estimatedItemSize={75}
      />
      <ItemViewDetails
        visible={viewDialogVisible}
        setVisible={setViewDialogVisible}
        DeleteInventoryItem={DeleteInventoryItem}
        item={viewItem}
        setItem={setViewItem}
        updateInventory={updateInventory}
      />
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
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
