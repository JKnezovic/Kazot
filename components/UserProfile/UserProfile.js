import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Parse from "parse/react-native.js";
import { Avatar, Divider, Snackbar } from "react-native-paper";
import { useEffect, useState } from "react";
import { moderateScale } from "../../Scaling";
import { colours } from "../../utils/constants";
import ActionTile from "./ActionTiles";
import CreateUserDialog from "./CreateUserDialog";
import ServiceTypeDialog from "./ServiceTypeDialog";
import SignOutDialog from "./SignOutDialog";

const UserProfile = ({ setUser }) => {
  const [userItem, setUserItem] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(true);
  const [createUserVisible, setCreateUserVisible] = useState(false);
  const [serviceTypeVisible, setServiceTypeVisible] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const currentUser = await Parse.User.currentAsync();
    let resultJSON = JSON.parse(JSON.stringify(currentUser));
    setUserItem(resultJSON);
    setActivityIndicator(false);
  };

  const setSnackbar = (visible, message) => {
    setSnackbarMessage(message);
    setVisibleSnackbar(visible);
  };

  if (activityIndicator)
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={colours.ORANGE_WEB}
          style={{ alignSelf: "center" }}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Text
          color="white"
          size={moderateScale(120)}
          label={`${userItem?.username[0]}${userItem?.surname[0]}`}
        />
        <Text style={styles.bigName}>
          {userItem?.username + "  " + userItem?.surname}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <View style={{ marginTop: 40 }}>
          {userItem?.role === "admin" && (
            <>
              <ActionTile
                title={"Create New User"}
                icon={"adduser"}
                position={0}
                action={() => setCreateUserVisible(true)}
              />
              <ActionTile
                title={"Manage Service Types"}
                icon={"form"}
                position={1}
                action={() => setServiceTypeVisible(true)}
              />
              <Divider horizontalInset={true} bold={true} />
            </>
          )}
          <ActionTile
            title={"Sign Out"}
            icon={"logout"}
            position={2}
            action={() => setIsSignOut(true)}
          />
        </View>
      </View>

      <CreateUserDialog
        visible={createUserVisible}
        setVisible={setCreateUserVisible}
        setSnackbar={setSnackbar}
      />
      <ServiceTypeDialog
        visible={serviceTypeVisible}
        setVisible={setServiceTypeVisible}
        setSnackbar={setSnackbar}
      />
      <SignOutDialog
        visible={isSignOut}
        setVisible={setIsSignOut}
        setSnackbar={setSnackbar}
        setUser={setUser}
      />
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={1000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  bigName: {
    marginTop: 10,
    fontSize: moderateScale(19),
    fontWeight: "500",
  },
  avatarContainer: {
    width: "100%",
    paddingVertical: "10%",
    alignItems: "center",
  },
  actionContainer: {
    flex: 1,
    backgroundColor: colours.WHITE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
  },
});

export default UserProfile;
