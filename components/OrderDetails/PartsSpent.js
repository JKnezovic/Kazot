import * as React from "react";
import { List, Button } from "react-native-paper";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const PartsSpent = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
      titleStyle={{ color: "#14213D" }}
      title={"Parts Spent"}
      left={(props) => (
        <List.Icon {...props} icon="archive-cog" color="#fca311" />
      )}
      expanded={expanded}
      onPress={handlePress}
    >
      <List.Item
        left={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {"Name"}
            </Text>
          </View>
        )}
        right={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <AntDesign
              style={{ alignSelf: "center" }}
              name="pluscircleo"
              size={24}
              color="green"
            />
          </View>
        )}
        titleStyle={{ alignSelf: "center", fontWeight: "bold" }}
        title="Quantity"
      />
      <List.Item
        left={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ alignSelf: "center" }}>{"Kotac"}</Text>
          </View>
        )}
        right={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <List.Icon
              style={{ alignSelf: "center", marginVertical: 0 }}
              icon="pencil"
              color="#fca311"
            />
          </View>
        )}
        titleStyle={{ alignSelf: "center" }}
        title="1"
      />
      <List.Item
        left={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ alignSelf: "center" }}>{"Ledica"}</Text>
          </View>
        )}
        right={() => (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <List.Icon
              style={{ alignSelf: "center", marginVertical: 0 }}
              icon="pencil"
              color="#fca311"
            />
          </View>
        )}
        titleStyle={{ alignSelf: "center" }}
        title="5"
      />
    </List.Accordion>
  );
};

export default PartsSpent;
