import * as React from "react";
import { List, Button } from "react-native-paper";
import { Text, View } from "react-native";

const ServiceStatusHistory = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
      titleStyle={{ color: "#14213D" }}
      title={"Service Status"}
      left={(props) => (
        <List.Icon {...props} icon="list-status" color="#fca311" />
      )}
      expanded={expanded}
      onPress={handlePress}
    >
      <List.Item
        left={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {"Date"}
            </Text>
          </View>
        )}
        right={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {"User"}
            </Text>
          </View>
        )}
        titleStyle={{ alignSelf: "center", fontWeight: "bold" }}
        title="Status"
      />
      <List.Item
        left={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ alignSelf: "center" }}>{"22.10.2022"}</Text>
          </View>
        )}
        right={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ alignSelf: "center" }}>{"Katarina"}</Text>
          </View>
        )}
        titleStyle={{ alignSelf: "center" }}
        title="In progress"
      />
      <List.Item
        left={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ alignSelf: "center" }}>{"20.10.2022"}</Text>
          </View>
        )}
        right={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ alignSelf: "center" }}>{"Josip"}</Text>
          </View>
        )}
        titleStyle={{ alignSelf: "center" }}
        title="Created"
      />
    </List.Accordion>
  );
};

export default ServiceStatusHistory;
