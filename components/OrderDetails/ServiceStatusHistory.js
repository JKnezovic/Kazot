import { useState, useEffect } from "react";
import { List, DataTable } from "react-native-paper";
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

  const tableRows = orderStatuses.map((item) => (
    <DataTable.Row key={item.id}>
      <DataTable.Cell>{item.get("status")}</DataTable.Cell>
      <DataTable.Cell numeric>
        {item.get("createdAt").toLocaleDateString("en-GB")}
      </DataTable.Cell>
      <DataTable.Cell numeric>{item.get("user_name")}</DataTable.Cell>
    </DataTable.Row>
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
      <DataTable style={{ paddingLeft: 0, paddingRight: 0 }}>
        <DataTable.Header>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title numeric>Date</DataTable.Title>
          <DataTable.Title numeric>User</DataTable.Title>
        </DataTable.Header>
        {tableRows}
      </DataTable>
    </List.Accordion>
  );
};

export default ServiceStatusHistory;
