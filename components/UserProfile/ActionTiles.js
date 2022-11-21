import { StyleSheet, Text, View, Pressable } from "react-native";
import { moderateScale } from "../../Scaling";
import { colours } from "../../utils/constants";
import { AntDesign } from "@expo/vector-icons";

const colors = [
  {
    primary: colours.ORANGE_WEB,
    secondary: "#FED086",
  },
  {
    primary: colours.OXFORD_BLUE,
    secondary: "#A3B6E1",
  },
  {
    primary: colours.BLACK,
    secondary: colours.PLATINUM,
  },
];

const ActionTile = ({ icon, title, position, action }) => {
  return (
    <Pressable style={styles.container} onPress={() => action()}>
      <View style={styles.flexy}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors[position].secondary },
          ]}
        >
          <AntDesign name={icon} size={25} color={colors[position].primary} />
        </View>

        <Text style={styles.action}> {title}</Text>
      </View>
      <AntDesign style={styles.icon} name={"right"} size={18} color="gray" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "11%",
    marginVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: 10,
    alignSelf: "flex-start",
    padding: 13,
  },
  action: {
    fontSize: moderateScale(16),
    alignSelf: "center",
    marginLeft: 15,
  },
  flexy: {
    display: "flex",
    flexDirection: "row",
  },
  icon: { marginRight: "10%" },
});

export default ActionTile;
