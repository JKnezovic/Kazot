import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Pressable, Text } from "react-native";
import Parse from "parse/react-native.js";

const DropDownCell = ({
  value,
  title,
  numberOfLines = 1,
  name,
  service,
  setSnackbar,
  getService,
}) => {
  const [edit, setEdit] = useState(false);
  const [openST, setOpenST] = useState(false);
  const [valueST, setValueST] = useState(service.get("type"));
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    getServiceTypes();
  }, []);

  const handlePress = () => {
    setEdit(true);
  };

  const getServiceTypes = async function () {
    const parseQuery = new Parse.Query("ServiceType");
    try {
      let serviceType = await parseQuery.find();
      var serviceTypeJSON = JSON.parse(JSON.stringify(serviceType));
      setServiceTypes(serviceTypeJSON);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
  };

  const onSave = (text) => {
    setEdit(false);
    setValueST(text);
    UpdateService(text);
  };

  const UpdateService = async (text) => {
    let Service = new Parse.Object("Services");
    Service.set("objectId", service.id);
    Service.set(name, text);
    try {
      let services = await Service.save();
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
        <DropDownPicker
          schema={{
            label: "name",
            value: "name",
          }}
          listMode="MODAL"
          closeOnBackPressed={true}
          itemSeparator={true}
          open={openST}
          value={valueST}
          items={serviceTypes}
          placeholder={service?.type}
          onChangeValue={(text) => onSave(text)}
          setItems={setServiceTypes}
          setValue={setValueST}
          setOpen={setOpenST}
        ></DropDownPicker>
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
            <Text numberOfLines={numberOfLines}>{value}</Text>
          </Pressable>
        </>
      )}
    </DataTable.Row>
  );
};

export default DropDownCell;
