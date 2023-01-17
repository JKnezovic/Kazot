import { IconButton, TextInput } from "react-native-paper";
import { colours } from "../../../utils/constants";
import { StyleSheet, View } from "react-native";

const NumericValues = ({ increment, decrement, item, setValue, itemKey }) => {
  const handleOnChange = (text) => {
    setValue({ ...item, [itemKey]: text });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.flexy]}>
        <IconButton
          style={styles.center}
          icon="minus"
          mode="outlined"
          iconColor={colours.ORANGE_WEB}
          size={20}
          onPress={() => decrement(itemKey, item[itemKey])}
        />
        <TextInput
          style={styles.textInput}
          activeUnderlineColor={colours.ORANGE_WEB}
          keyboardType="number-pad"
          value={item[itemKey].toString()}
          onChangeText={(text) => handleOnChange(text)}
        />
        <IconButton
          icon="plus"
          style={styles.center}
          mode="outlined"
          iconColor={colours.ORANGE_WEB}
          size={20}
          onPress={() => increment(itemKey, item[itemKey])}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 3,
  },
  textInput: {
    width: 60,
    backgroundColor: "#FFFFFF",
  },
  center: {
    alignSelf: "center",
  },
  flexy: {
    flex: 1,
  },
});

export default NumericValues;
