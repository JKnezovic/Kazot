import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Dialog, Button } from "react-native-paper";
import { colours } from "../../utils/constants";
import { moderateScale } from "../../Scaling";

export default function MandatoryInputsDialog({
  orderState,
  setVisibleMandatoryInputs,
  visibleMandatoryInputs,
}) {
  const name =
    orderState?.name === "" ? (
      <Text style={styles.text}>{"\u2B24  Client Name"}</Text>
    ) : null;
  const contact =
    orderState?.contact === "" ? (
      <Text style={styles.text}>{"\u2B24  Client Contact Number"}</Text>
    ) : null;
  const service_type =
    orderState?.service_type === "" ? (
      <Text style={styles.text}>{"\u2B24  Service Type"}</Text>
    ) : null;
  const model =
    orderState?.model === "" ? (
      <Text style={styles.text}>{"\u2B24  Vehicle Model"}</Text>
    ) : null;
  const problem =
    orderState?.problem === "" ? (
      <Text style={styles.text}>{"\u2B24   Problem"}</Text>
    ) : null;

  return (
    <Dialog
      visible={visibleMandatoryInputs}
      onDismiss={() => setVisibleMandatoryInputs(false)}
      style={styles.dialog}
    >
      <Dialog.Title>{"Missing inputs"}</Dialog.Title>
      <Dialog.Content>
        {name}
        {contact}
        {service_type}
        {model}
        {problem}
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          textColor={colours.OXFORD_BLUE}
          onPress={() => setVisibleMandatoryInputs(false)}
        >
          Ok
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#FFFFFF",
    width: moderateScale(300),
    alignSelf: "center",
  },
  text: {
    color: "red",
  },
});
