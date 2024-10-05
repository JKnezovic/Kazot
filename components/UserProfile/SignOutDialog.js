import { Dialog, Button } from "react-native-paper";
import { Colors } from "../../utils/constants";
import Parse from "parse/react-native.js";
import { Text } from "react-native";

const SignOutDialog = ({ visible, setVisible, setSnackBar, setUser }) => {
  const doUserLogOut = async function () {
    return await Parse.User.logOut()
      .then(async () => {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser === null) {
          setUser();
        }
      })
      .catch((error) => {
        setSnackBar(true, "Oops, something went wrong!");
        return false;
      });
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={() => setVisible(false)}
      style={{ backgroundColor: Colors.WHITE }}
    >
      <Dialog.Title>Hold on!</Dialog.Title>
      <Dialog.Content>
        <Text>Are you sure you want to sign out?</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          textColor={Colors.OXFORD_BLUE}
          onPress={() => setVisible(false)}
        >
          Cancel
        </Button>
        <Button textColor={Colors.ORANGE_WEB} onPress={() => doUserLogOut()}>
          Yes
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default SignOutDialog;
