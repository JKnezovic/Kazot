import { Dialog, Button, DataTable } from "react-native-paper";
import { Text } from "react-native";
import { colours } from "../../../utils/constants";

const DeleteDialog = ({ doDelete, setIsDelete, item }) => {
  return (
    <>
      <Dialog.Title>Delete</Dialog.Title>
      <Dialog.Content>
        <Text>{"Are you sure you want to delete product:"}</Text>
        <Text>{item + "?"}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          textColor={colours.OXFORD_BLUE}
          onPress={() => setIsDelete(false)}
        >
          Cancel
        </Button>
        <Button textColor={colours.ANTIQUE_RUBY} onPress={() => doDelete()}>
          Confirm
        </Button>
      </Dialog.Actions>
    </>
  );
};

export default DeleteDialog;
