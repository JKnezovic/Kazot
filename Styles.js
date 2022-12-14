import { StyleSheet } from "react-native";
import { moderateScale } from "./Scaling";

const Styles = StyleSheet.create({
  form_input: {
    alignSelf: "center",
    width: moderateScale(300),
    height: 44,
    marginBottom: 20,
    backgroundColor: "#EDF0F7",
    borderRadius: 50,
    paddingHorizontal: 20,
  },
});

export default Styles;
