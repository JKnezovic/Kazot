import { ScrollView } from "react-native";
import { Portal, Dialog, DataTable } from "react-native-paper";
import { serviceStatuses } from "../../utils/constants";

export default function ServiceStatusDialog({
  SaveNewStatusHistory,
  setVisible,
  visible,
}) {
  const items = serviceStatuses.map((item, index) => (
    <DataTable.Row key={index}>
      <DataTable.Cell onPress={() => SaveNewStatusHistory(item.value)}>
        {item.label}
      </DataTable.Cell>
    </DataTable.Row>
  ));
  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: "#FFFFFF" }}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <Dialog.Title>Change Order Status</Dialog.Title>
        <Dialog.Content>
          <DataTable>
            <ScrollView>{items}</ScrollView>
          </DataTable>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
