import { Dialog, Portal, Button, TextInput } from "react-native-paper";
import { Colors } from "../../../utils/constants";
import { moderateScale } from "../../../Scaling";
import { StyleSheet } from "react-native";

const AddNewDialog = ({
  visible,
  setVisible,
  title,
  SaveInventoryItem,
  newItem,
  setNewItem,
}) => {
  const handleChange = (name, value) => {
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Portal>
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label="Name"
            style={styles.textInput}
            activeUnderlineColor={Colors.ORANGE_WEB}
            value={newItem.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            mode="outlined"
            label="stock"
            style={styles.textInput}
            activeUnderlineColor={Colors.ORANGE_WEB}
            keyboardType="number-pad"
            value={newItem.stock}
            onChangeText={(text) => handleChange("stock", text)}
          />

          <TextInput
            mode="outlined"
            label="MSQ"
            style={styles.textInput}
            activeUnderlineColor={Colors.ORANGE_WEB}
            keyboardType="number-pad"
            value={newItem.MSQ}
            onChangeText={(text) => handleChange("MSQ", text)}
          />

          <TextInput
            mode="outlined"
            label="Inventory"
            style={styles.textInput}
            activeUnderlineColor={Colors.ORANGE_WEB}
            keyboardType="number-pad"
            value={newItem.inventoryStock}
            onChangeText={(text) => handleChange("inventoryStock", text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            textColor={Colors.OXFORD_BLUE}
            onPress={() => setVisible(false)}
          >
            Cancel
          </Button>
          <Button
            textColor={Colors.ORANGE_WEB}
            disabled={
              newItem.name &&
              newItem.MSQ &&
              newItem.stock &&
              newItem.inventoryStock
                ? false
                : true
            }
            onPress={() => SaveInventoryItem()}
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
    width: moderateScale(300),
    alignSelf: "center",
  },
  textInput: {
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
  },
});

export default AddNewDialog;
