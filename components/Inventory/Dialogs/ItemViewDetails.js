import { Dialog, Button, DataTable } from "react-native-paper";
import { View, Text } from "react-native";
import { colours } from "../../../utils/constants";
import { moderateScale } from "../../../Scaling";
import { StyleSheet } from "react-native";
import DateToDDMMYY from "../../../utils/DateToDDMMYY";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";

const ItemViewDetails = ({
  visible,
  setVisible,
  DeleteInventoryItem,
  item,
}) => {
  const [isDelete, setIsDelete] = useState(false);
  if (!item) return null;

  const doDelete = () => {
    DeleteInventoryItem();
    setIsDelete(false);
    setVisible(false);
  };

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
          item={item.get("name")}
        />
      ) : (
        <>
          <Dialog.Title>Details</Dialog.Title>
          <Dialog.Content>
            <DataTable>
              <DataTable.Row style={styles.row}>
                <DataTable.Cell>{"Name:"}</DataTable.Cell>
                <View style={styles.cell}>
                  <Text numberOfLines={5}>{item?.get("name")}</Text>
                </View>
              </DataTable.Row>
              <DataTable.Row style={styles.row}>
                <DataTable.Cell>{"Stock:"}</DataTable.Cell>
                <View style={styles.cell}>
                  <Text numberOfLines={5}>{item?.get("stock")}</Text>
                </View>
              </DataTable.Row>
              <DataTable.Row style={styles.row}>
                <DataTable.Cell>{"Purchased at:"}</DataTable.Cell>
                <View style={styles.cell}>
                  <Text numberOfLines={5}>
                    {DateToDDMMYY(item?.get("last_purchase"))}
                  </Text>
                </View>
              </DataTable.Row>
              <DataTable.Row style={styles.row}>
                <DataTable.Cell>{"Inventory:"}</DataTable.Cell>
                <View style={styles.cell}>
                  <Text numberOfLines={5}>{item?.get("inventory_stock")}</Text>
                </View>
              </DataTable.Row>
              <DataTable.Row style={styles.row}>
                <DataTable.Cell>{"Last Inventory:"}</DataTable.Cell>
                <View style={styles.cell}>
                  <Text numberOfLines={5}>
                    {DateToDDMMYY(item?.get("last_inventory_check"))}
                  </Text>
                </View>
              </DataTable.Row>
              <DataTable.Row style={styles.row}>
                <DataTable.Cell>{"MSQ:"}</DataTable.Cell>
                <View style={styles.cell}>
                  <Text numberOfLines={5}>{item?.get("MSQ")}</Text>
                </View>
              </DataTable.Row>
            </DataTable>
          </Dialog.Content>

          <Dialog.Actions>
            <Button
              textColor={colours.ANTIQUE_RUBY}
              onPress={() => setIsDelete(true)}
            >
              Delete
            </Button>
            <Button
              textColor={colours.OXFORD_BLUE}
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
  textInput: {
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
  },
  cell: {
    width: "55%",
    marginVertical: 5,
    justifyContent: "center",
  },
  row: {
    paddingHorizontal: 0,
  },
});

export default ItemViewDetails;