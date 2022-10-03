import React, { useState } from "react";
import { Alert, TextInput, KeyboardAvoidingView } from "react-native";
import Parse from "parse/react-native";
import Styles from "../../Styles";
import Button from "./Button";

export const UserLogin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doUserLogin = async function () {
    props.setIsLoading(true);
    const usernameValue = username;
    const passwordValue = password;
    return await Parse.User.logIn(usernameValue, passwordValue)
      .then(() => {
        props.setUser();
        return true;
      })
      .catch((error) => {
        console.log("ERROR:", error.code);
        if (error.message.includes("Unable to connect"))
          Alert.alert(
            "Error!",
            "Someting went wrong, check your internet connection."
          );
        else Alert.alert("Error!", error.message);
        props.setIsLoading(false);
        return false;
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={Styles.form}>
      <TextInput
        style={Styles.form_input}
        value={username}
        placeholder={"Username"}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize={"none"}
        keyboardType={"email-address"}
      />
      <TextInput
        style={Styles.form_input}
        value={password}
        placeholder={"Password"}
        secureTextEntry
        autoCapitalize={"none"}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title={"Sign in"} onPress={() => doUserLogin()} />
    </KeyboardAvoidingView>
  );
};
