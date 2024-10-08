import { useState, useEffect } from "react";
import { Dialog, Portal } from "react-native-paper";
import { moderateScale } from "../../Scaling";
import { StyleSheet, Platform, Keyboard } from "react-native";
import ServicesDoneDialog from "./ServicesDoneDialog";
import DeleteDialog from "../Inventory/Dialogs/DeleteDialog";

const ServicesDialogWrapper = ({
  visible,
  setVisible,
  serviceDescription,
  SaveNewServiceHistory,
  UpdateServiceHistory,
  deleteServiceHistory,
  setIsDelete,
  isDelete,
}) => {
  const [bottom, setBottom] = useState(0);
  useEffect(() => {
    function onKeyboardChange(e) {
      // Check if the event has the required properties, code breaks on android without this
      const hasCoordinates = e.endCoordinates && e.startCoordinates;
      if (Platform.OS === "ios" && hasCoordinates) {
        if (e.endCoordinates.screenY <= e.startCoordinates.screenY) {
          setBottom(e.endCoordinates.height / 2);
        } else {
          setBottom(0);
        }
      }
    }

    if (Platform.OS === "ios") {
      const subscription = Keyboard.addListener("keyboardWillChangeFrame", onKeyboardChange);
      return () => subscription.remove();
    }

    const subscriptions = [
      Keyboard.addListener("keyboardDidHide", onKeyboardChange),
      Keyboard.addListener("keyboardDidShow", onKeyboardChange),
    ];
    return () => subscriptions.forEach((subscription) => subscription.remove());
  }, []);
  return (
    <Portal>
      <Dialog
        style={[styles.dialog, { bottom }]}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        {isDelete ? (
          <DeleteDialog
            doDelete={deleteServiceHistory}
            setIsDelete={setIsDelete}
            item={serviceDescription}
          />
        ) : (
          <ServicesDoneDialog
            serviceDescription={serviceDescription}
            SaveNewServiceHistory={SaveNewServiceHistory}
            setVisible={setVisible}
            UpdateServiceHistory={UpdateServiceHistory}
            setIsDelete={setIsDelete}
          />
        )}
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#FFFFFF",
    width: moderateScale(330),
    alignSelf: "center",
  },
});

export default ServicesDialogWrapper;
