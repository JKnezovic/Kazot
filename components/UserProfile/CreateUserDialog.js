import { Dialog, Portal, Button, TextInput } from "react-native-paper";
import { Colors } from "../../utils/constants";
import { moderateScale } from "../../Scaling";
import { StyleSheet } from "react-native";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Parse from "parse/react-native";

const CreateUserDialog = ({ visible, setVisible, setSnackbar }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([
    { label: "Basic", value: "basic" },
    { label: "Admin", value: "admin" },
  ]);
  const [open, setOpen] = useState(false);

  const onSave = () => {
    doSave();
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setRole("");
    setVisible(false);
  };

  const doSave = async () => {
    const params = {
      username: name,
      password: password,
      email: email,
      role: role,
      surname: surname,
    };
    return await Parse.Cloud.run("registerUser", params)
      .then(async (resultObject) => {
        setSnackbar(true, "Successfully added user!");
        return true;
      })
      .catch((error) => {
        setSnackbar(true, "Oops,something went wrong");
        console.log(error);
        return false;
      });
  };

  return (
    <Dialog
      style={styles.dialog}
      visible={visible}
      onDismiss={() => setVisible(false)}
    >
      <Dialog.Title>{"Create new user"}</Dialog.Title>
      <Dialog.Content>
        <TextInput
          mode="outlined"
          label="Name"
          style={styles.textInput}
          activeUnderlineColor={Colors.ORANGE_WEB}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          mode="outlined"
          label="Surname"
          style={styles.textInput}
          activeUnderlineColor={Colors.ORANGE_WEB}
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />

        <TextInput
          mode="outlined"
          label="Email"
          style={styles.textInput}
          activeUnderlineColor={Colors.ORANGE_WEB}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          mode="outlined"
          label="Password"
          style={styles.textInput}
          activeUnderlineColor={Colors.ORANGE_WEB}
          keyboardType="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <DropDownPicker
          style={{ marginVertical: 10, borderRadius: 5 }}
          value={role}
          open={open}
          items={items}
          placeholder={"Select Role"}
          onChangeValue={(text) => setRole(text)}
          setItems={setItems}
          setValue={setRole}
          setOpen={setOpen}
        ></DropDownPicker>
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
          disabled={name && surname && password && role && email ? false : true}
          onPress={() => onSave()}
        >
          Save
        </Button>
      </Dialog.Actions>
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
});

export default CreateUserDialog;
