import * as React from "react";
import { FAB, List, Button } from "react-native-paper";
import { View, Text } from "react-native";
import { moderateScale } from "../../Scaling";

const Client = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
      titleStyle={{ color: "#14213D" }}
      title={"Client"}
      left={(props) => (
        <List.Icon {...props} icon="account-circle" color="#fca311" />
      )}
      expanded={expanded}
      onPress={handlePress}
    >
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", marginLeft: 5 }}>
            {"Name:"}
          </Text>
        )}
        title="Matko Slatko"
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", marginLeft: 5 }}>
            {"Contact:"}
          </Text>
        )}
        title="0375612286"
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", marginLeft: 5 }}>
            {"Email:"}
          </Text>
        )}
        title="matkoslatko@gmail.com"
      />

      <Button
        textColor="#14213D"
        mode="elevated"
        style={{
          backgroundColor: "#E5E5E5",
          width: moderateScale(300),
          alignSelf: "center",
          paddingLeft: 0,
          marginVertical: 15,
        }}
        onPress={() => console.log("Hee Hee")}
      >
        {"View client"}
      </Button>
    </List.Accordion>
  );
};

export default Client;
