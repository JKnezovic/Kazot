import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import Styles from "./Styles";
import Parse from "parse/react-native";
import DropDownPicker from "react-native-dropdown-picker";

const OrderForm = ({ orderState, setOrderState, FadeIn }) => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [openST, setOpenST] = useState(false);
  const [valueST, setValueST] = useState(orderState.serviceType);
  const [vehicles, setVehicles] = useState([]);
  const [openVehicle, setOpenVehicle] = useState(false);
  const [valueVehicle, setValueVehicle] = useState(null);

  useEffect(() => {
    FadeIn();
    getServiceTypes();
    if (orderState.client) getVehiclesForClient();
  }, []);

  const getVehiclesForClient = async () => {
    let query = new Parse.Query("Vehicles");

    try {
      query.equalTo("client_fkey", orderState.client);
      let queryResult = await query.find();
      let resultJSON = JSON.parse(JSON.stringify(queryResult));
      setVehicles(resultJSON);
      return true;
    } catch (error) {
      console.log("Error!", error.message);
      return false;
    }
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

  const handleChange = (name, value) => {
    setOrderState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <KeyboardAvoidingView style={{ marginTop: 10 }}>
      <ScrollView>
        <DropDownPicker
          schema={{
            label: "name",
            value: "name",
          }}
          listMode="MODAL"
          //listMode="SCROLLVIEW"
          closeOnBackPressed={true}
          itemSeparator={true}
          open={openST}
          searchable={true}
          value={valueST}
          style={Styles.form_input}
          dropDownContainerStyle={Styles.form_input}
          addCustomItem={true}
          items={serviceTypes}
          placeholder="Select Service Type"
          onChangeValue={(text) => handleChange("serviceType", text)}
          setItems={setServiceTypes}
          setValue={setValueST}
          setOpen={setOpenST}
        ></DropDownPicker>
        {orderState.client ? (
          <DropDownPicker
            schema={{
              label: "serial_number",
              value: "serial_number",
            }}
            listMode="MODAL"
            //listMode="SCROLLVIEW"
            closeOnBackPressed={true}
            itemSeparator={true}
            open={openVehicle}
            searchable={true}
            value={valueVehicle}
            style={Styles.form_input}
            dropDownContainerStyle={Styles.form_input}
            addCustomItem={true}
            items={vehicles}
            placeholder="Select Vehicle"
            onSelectItem={(item) => {
              handleChange("model", item.model);
            }}
            onChangeValue={(text) => handleChange("serialNumber", text)}
            setItems={setVehicles}
            setValue={setValueVehicle}
            setOpen={setOpenVehicle}
          ></DropDownPicker>
        ) : (
          <TextInput
            mode="outlined"
            activeOutlineColor="#fca311"
            onChangeText={(text) => handleChange("serialNumber", text)}
            value={orderState.serialNumber}
            label={"Vehicle S/N"}
            style={Styles.form_input}
            autoCapitalize={"none"}
          />
        )}
        <TextInput
          mode="outlined"
          style={Styles.form_input}
          autoCapitalize={"none"}
          activeOutlineColor="#fca311"
          onChangeText={(text) => handleChange("model", text)}
          value={orderState.model}
          label={"Vehicle Model"}
        />
        <TextInput
          mode="outlined"
          activeOutlineColor="#fca311"
          onChangeText={(text) => handleChange("problem", text)}
          value={orderState.problem}
          label={"Problem"}
          style={Styles.form_input}
          autoCapitalize={"none"}
        />
        <TextInput
          mode="outlined"
          activeOutlineColor="#fca311"
          onChangeText={(text) => handleChange("notes", text)}
          value={orderState.notes}
          label={"Notes"}
          style={Styles.form_input}
          autoCapitalize={"none"}
          multiline
          numberOfLines={4}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OrderForm;
