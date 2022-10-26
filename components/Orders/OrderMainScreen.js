import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";

export default function OrderMainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FAB
        icon="plus"
        customSize={80}
        style={styles.fab}
        onPress={() => navigation.navigate("NewOrder")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
    backgroundColor: "#fca311",
  },
});
