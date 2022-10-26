import * as React from "react";
import { List, Button } from "react-native-paper";
import { Text } from "react-native";
import { moderateScale } from "../../Scaling";

const VehicleIssue = () => {
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
        title="Coco boco warranty"
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", paddingLeft: 5 }}>
            {"Vehicle S/N:"}
          </Text>
        )}
        title="2135614-4351-35"
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", paddingLeft: 5 }}>
            {"Vehicle Model:"}
          </Text>
        )}
        title="kek koko roko"
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", paddingLeft: 5 }}>
            {"Issue:"}
          </Text>
        )}
        titleNumberOfLines={3}
        title="Problem s baterijom ili punjačem"
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", paddingLeft: 5 }}>
            {"Notes:"}
          </Text>
        )}
        titleNumberOfLines={3}
        title="Ne puni, ne pali"
      />
    </List.Accordion>
  );
};

export default VehicleIssue;
