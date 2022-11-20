import * as React from "react";
import { FAB } from "react-native-paper";
import { colours } from "../../utils/constants";
import { StyleSheet } from "react-native";

const FABGroup = ({ prepareDialogAddNew, prepareDialogUpdate }) => {
  const [state, setState] = React.useState(false);

  const onStateChange = () => setState(!state);

  return (
    <FAB.Group
      open={state}
      visible
      icon={"plus"}
      color={colours.OXFORD_BLUE}
      fabStyle={styles.FAB}
      style={styles.position}
      size={"medium"}
      actions={[
        {
          icon: "database-plus",
          label: "Add New",
          size: "medium",
          color: colours.OXFORD_BLUE,

          onPress: () => prepareDialogAddNew(),
        },
        {
          icon: "chart-bar-stacked",
          label: "Inventory",
          size: "medium",
          color: colours.OXFORD_BLUE,

          onPress: () => prepareDialogUpdate(true),
        },
        {
          icon: "cart",
          size: "medium",
          color: colours.OXFORD_BLUE,
          label: "Purchase",
          onPress: () => prepareDialogUpdate(false),
        },
      ]}
      onStateChange={onStateChange}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  FAB: {
    backgroundColor: colours.ORANGE_WEB,
  },
});

export default FABGroup;
