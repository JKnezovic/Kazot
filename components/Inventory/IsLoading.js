import { Portal } from "react-native-paper";
import { colours } from "../../utils/constants";
import { StyleSheet, ActivityIndicator, View } from "react-native";

const IsLoading = ({ loading }) => {
  return (
    <Portal>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color={colours.ORANGE_WEB}
            style={{ alignSelf: "center" }}
          />
        </View>
      ) : null}
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    opacity: 0.6,
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
});

export default IsLoading;
