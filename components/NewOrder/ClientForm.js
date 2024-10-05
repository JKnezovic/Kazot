import React, { useEffect, useState, useRef } from "react";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import { TextInput } from "react-native-paper";
import Styles from "./Styles";
import DropdownSelect from "./dropdown-select/DropdownSelect";
import Parse from "parse/react-native";
import clientsTransformer from "../clients/clientsTransformer";
import DatePickers from "./Calendars/DatePickers";

const ClientForm = ({ orderState, setOrderState, FadeIn }) => {
  const [open, setOpen] = useState(false);
  const [allClients, setAllClients] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  useEffect(() => {
    FadeIn();
    getClients();
  }, []);

  const handleChange = (name, value) => {
    setOrderState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChange = (event, selectedDate) => {
    setOpen(false);
    setOrderState((prevState) => ({
      ...prevState,
      date: selectedDate,
    }));
  };

  const getClients = async function () {
    const parseQuery = new Parse.Query("Clients");
    parseQuery.limit(999999);
    try {
      let clients = await parseQuery.find();
      setAllClients(clientsTransformer({ clients }));
      return true;
    } catch (error) {
      Alert.alert("Error!", error.message);
      return false;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => setOpenMenu(false)}
      style={{ flex: 1 }}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <DropdownSelect
          reference={null}
          refInput={ref_input2}
          value={orderState.contact}
          label={"Contact Number"}
          handleChange={handleChange}
          clients={allClients}
          inputName={"contact_number"}
          setOrderState={setOrderState}
          keyboardType={"number-pad"}
          setOpenMenu={setOpenMenu}
          isOpenMenu={openMenu}
        />
        <DropdownSelect
          reference={ref_input2}
          refInput={ref_input3}
          value={orderState.name}
          label={"Name"}
          handleChange={handleChange}
          clients={allClients}
          inputName={"first_name"}
          setOrderState={setOrderState}
          setOpenMenu={setOpenMenu}
          isOpenMenu={openMenu}
        />
        <DropdownSelect
          reference={ref_input3}
          refInput={ref_input4}
          value={orderState.surname}
          label={"Surname"}
          handleChange={handleChange}
          clients={allClients}
          inputName={"surname"}
          setOrderState={setOrderState}
          setOpenMenu={setOpenMenu}
          isOpenMenu={openMenu}
        />

        <TextInput
          mode="outlined"
          label="Email"
          activeOutlineColor="#fca311"
          style={Styles.form_input}
          value={orderState.email}
          autoCapitalize={"none"}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType={"email-address"}
          ref={ref_input4}
        />
        <DatePickers
          onChange={onChange}
          open={open}
          setOpen={setOpen}
          orderState={orderState}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ClientForm;
