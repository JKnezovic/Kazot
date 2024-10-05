import { Dialog, Button, TextInput } from "react-native-paper";
import { Colors } from "../../utils/constants";
import { moderateScale } from "../../Scaling";
import { StyleSheet } from "react-native";
import { useState } from "react";

const ServicesDoneDialog = ({
  serviceDescription,
  SaveNewServiceHistory,
  setVisible,
  UpdateServiceHistory,
  setIsDelete,
}) => {
  const [text, onChangeText] = useState(serviceDescription);

  return (
    <>
      <Dialog.Title>Service description</Dialog.Title>
      <Dialog.Content>
        <TextInput
          mode="outlined"
          activeOutlineColor={Colors.ORANGE_WEB}
          onChangeText={onChangeText}
          value={text}
          style={styles.textInput}
          multiline
          numberOfLines={5}
          autoCorrect={false}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          textColor={Colors.OXFORD_BLUE}
          onPress={() => setVisible(false)}
        >
          Cancel
        </Button>
        {serviceDescription ? (
          <Button
            textColor={Colors.ANTIQUE_RUBY}
            onPress={() => setIsDelete(true)}
          >
            Delete
          </Button>
        ) : null}
        <Button
          textColor={Colors.ORANGE_WEB}
          disabled={text === "" || text === serviceDescription ? true : false}
          onPress={
            serviceDescription === ""
              ? () => SaveNewServiceHistory(text)
              : () => UpdateServiceHistory(text)
          }
        >
          Save
        </Button>
      </Dialog.Actions>
    </>
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

export default ServicesDoneDialog;
