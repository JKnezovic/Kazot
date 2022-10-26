import * as React from "react";
import { List, Button } from "react-native-paper";
import { Text, View } from "react-native";

const Attachments = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
      titleStyle={{ color: "#14213D" }}
      title={"Attachments"}
      left={(props) => <List.Icon {...props} icon="image" color="#fca311" />}
      expanded={expanded}
      onPress={handlePress}
    >
      <View style={{ flex: 1, backgroundColor: "pink", paddingLeft: 0 }}>
        <Text>{"Photos will go here"}</Text>
      </View>
    </List.Accordion>
  );
};

export default Attachments;
