import { useState, useEffect } from "react";
import { List, DataTable } from "react-native-paper";
import Parse from "parse/react-native.js";
import statusHistoryTransformer from "./statusHistoryTransformer";

const ServiceStatusHistory = ({ service = {}, open }) => {
  const [expanded, setExpanded] = useState(open);
  const [orderStatuses, setOrderStatuses] = useState([]);

  useEffect(() => {
    getStatusHistory();
  }, [service]);

  const handlePress = () => setExpanded(!expanded);

  const getStatusHistory = async () => {
    const serviceQuery = new Parse.Query("OrderStatusHistory");
    serviceQuery.descending("createdAt");
    const serviceObject = new Parse.Object("Services", {
      id: service.serviceOrderId,
    });
    serviceQuery.equalTo("service_fkey", serviceObject);
    try {
      let ServiceHistory = await serviceQuery.find();
      setOrderStatuses(
        statusHistoryTransformer({ statusHistory: ServiceHistory })
      );
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

  const tableRows = orderStatuses.map((item) => (
    <DataTable.Row key={item.statusHistoryId}>
      <DataTable.Cell>{item.status}</DataTable.Cell>
      <DataTable.Cell>{item.createdAt}</DataTable.Cell>
      <DataTable.Cell>{item.username}</DataTable.Cell>
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
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>User</DataTable.Title>
        </DataTable.Header>
        {tableRows}
      </DataTable>
    </List.Accordion>
  );
};

export default ServiceStatusHistory;
