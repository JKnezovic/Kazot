import { Dialog, Button } from "react-native-paper";
import { colours } from "../../utils/constants";
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
          style={{ backgroundColor: colours.WHITE }}
          onChangeText={(text) => setServiceName(text)}
          activeUnderlineColor={colours.ORANGE_WEB}
        ></TextInput>
      </Dialog.Content>
      <Dialog.Actions>
        <Button textColor={colours.OXFORD_BLUE} onPress={() => setIsAdd(false)}>
          Cancel
        </Button>
        <Button
          textColor={colours.ANTIQUE_RUBY}
          onPress={() => doSave(serviceName)}
        >
          Save
        </Button>
      </Dialog.Actions>
    </>
  );
};

export default AddDialog;
