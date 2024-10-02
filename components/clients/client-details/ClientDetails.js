import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
  Pressable,
} from "react-native";
import { Avatar, FAB, ActivityIndicator, Snackbar } from "react-native-paper";
import { colours } from "../../../utils/constants";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import Vehicles from "./Vehicles";
import ServicesHistory from "./ServicesHistory";
import { moderateScale } from "../../../Scaling";
import { useNavigation } from "@react-navigation/native";
import useGetClient from "./useGetClient";
import useUpdateClient from "./useUpdateClient";

const ClientDetails = ({ id = null }) => {
  const navigation = useNavigation();

  const { client, getClient, setClient, isLoading, isLoaded } = useGetClient();
  const {
    updateClient,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = useUpdateClient({ setClient });
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  useEffect(() => {
    if (isUpdateSuccess || isUpdateError) {
      setIsSnackbarVisible(true);
    }
  }, [isUpdateSuccess, isUpdateError]);

  useEffect(() => {
    if (id) getClient({ clientId: id });
  }, [id]);

  // open contact
  // will not work on a simulator
  const goToCall = async () => {
    await Linking.openURL(`tel:${client.contact}`);
  };
  const goToEmail = async () => {
    await Linking.openURL(`mailto:${client.email}`);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <Pressable
            onPress={() =>
              updateClient({
                clientId: id,
                key: "isFavorite",
                value: !client.isFavorite,
              })
            }
          >
            {client.isFavorite ? (
              <AntDesign name="heart" size={24} color="black" />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            )}
          </Pressable>
          <Pressable
            onPress={() =>
              updateClient({
                clientId: id,
                key: "isFlagged",
                value: !client.isFlagged,
              })
            }
          >
            {client.isFlagged ? (
              <Ionicons name="flag" size={24} color="black" />
            ) : (
              <Ionicons name="flag-outline" size={24} color="black" />
            )}
          </Pressable>
        </View>
      ),
    });
  }, [navigation, client]);

  return isLoading && !isLoaded ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heading}>
          <Avatar.Text
            size={120}
            label={client.initials}
            style={styles.initials}
            labelStyle={styles.label}
            color={colours.WHITE}
          />
          <Text style={[styles.title]}>
            {client.name} {client.surname}
          </Text>

          <View style={[styles.row, styles.contact]}>
            <View style={[styles.row, styles.contactWrap]}>
              <Ionicons name="call" size={20} color={colours.OXFORD_BLUE} />
              <Text onPress={goToCall} style={styles.contactText}>
                {client.contact}
              </Text>
            </View>
            {client.email && (
              <View style={[styles.row, styles.contactWrap]}>
                <MaterialIcons
                  name="email"
                  size={20}
                  color={colours.OXFORD_BLUE}
                />
                <Text onPress={goToEmail} style={styles.contactText}>
                  {client.email}
                </Text>
              </View>
            )}
          </View>
        </View>
        <Vehicles clientId={id} />
        <ServicesHistory clientId={id} />
      </ScrollView>
      <FAB
        icon="plus"
        label={"New Order"}
        mode="elevated"
        color={colours.OXFORD_BLUE}
        style={styles.FAB}
        onPress={() => navigation.navigate("New Order", { client: client })}
      />

      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={() => setIsSnackbarVisible(false)}
        duration={1000}
      >
        Client updated!
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    padding: 10,
    backgroundColor: colours.PLATINUM,
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: colours.WHITE,
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
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  initials: {
    backgroundColor: colours.ORANGE_WEB,
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
  },
  contactText: {
    color: colours.OXFORD_BLUE,
    fontSize: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  FAB: {
    backgroundColor: colours.ORANGE_WEB,
    position: "absolute",
    bottom: "3%",
    right: "3%",
  },
  contactWrap: {
    paddingVertical: moderateScale(8),
  },
  label: {
    fontSize: 50,
  },
});

export default ClientDetails;
