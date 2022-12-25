import { Dialog, Portal } from "react-native-paper";
import { moderateScale } from "../../Scaling";
import { StyleSheet } from "react-native";
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
  return (
    <Portal>
      <Dialog
        style={styles.dialog}
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
