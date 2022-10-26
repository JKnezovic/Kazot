import * as React from "react";
import { List, Button } from "react-native-paper";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ServicesDone = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
      titleStyle={{ color: "#14213D" }}
      title={"Services Done"}
      left={(props) => <List.Icon {...props} icon="wrench" color="#fca311" />}
      expanded={expanded}
      onPress={handlePress}
    >
      <List.Item
        right={() => (
          <View style={{ justifyContent: "center", paddingHorizontal: 10 }}>
            <AntDesign
              style={{ alignSelf: "center" }}
              name="pluscircleo"
              size={24}
              color="green"
            />
          </View>
        )}
        titleStyle={{ fontWeight: "bold", paddingHorizontal: 10 }}
        title="Services"
      />
      <List.Item
        right={() => (
          <View style={{ justifyContent: "center" }}>
            <List.Icon
              style={{ alignSelf: "center", paddingHorizontal: 10 }}
              icon="trash-can-outline"
              color="red"
            />
          </View>
        )}
        description={() => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "grey" }}>{"22.10.2022"}</Text>
            <Text style={{ color: "gray" }}>{"Katarina"}</Text>
          </View>
        )}
        titleStyle={{ paddingHorizontal: 10 }}
        descriptionStyle={{ paddingHorizontal: 10 }}
        title="Prominjena guma, narucen novi prozor"
        titleNumberOfLines={3}
      />
      <List.Item
        right={() => (
          <View style={{ justifyContent: "center" }}>
            <List.Icon
              style={{ alignSelf: "center", paddingHorizontal: 10 }}
              icon="trash-can-outline"
              color="red"
            />
          </View>
        )}
        description={() => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "gray" }}>{"20.10.2022"}</Text>
            <Text style={{ color: "gray" }}>{"Josip"}</Text>
          </View>
        )}
        titleStyle={{ paddingHorizontal: 10 }}
        descriptionStyle={{ paddingHorizontal: 10 }}
        title="Triba prominit gubu i nabavit zrcalo"
        titleNumberOfLines={5}
      />
    </List.Accordion>
  );
};

export default ServicesDone;
