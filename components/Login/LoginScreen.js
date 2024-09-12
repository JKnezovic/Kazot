import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { UserLogin } from "./UserLogin";
import { moderateScale } from "../../Scaling";

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View
          style={{
            backgroundColor: "white",
            opacity: 0.6,
            position: "absolute",
            height: "100%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#092240" style={{ alignSelf: "center" }} />
        </View>
      )}
      <View>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={[styles.text, styles.bigText]}>Welcome</Text>
        <Text style={[styles.text, styles.description, { marginBottom: 20 }]}>
          Enter username and password
        </Text>
      </View>
      <UserLogin setIsLoading={setIsLoading} setUser={props.setUser} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fca311",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    justifyContent: "center",
    alignSelf: "center",
    width: moderateScale(150),
    height: moderateScale(150),
  },
  text: {
    color: "black",
    textAlign: "center",
  },
  description: {
    width: "90%",
    alignSelf: "center",
  },
  bigText: {
    fontSize: moderateScale(40, 0.3),
    lineHeight: 84,
    fontWeight: "bold",
  },
});
