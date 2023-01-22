import { useEffect, useState } from "react";
import { Pressable, View, Text, Keyboard, StyleSheet } from "react-native";
import { Divider, TextInput } from "react-native-paper";
import Styles from "./Styles";
import { moderateScale } from "../../Scaling";
import { FlashList } from "@shopify/flash-list";

const DropdownSelect = ({
  label,
  value,
  handleChange,
  clients,
  name,
  setOrderState,
  keyboardType,
  refInput,
  reference,
  isOpenMenu,
  setOpenMenu,
}) => {
  const [visible, setVisible] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState(value);

  // update value after 250 mili seconds from the last update of 'debouncedTerm'
  useEffect(() => {
    const timer = setTimeout(() => openMenu(debouncedTerm), 200);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  useEffect(() => {
    if (!isOpenMenu) setVisible(false);
  }, [isOpenMenu]);

  const closeMenu = () => setVisible(false);
  //sta ako je prazan neki od vrijednosti??
  const updateForm = (client) => {
    Keyboard.dismiss();
    setVisible(false);
    let object = {
      name: client.name,
      surname: client.surname,
      email: client.email,
      contact: client.contact,
    };
    setOrderState((prevState) => ({ ...prevState, ...object }));
  };

  const handeChange = (text) => {
    handleChange(name, text);
    if (text !== value) setDebouncedTerm(text);
  };

  const openMenu = (text) => {
    if (text.length >= 3) {
      var result = [];
      switch (name) {
        case "name":
          result = clients.filter((x) =>
            `${x.name.toLowerCase()} ${x.surname.toLowerCase()}`
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .startsWith(
                text
                  .normalize("NFD")
                  .replace(/\p{Diacritic}/gu, "")
                  .toLowerCase()
              )
          );
          break;
        case "surname":
          result = clients.filter((x) =>
            `${x.surname.toLowerCase()} ${x.name.toLowerCase()}`
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .startsWith(
                text
                  .normalize("NFD")
                  .replace(/\p{Diacritic}/gu, "")
                  .toLowerCase()
              )
          );
          break;
        case "contact":
          result = clients.filter((x) =>
            `${x.contact.toLowerCase()}`.includes(text.toLowerCase())
          );
          break;
      }

      if (result.length > 0) {
        switch (name) {
          case "surname":
            result.sort((a, b) =>
              a.surname + a.name > b.surname + b.name
                ? 1
                : b.surname + b.name > a.surname + a.name
                ? -1
                : 0
            );
            break;
          default:
            result.sort((a, b) =>
              a.name + a.surname > b.name + b.surname
                ? 1
                : b.name + b.surname > a.name + a.surname
                ? -1
                : 0
            );
            break;
        }
        setFilterList(result);
        setVisible(true);
        setOpenMenu(true);
      } else setVisible(false);
    } else setVisible(false);
  };

  const onSubmitEditing = () => {
    refInput.current.focus();
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => updateForm(item)}
      style={{ justifyContent: "center", height: 40 }}
    >
      <Text style={{ marginLeft: 15 }}>
        {name === "name"
          ? item.name + " " + item.surname + "   " + item.contact
          : name === "surname"
          ? item.surname + " " + item.name + "   " + item.contact
          : item.contact + "  " + item.name + " " + item.surname}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={{
        width: moderateScale(300),
        alignSelf: "center",
      }}
    >
      <TextInput
        mode="outlined"
        label={label}
        style={Styles.form_input}
        value={value}
        activeOutlineColor="#fca311"
        onChangeText={(text) =>
          handeChange(
            keyboardType === "number-pad" ? text.replace(/\D/g, "") : text
          )
        }
        keyboardType={keyboardType}
        ref={reference}
        onSubmitEditing={() => onSubmitEditing()}
        onBlur={() => setVisible(false)}
      />
      {visible ? (
        <View style={styles.container}>
          <FlashList
            data={filterList}
            renderItem={renderItem}
            estimatedItemSize={40}
            ItemSeparatorComponent={() => <Divider bold={true} />}
            keyboardShouldPersistTaps={"handled"}
            nestedScrollEnabled={true}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    flexGrow: 1,
    backgroundColor: "white",
    marginTop: -18,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "gray",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default DropdownSelect;
