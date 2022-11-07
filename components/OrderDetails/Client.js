import * as React from "react";
import { FAB, List, Button } from "react-native-paper";
import { View, Text } from "react-native";
import { moderateScale } from "../../Scaling";
import { useNavigation } from "@react-navigation/native";

const Client = ({ service, open }) => {
  const [expanded, setExpanded] = React.useState(open);
  const navigation = useNavigation();
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
        title={
          service.get("client_fkey").get("name") +
          " " +
          service.get("client_fkey").get("surname")
        }
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", marginLeft: 5 }}>
            {"Contact:"}
          </Text>
        )}
        title={service.get("client_fkey").get("contact")}
      />
      <List.Item
        left={() => (
          <Text style={{ alignSelf: "center", width: "30%", marginLeft: 5 }}>
            {"Email:"}
          </Text>
        )}
        title={service.get("client_fkey").get("email")}
      />

      <Button
        textColor="#14213D"
        mode="elevated"
        style={{
          backgroundColor: "#E5E5E5",
          width: moderateScale(250),
          alignSelf: "center",
          paddingLeft: 0,
          marginVertical: 15,
        }}
        onPress={() =>
          navigation.navigate("Client Details", service.get("client_fkey"))
        }
      >
        {"View client"}
      </Button>
    </List.Accordion>
  );
};

export default Client;
