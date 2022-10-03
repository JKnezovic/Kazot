import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { moderateScale } from "../../Scaling";

export default function Button({ onPress, title, style, disabled, small }) {
  return (
    <Pressable
      style={[
        disabled ? styles.disabledButton : styles.button,
        small ? styles.smallButton : styles.bigButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={small ? styles.textSmall : styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "black",
  },
  smallButton: {
    width: "60%",
  },
  bigButton: {
    width: moderateScale(300),
  },
  disabledButton: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "gray",
  },
  text: {
    fontSize: 25,
    lineHeight: 30,
    letterSpacing: 0.25,
    color: "white",
  },

  buttonSmall: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#c99a00",
  },
  textSmall: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: "white",
  },
});
