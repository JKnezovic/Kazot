import * as React from "react";
import { List, Button, DataTable } from "react-native-paper";
import { Linking } from "react-native";
import { moderateScale } from "../../Scaling";
import { useNavigation } from "@react-navigation/native";

const Client = ({ service, open }) => {
  const [expanded, setExpanded] = React.useState(open);
  const navigation = useNavigation();
  const handlePress = () => setExpanded(!expanded);
  const goToCall = async () => {
    await Linking.openURL(`tel://${service?.clientContact}`);
  };
  const goToEmail = async () => {
    if (service?.clientEmail)
      await Linking.openURL(`mailto:${service?.clientEmail}`);
  };
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
      <DataTable style={{ paddingLeft: 0, paddingRight: 0 }}>
        <DataTable.Row>
          <DataTable.Cell>{"Name:"}</DataTable.Cell>
          <DataTable.Cell>
            {service?.clientName || service?.clientSurname
              ? service?.clientName + " " + service?.clientSurname
              : "-"}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row onPress={goToCall}>
          <DataTable.Cell>{"Contact:"}</DataTable.Cell>
          <DataTable.Cell>{service?.clientContact || "-"}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row onPress={goToEmail}>
          <DataTable.Cell>{"Email:"}</DataTable.Cell>
          <DataTable.Cell>{service?.clientEmail || "-"}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
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
          navigation.navigate("Client Details", { clientId: service.clientId })
        }
        disabled={!service.clientId}
      >
        {"View client"}
      </Button>
    </List.Accordion>
  );
};

export default Client;
