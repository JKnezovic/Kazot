import { StyleSheet } from "react-native";
import { moderateScale } from "../../Scaling";
import { Colors } from "../../utils/constants";

const styles = StyleSheet.create({
  headerRight: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.PLATINUM,
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 5,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
  },
  initials: {
    backgroundColor: Colors.ORANGE_WEB,
    marginVertical: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contact: {
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(8),
  },
  contactText: {
    color: Colors.OXFORD_BLUE,
    fontSize: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  FAB: {
    backgroundColor: Colors.ORANGE_WEB,
    position: "absolute",
    bottom: "3%",
    right: "3%",
  },
  label: {
    fontSize: 50,
  },
  lightfont: {
    color: "gray",
  },
});

export default styles;
