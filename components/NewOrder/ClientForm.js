import React, { useEffect, useState, useRef } from "react";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import { TextInput } from "react-native-paper";
import Styles from "./Styles";
import DropdownSelect from "./DropdownSelect";
import Parse from "parse/react-native";
import { moderateScale } from "../../Scaling";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FAB } from "react-native-paper";
import DateToDDMMYY from "../../utils/DateToDDMMYY";
import clientsTransformer from "../clients/clientsTransformer";

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
          value={orderState.name}
          label={"Name"}
          handleChange={handleChange}
          clients={allClients}
          name={"name"}
          setOrderState={setOrderState}
          setOpenMenu={setOpenMenu}
          isOpenMenu={openMenu}
        />
        <DropdownSelect
          reference={ref_input2}
          refInput={ref_input3}
          value={orderState.surname}
          label={"Surname"}
          handleChange={handleChange}
          clients={allClients}
          name={"surname"}
          setOrderState={setOrderState}
          setOpenMenu={setOpenMenu}
          isOpenMenu={openMenu}
        />
        <DropdownSelect
          reference={ref_input3}
          refInput={ref_input4}
          value={orderState.contact}
          label={"Contact Number"}
          handleChange={handleChange}
          clients={allClients}
          name={"contact"}
          setOrderState={setOrderState}
          keyboardType={"number-pad"}
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
        <FAB
          icon="calendar"
          label={"Selected date: " + DateToDDMMYY(orderState.date)}
          mode="flat"
          color="#14213D"
          style={{
            backgroundColor: "#E5E5E5",
            marginVertical: "4%",
            width: moderateScale(300),
            alignSelf: "center",
          }}
          onPress={() => setOpen(true)}
        />
        {open && (
          <DateTimePicker
            testID="dateTimePicker"
            value={orderState.date}
            mode="date"
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ClientForm;
