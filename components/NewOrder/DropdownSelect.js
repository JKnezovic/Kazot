import { useEffect, useState, Fragment } from "react";
import { View } from "react-native";
import { Menu, Divider, TextInput } from "react-native-paper";
import Styles from "./Styles";
import { moderateScale } from "../../Scaling";

const DropdownSelect = ({
  label,
  value,
  handleChange,
  clients,
  name,
  setOrderState,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectList, setSelectList] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState(value);

  // update value after 250 mili seconds from the last update of 'debouncedTerm'
  useEffect(() => {
    const timer = setTimeout(() => openMenu(debouncedTerm), 200);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  const closeMenu = () => setVisible(false);
  //sta ako je prazan neki od vrijednosti??
  const updateForm = (client) => {
    setVisible(false);
    let object = {
      name: client.get("name"),
      surname: client.get("surname"),
      email: client.get("email"),
      contact: client.get("contact"),
      client: client,
    };
    setOrderState((prevState) => ({ ...prevState, ...object }));
  };

  const handeChange = (text) => {
    handleChange(name, text);
    if (text !== value) setDebouncedTerm(text);
  };

  const openMenu = (text) => {
    if (text.length > 0) {
      var result = clients.filter(
        (x) =>
          x.get("name").toLowerCase().startsWith(text.toLowerCase()) ||
          x.get("surname").toLowerCase().startsWith(text.toLowerCase())
      );
      if (result.length > 0) {
        setSelectList(result);
        setVisible(true);
      } else setVisible(false);
    } else setVisible(false);
  };

  const items = selectList.map((x) => (
    <Fragment key={x.id}>
      <Menu.Item
        onPress={() => updateForm(x)}
        title={x.get("name") + " " + x.get("surname")}
      />
      <Divider bold={true} />
    </Fragment>
  ));
  return (
    <View>
      <Menu
        style={{
          marginTop: 60,
          marginLeft: moderateScale(20),
          width: moderateScale(300),
        }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TextInput
            mode="outlined"
            label={label}
            style={Styles.form_input}
            value={value}
            activeOutlineColor="#fca311"
            onChangeText={(text) => handeChange(text)}
          />
        }
      >
        {items}
      </Menu>
    </View>
  );
};

export default DropdownSelect;
