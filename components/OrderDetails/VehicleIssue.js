import * as React from "react";
import { List } from "react-native-paper";
import { Text } from "react-native";

const VehicleIssue = ({ service }) => {
  const [expanded, setExpanded] = React.useState(false);

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
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", paddingLeft: 5 }}>
            {"Service Type:"}
          </Text>
        )}
        title={service.get("type")}
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", paddingLeft: 5 }}>
            {"Vehicle S/N:"}
          </Text>
        )}
        title={service.get("vehicle_fkey")?.get("serial_number")}
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", paddingLeft: 5 }}>
            {"Vehicle Model:"}
          </Text>
        )}
        title={service.get("vehicle_fkey")?.get("model")}
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", paddingLeft: 5 }}>
            {"Issue:"}
          </Text>
        )}
        titleNumberOfLines={3}
        title={service.get("issue")}
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", paddingLeft: 5 }}>
            {"Notes:"}
          </Text>
        )}
        titleNumberOfLines={3}
        title={service.get("notes")}
      />
    </List.Accordion>
  );
};

export default VehicleIssue;
