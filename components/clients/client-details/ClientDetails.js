import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Avatar, FAB, ActivityIndicator, Snackbar } from "react-native-paper";
import { Colors } from "../../../utils/constants";
import Vehicles from "./Vehicles";
import ServicesHistory from "./ServicesHistory";
import { moderateScale } from "../../../Scaling";
import { useNavigation } from "@react-navigation/native";
import useGetClient from "./useGetClient";
import useUpdateClient from "./useUpdateClient";
import HeaderRight from "./header-right/HeaderRight";
import useHasWhatsapp from "./useHasWhatsapp";
import ContactLables from "./ContactLables";
import ContactIcons from "./contact-icons/ContactIcons";

const ClientDetails = ({ id = null }) => {
  const navigation = useNavigation();

  const { client, getClient, setClient, isLoading, isLoaded } = useGetClient();
  const {
    toastMessage,
    updateClient,
    reset: resetUpdateClient,
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

  const hasWhatsapp = useHasWhatsapp(client?.contact);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight
          clientId={id}
          isFavorite={client.isFavorite}
          isFlagged={client.isFlagged}
          updateClient={updateClient}
        />
      ),
    });
  }, [navigation, client]);

  const dismissSnackbar = () => {
    setIsSnackbarVisible(false);
    resetUpdateClient();
  };

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
            color={Colors.WHITE}
          />
          <Text style={[styles.title]}>
            {client.name} {client.surname}
          </Text>
          <ContactLables client={client} />
          <ContactIcons hasWhatsapp={hasWhatsapp} client={client} />
        </View>
        <Vehicles clientId={id} />
        <ServicesHistory clientId={id} />
      </ScrollView>
      <FAB
        icon="plus"
        label={"New Order"}
        mode="elevated"
        color={Colors.OXFORD_BLUE}
        style={styles.FAB}
        onPress={() => navigation.navigate("New Order", { client: client })}
      />

      <Snackbar visible={isSnackbarVisible} onDismiss={dismissSnackbar} duration={1000}>
        {toastMessage}
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
  FAB: {
    backgroundColor: Colors.ORANGE_WEB,
    position: "absolute",
    bottom: "3%",
    right: "3%",
  },
  label: {
    fontSize: 50,
  },
});

export default ClientDetails;
