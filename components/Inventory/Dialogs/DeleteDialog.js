import { Dialog, Button } from "react-native-paper";
import { Text } from "react-native";
import { Colors } from "../../../utils/constants";

const DeleteDialog = ({ doDelete, setIsDelete, item }) => {
  return (
    <>
      <Dialog.Title>Delete</Dialog.Title>
      <Dialog.Content>
        <Text>{"Are you sure you want to delete:"}</Text>
        <Text>{item + "?"}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          textColor={Colors.OXFORD_BLUE}
          onPress={() => setIsDelete(false)}
        >
          Cancel
        </Button>
        <Button textColor={Colors.ANTIQUE_RUBY} onPress={() => doDelete()}>
          Confirm
        </Button>
      </Dialog.Actions>
    </>
  );
};

export default DeleteDialog;
