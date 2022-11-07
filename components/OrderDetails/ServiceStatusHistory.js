import { useState, useEffect } from "react";
import { List, Button } from "react-native-paper";
import { Text, View } from "react-native";
import Parse from "parse/react-native.js";

const ServiceStatusHistory = ({ service, open }) => {
  const [expanded, setExpanded] = useState(open);
  const [orderStatuses, setOrderStatuses] = useState([]);

  useEffect(() => {
    getStatusHistory();
  }, []);

  const handlePress = () => setExpanded(!expanded);

  const getStatusHistory = async () => {
    const serviceQuery = new Parse.Query("OrderStatusHistory");
    serviceQuery.descending("createdAt");
    serviceQuery.equalTo("service_fkey", service);
    try {
      let ServiceHistory = await serviceQuery.find();
      setOrderStatuses(ServiceHistory);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

  const listItems = orderStatuses.map((item) => (
    <List.Item
      key={item.id}
      left={() => (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ alignSelf: "center" }}>
            {item.get("createdAt").toLocaleDateString("en-GB")}
          </Text>
        </View>
      )}
      right={() => (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ alignSelf: "center" }}>{item.get("user_name")}</Text>
        </View>
      )}
      titleStyle={{ alignSelf: "center" }}
      title={item.get("status")}
      titleNumberOfLines={2}
    />
  ));

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
      {listItems}
    </List.Accordion>
  );
};

export default ServiceStatusHistory;
