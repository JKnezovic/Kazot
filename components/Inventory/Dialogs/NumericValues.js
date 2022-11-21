import { IconButton, TextInput } from "react-native-paper";
import { colours } from "../../../utils/constants";
import { moderateScale } from "../../../Scaling";
import { StyleSheet, View, Text } from "react-native";

const NumericValues = ({
  increment,
  decrement,
  title,
  number,
  setNumber,
  isMSQ,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.center, styles.flexy]}>{title}</Text>
      <View style={[styles.container, styles.flexy]}>
        <IconButton
          style={styles.center}
          icon="minus"
          mode="outlined"
          iconColor={colours.ORANGE_WEB}
          size={20}
          onPress={() => decrement(isMSQ)}
        />
        <TextInput
          style={styles.textInput}
          activeUnderlineColor={colours.ORANGE_WEB}
          keyboardType="number-pad"
          value={number}
          onChangeText={(text) => setNumber(text)}
        />
        <IconButton
          icon="plus"
          style={styles.center}
          mode="outlined"
          iconColor={colours.ORANGE_WEB}
          size={20}
          onPress={() => increment(isMSQ)}
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
    marginBottom: 10,
  },
  textInput: {
    width: moderateScale(58),
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
