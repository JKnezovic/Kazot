import DateTimePicker from "@react-native-community/datetimepicker";
import { Portal, Modal } from "react-native-paper";
import { StyleSheet } from "react-native";
import { isSmartPhoneBasedOnRatio } from "../../../Scaling";
import { moderateScale } from "../../../Scaling";
import { colours } from "../../../utils/constants";

export default function IOSDatePicker({ orderState, onChange, open }) {
  const isTablet = !isSmartPhoneBasedOnRatio();

  return (
    <Portal>
      <Modal
        visible={open}
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
          value={orderState.date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
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
});
