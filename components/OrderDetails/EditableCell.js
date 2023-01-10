import { useState } from "react";
import { DataTable, TextInput, Button } from "react-native-paper";
import { Pressable, Text, View } from "react-native";
import Parse from "parse/react-native.js";

const EditableCell = ({
  value,
  title,
  numberOfLines = 1,
  name,
  service,
  setSnackbar,
  getService,
}) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const handlePress = () => {
    setEdit(true);
    setText(value);
  };

  const onSave = () => {
    setEdit(false);
    if (value !== text) {
      if (name === "model" || name === "serial_number") {
        if (service.vehicleId) UpdateVehicle();
        else SaveNewVehicle();
      } else if (name === "issue" || name === "notes") UpdateService();
    }
  };

  const SaveNewVehicle = async () => {
    let Vehicle = new Parse.Object("Vehicles");
    let Service = new Parse.Object("Services");
    Service.set("objectId", service.serviceOrderId);

    Vehicle.set(name, text);
    if (service.clientId)
      Vehicle.set(
        "client_fkey",
        new Parse.Object("Clients", { id: service.clientId })
      );

    try {
      let vehicle = await Vehicle.save();
      Service.set("vehicle_fkey", vehicle);
      var serviceOrder = await Service.save();
      getService();

      return true;
    } catch (error) {
      console.log(error);
      // Error can be caused by lack of Internet connection
      return false;
    }
  };

  try {
  } catch (error) {
    // Error can be caused by lack of Internet connection
    return false;
  }

  const UpdateVehicle = async () => {
    let Vehicle = new Parse.Object("Vehicles");
    Vehicle.set("objectId", service.vehicleId);
    Vehicle.set(name, text);
    try {
      let vehicle = await Vehicle.save();
      setText("");
      getService();
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      return false;
    }
  };

  const UpdateService = async () => {
    let Service = new Parse.Object("Services");
    Service.set("objectId", service.serviceOrderId);
    Service.set(name, text);
    try {
      let services = await Service.save();
      setText("");
      getService();

      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      return false;
    }
  };

  return (
    <DataTable.Row>
      {edit ? (
        <View
          style={{
            width: "100%",
            marginVertical: 8,
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{ flex: 1, backgroundColor: "FFFFFF" }}
            label={title}
            autoFocus={true}
            numberOfLines={numberOfLines}
            value={text}
            multiline={true}
            onChangeText={(text) => setText(text)}
            onEndEditing={() => onSave(name)}
          />
          <Button style={{ alignSelf: "center" }} onPress={() => onSave(name)}>
            Done
          </Button>
        </View>
      ) : (
        <>
          <DataTable.Cell>{title}</DataTable.Cell>
          <Pressable
            onPress={() => handlePress()}
            style={{
              width: "50%",
              marginVertical: 8,
              justifyContent: "center",
            }}
          >
            <Text numberOfLines={numberOfLines}>{value || "-"}</Text>
          </Pressable>
        </>
      )}
    </DataTable.Row>
  );
};

export default EditableCell;
