import { Dialog, Portal, Button, DataTable } from "react-native-paper";
import { colours } from "../../../utils/constants";
import { moderateScale } from "../../../Scaling";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import Parse from "parse/react-native.js";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
import NumericValues from "./NumericValues";

const UpdateDialog = ({
  visible,
  setVisible,
  title,
  setSnackbar,
  isPurchase,
}) => {
  const [allParts, setAllParts] = useState([]);
  const [valuePU, setValuePU] = useState("");
  const [openPU, setOpenPU] = useState(false);
  const [number, setNumber] = useState("0");
  const [MSQ, setMSQ] = useState("0");
  const [item, setItem] = useState("");
  const [array, setArray] = useState([]);

  useEffect(() => {
    getAllParts();
  }, []);

  const addToArray = () => {
    setArray([
      ...array,
      {
        name: valuePU,
        amount: parseInt(number),
        product: item,
        MSQ: parseInt(MSQ),
      },
    ]);
    setNumber("0");
    setValuePU("");
    setMSQ("0");
    setItem(null);
  };

  const cleanOnCancel = () => {
    setArray([]);
    setNumber("0");
    setValuePU("");
    setMSQ("0");
    setItem(null);
    setVisible(false);
  };

  const removeItem = (id) => {
    setArray(array.filter((x) => x.product.objectId != id));
  };

  const handleSelect = (x) => {
    setItem(x);
    if (!isPurchase) {
      setMSQ(x.MSQ.toString());
      setNumber(x.inventory_stock.toString());
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

  const updateInventory = async () => {
    array.map(async (x) => {
      let updateQuery = new Parse.Object("Inventory");
      updateQuery.set("objectId", x.product.objectId);
      if (isPurchase) {
        updateQuery.set("stock", parseInt(x.product.stock) + x.amount);
        updateQuery.set("last_purchase", new Date());
      } else {
        updateQuery.set("inventory_stock", x.amount);
        updateQuery.set("MSQ", x.MSQ);
        updateQuery.set("last_inventory_check", new Date());
      }
      try {
        let result = await updateQuery.save();
        cleanOnCancel();
        return true;
      } catch (error) {
        setSnackbar(true, "Oops, something went wrong");
        console.log(error);
        return false;
      }
    });
  };

  const increment = (isMSQ) => {
    if (isMSQ) {
      let value = parseInt(MSQ) + 1;
      setMSQ(value.toString());
    } else {
      let value = parseInt(number) + 1;
      setNumber(value.toString());
    }
  };

  const decrement = (isMSQ) => {
    if (isMSQ) {
      let value = parseInt(MSQ) - 1;
      setMSQ(value.toString());
    } else {
      let value = parseInt(number) - 1;
      setNumber(value.toString());
    }
  };

  const tableRows = array.map((x) => (
    <DataTable.Row key={x.product.objectId}>
      <View style={styles.customCell}>
        <Text numberOfLines={5}>{x.name}</Text>
      </View>
      <DataTable.Cell numeric>{x.amount}</DataTable.Cell>
      {!isPurchase && <DataTable.Cell numeric>{x.MSQ}</DataTable.Cell>}
      <DataTable.Cell numeric>
        <AntDesign
          style={{ alignSelf: "center" }}
          name="close"
          size={24}
          color={colours.ANTIQUE_RUBY}
          onPress={() => removeItem(x.product.objectId)}
        />
      </DataTable.Cell>
    </DataTable.Row>
  ));

  return (
    <Portal>
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={() => cleanOnCancel()}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <DropDownPicker
            schema={{
              label: "name",
              value: "name",
            }}
            listMode="MODAL"
            closeOnBackPressed={true}
            itemSeparator={true}
            searchable={true}
            value={valuePU}
            open={openPU}
            items={allParts}
            placeholder="Select product"
            onChangeValue={(text) => setValuePU(text)}
            onSelectItem={(x) => {
              handleSelect(x);
            }}
            setItems={setAllParts}
            setValue={setValuePU}
            setOpen={setOpenPU}
          ></DropDownPicker>
          <View style={{ marginVertical: 10 }}>
            <NumericValues
              title={isPurchase ? "Purchase Amount:" : "Inventory Count:"}
              number={number}
              setNumber={setNumber}
              increment={increment}
              decrement={decrement}
              isMSQ={false}
            />
            {!isPurchase && (
              <NumericValues
                title={"MSQ:"}
                number={MSQ}
                setNumber={setMSQ}
                increment={increment}
                decrement={decrement}
                isMSQ={true}
              />
            )}
          </View>
          <Button
            mode="elevated"
            textColor="grey"
            buttonColor={colours.WHITE}
            onPress={() => addToArray()}
          >
            {"Add entry  "}
            <AntDesign name="down" size={14} />
          </Button>
          <ScrollView style={{ height: "40%" }}>
            <DataTable style={{ marginVertical: 20 }}>
              <DataTable.Header>
                <View style={styles.customCell}>
                  <Text>Name</Text>
                </View>
                <DataTable.Title numeric>QNTY</DataTable.Title>
                {!isPurchase && <DataTable.Title numeric>MSQ</DataTable.Title>}
                <DataTable.Title numeric></DataTable.Title>
              </DataTable.Header>
              {tableRows}
            </DataTable>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            textColor={colours.OXFORD_BLUE}
            onPress={() => cleanOnCancel()}
          >
            Cancel
          </Button>
          <Button
            textColor={colours.ORANGE_WEB}
            disabled={array.length ? false : true}
            onPress={() => updateInventory()}
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
    width: "50%",
    marginVertical: 8,
    justifyContent: "center",
  },
});

export default UpdateDialog;
