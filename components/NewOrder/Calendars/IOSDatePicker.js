import DateTimePicker from "@react-native-community/datetimepicker";
import { Portal, Modal, Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { isSmartPhoneBasedOnRatio } from "../../../Scaling";
import { moderateScale } from "../../../Scaling";
import { colours } from "../../../utils/constants";
import { useState } from "react";

export default function IOSDatePicker({ orderState, onChange, open, setOpen }) {
  const isTablet = !isSmartPhoneBasedOnRatio();
  const [selectedDate, setSelectedDate] = useState(orderState.date);

  const applyFilter = () => {
    // set date to filter by
    // close modal
    onChange(null, selectedDate);
  };

  const setDate = (event, date) => {
    setSelectedDate(date);
  };

  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={() => setOpen(false)}
        contentContainerStyle={styles.modalContainerStyle}
        style={
          isTablet && {
            marginHorizontal: "20%",
          }
        }
      >
        <DateTimePicker
          display="inline"
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          onChange={setDate}
        />
        <View style={styles.footer}>
          <Button
            mode="outlined"
            uppercase
            style={styles.button}
            onPress={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            uppercase
            onPress={applyFilter}
            buttonColor={colours.ORANGE_WEB}
          >
            Apply
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
const styles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: colours.WHITE,
    margin: 20,
    padding: 20,
    borderRadius: moderateScale(20),
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: colours.PLATINUM,
    borderStyle: "solid",
    paddingTop: 10,
  },
  button: {
    marginRight: moderateScale(5),
    borderColor: colours.ORANGE_WEB,
  },
});
