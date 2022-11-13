import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import Styles from "./Styles";
import DropdownSelect from "./DropdownSelect";
import Parse from "parse/react-native";
import { moderateScale } from "../../Scaling";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FAB } from "react-native-paper";
import DateToDDMMYY from "../../utils/DateToDDMMYY";

const ClientForm = ({ orderState, setOrderState, FadeIn }) => {
  const [open, setOpen] = useState(false);
  const [allClients, setAllClients] = useState([]);

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
    try {
      let clients = await parseQuery.find();
      setAllClients(clients);
      return true;
    } catch (error) {
      Alert.alert("Error!", error.message);
      return false;
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <DropdownSelect
          value={orderState.name}
          label={"Name"}
          handleChange={handleChange}
          clients={allClients}
          name={"name"}
          setOrderState={setOrderState}
        />
        <DropdownSelect
          value={orderState.surname}
          label={"Surname"}
          handleChange={handleChange}
          clients={allClients}
          name={"surname"}
          setOrderState={setOrderState}
        />
        <TextInput
          mode="outlined"
          label={"Contact Number"}
          activeOutlineColor="#fca311"
          style={Styles.form_input}
          value={orderState.contact}
          onChangeText={(text) => handleChange("contact", text)}
          autoCapitalize={"none"}
          keyboardType={"number-pad"}
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
    </KeyboardAvoidingView>
  );
};

export default ClientForm;
