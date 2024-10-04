import { Dialog, Button, DataTable } from "react-native-paper";
import { View, Text } from "react-native";
import { Colors } from "../../../utils/constants";
import { moderateScale } from "../../../Scaling";
import { StyleSheet } from "react-native";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import NumericValues from "./NumericValues";

const inventoryItemProps = [
  { label: "Stock:", key: "stock" },
  { label: "Inventory:", key: "inventoryStock" },
  { label: "MSQ:", key: "MSQ" },
];

const ItemViewDetails = ({
  visible,
  setVisible,
  DeleteInventoryItem,
  item,
  setItem,
  updateInventory,
}) => {
  const [isDelete, setIsDelete] = useState(false);
  if (!item) return null;

  const doDelete = () => {
    DeleteInventoryItem();
    setIsDelete(false);
    setVisible(false);
  };

  const increment = (name, value) => {
    let number = parseInt(value) + 1;
    setItem({ ...item, [name]: number.toString() });
  };

  const decrement = (name, value) => {
    let number = parseInt(value) - 1;
    setItem({ ...item, [name]: number.toString() });
  };

  const dialogItems = inventoryItemProps.map((inventoryItemProp, key) => (
    <View style={styles.flexy} key={key}>
      <Text style={styles.label}>{inventoryItemProp.label}</Text>
      <NumericValues
        item={item}
        setValue={setItem}
        increment={increment}
        decrement={decrement}
        itemKey={inventoryItemProp.key}
      />
    </View>
  ));

  return (
    <Dialog
      style={styles.dialog}
      visible={visible}
      onDismiss={() => setVisible(false)}
    >
      {isDelete ? (
        <DeleteDialog
          doDelete={doDelete}
          setIsDelete={setIsDelete}
          item={item.name}
        />
      ) : (
        <>
          <Dialog.Title style={{ fontSize: 20 }}>{item?.name}</Dialog.Title>
          <Dialog.Content>
            {dialogItems}
            <View style={styles.flexy}>
              <Text style={styles.label}>{"Last Inventory:"}</Text>
              <Text style={{ marginVertical: 15 }}>
                {item?.lastInventoryCheck}
              </Text>
            </View>
          </Dialog.Content>

          <Dialog.Actions justifyContent>
            <Button
              contentStyle={{
                marginRight: "45%",
              }}
              textColor={Colors.ANTIQUE_RUBY}
              onPress={() => setIsDelete(true)}
            >
              Delete
            </Button>
            <Button
              textColor={Colors.ORANGE_WEB}
              onPress={() => updateInventory()}
            >
              Save
            </Button>
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
    width: moderateScale(300),
    alignSelf: "center",
  },
  cell: {
    width: "55%",
    justifyContent: "center",
  },
  row: {
    paddingHorizontal: 0,
  },
  flexy: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderBottomColor: "#ebebeb",
    borderBottomWidth: 1,
  },
  label: { width: "45%", alignSelf: "center" },
});

export default ItemViewDetails;
