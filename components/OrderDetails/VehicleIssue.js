import * as React from "react";
import { List, DataTable } from "react-native-paper";
import { Text, View } from "react-native";

const VehicleIssue = ({ service, open }) => {
  const [expanded, setExpanded] = React.useState(open);

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
          <DataTable.Cell>{"Service Type:"}</DataTable.Cell>
          <DataTable.Cell>{service.get("type")}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{"Vehicle S/N:"}</DataTable.Cell>
          <DataTable.Cell>
            {service.get("vehicle_fkey")?.get("serial_number")}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{"Vehicle Model:"}</DataTable.Cell>
          <DataTable.Cell>
            {service.get("vehicle_fkey")?.get("model")}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{"Issue:"}</DataTable.Cell>
          <View
            style={{
              width: "50%",
              marginVertical: 8,
              justifyContent: "center",
            }}
          >
            <Text numberOfLines={10}>{service.get("issue")}</Text>
          </View>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{"Notes:"}</DataTable.Cell>
          <View
            style={{
              width: "50%",
              marginVertical: 8,
              justifyContent: "center",
            }}
          >
            <Text numberOfLines={10}>{service.get("notes")}</Text>
          </View>
        </DataTable.Row>
      </DataTable>
    </List.Accordion>
  );
};

export default VehicleIssue;
