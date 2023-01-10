import { StyleSheet } from "react-native";
import { moderateScale } from "../../Scaling";

const Styles = StyleSheet.create({
  form_input: {
    alignSelf: "center",
    width: moderateScale(300),
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    color: "rgba(28,27,31,1)",
    fontSize: 16,
    borderColor: "blue",
  },
});

export default Styles;
