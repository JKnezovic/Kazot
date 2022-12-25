import { useState } from "react";
import { List, DataTable } from "react-native-paper";
import EditableCell from "./EditableCell";
import DropDownCell from "./DropDownCell";
import { View, Text } from "react-native";
import DateToDDMMYY from "../../utils/DateToDDMMYY";

const VehicleIssue = ({ service, open, getService }) => {
  const [expanded, setExpanded] = useState(open);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
      titleStyle={{ color: "#14213D" }}
      title={"Vehicle and Issue"}
      left={(props) => <List.Icon {...props} icon="scooter" color="#fca311" />}
      expanded={expanded}
      onPress={handlePress}
    >
      <DataTable style={{ paddingLeft: 0, paddingRight: 0 }}>
        <DataTable.Row>
          <DataTable.Cell>{"Date"}</DataTable.Cell>
          <View
            style={{
              width: "50%",
              marginVertical: 8,
              justifyContent: "center",
            }}
          >
            <Text>{DateToDDMMYY(service.serviceDate)}</Text>
          </View>
        </DataTable.Row>

        <DropDownCell
          value={service?.type}
          title={"Service Type:"}
          name={"type"}
          service={service}
          getService={getService}
        />
        <EditableCell
          value={service?.vehicleSerialNumber}
          title={"Vehicle S/N:"}
          name={"serial_number"}
          service={service}
          getService={getService}
        />

        <EditableCell
          value={service?.vehicleModel}
          title={"Vehicle Model:"}
          name={"model"}
          service={service}
          getService={getService}
        />
        <EditableCell
          value={service?.issue}
          title={"Issue:"}
          numberOfLines={5}
          name={"issue"}
          service={service}
          getService={getService}
        />
        <EditableCell
          value={service?.notes}
          title={"Notes:"}
          numberOfLines={5}
          name={"notes"}
          service={service}
          getService={getService}
        />
      </DataTable>
    </List.Accordion>
  );
};

export default VehicleIssue;
