import { Dialog, Button } from "react-native-paper";
import { Colors } from "../../utils/constants";
import { useState } from "react";
import { TextInput } from "react-native-paper";

const AddDialog = ({ doSave, setIsAdd }) => {
  const [serviceName, setServiceName] = useState("");
  return (
    <>
      <Dialog.Title>Add new service type</Dialog.Title>
      <Dialog.Content>
        <TextInput
          value={serviceName}
          style={{ backgroundColor: Colors.WHITE }}
          onChangeText={(text) => setServiceName(text)}
          activeUnderlineColor={Colors.ORANGE_WEB}
        ></TextInput>
      </Dialog.Content>
      <Dialog.Actions>
        <Button textColor={Colors.OXFORD_BLUE} onPress={() => setIsAdd(false)}>
          Cancel
        </Button>
        <Button
          textColor={Colors.ANTIQUE_RUBY}
          onPress={() => doSave(serviceName)}
        >
          Save
        </Button>
      </Dialog.Actions>
    </>
  );
};

export default AddDialog;
