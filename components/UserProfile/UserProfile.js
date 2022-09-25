import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import Parse from "parse/react-native.js";
import Button from "../Login/Button";

export default function UserProfile(props) {
  const doUserLogOut = async function () {
    return await Parse.User.logOut()
      .then(async () => {
        const currentUser = await Parse.User.currentAsync();
        if (currentUser === null) {
          props.setUser();
        }
      })
      .catch((error) => {
        Alert.alert("Error!", error.message);
        return false;
      });
  };

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to sing out?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => doUserLogOut() },
    ]);
    return true;
  };

  return (
    <View style={styles.container}>
      <Text>UserProfile</Text>
      <Button title={"Sign out"} onPress={() => backAction()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
