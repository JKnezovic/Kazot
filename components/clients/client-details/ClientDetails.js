import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Linking } from "react-native";
import { Avatar, FAB, ActivityIndicator, Snackbar } from "react-native-paper";
import { Colors } from "../../../utils/constants";
import { FontAwesome, Feather } from "@expo/vector-icons";
import Vehicles from "./Vehicles";
import ServicesHistory from "./ServicesHistory";
import { moderateScale } from "../../../Scaling";
import { useNavigation } from "@react-navigation/native";
import useGetClient from "./useGetClient";
import useUpdateClient from "./useUpdateClient";
import HeaderRight from "./header-right/HeaderRight";
import useHasWhatsapp from "./useHasWhatsapp";

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

  // open contact
  // will not work on a simulator
  const goToCall = async () => {
    await Linking.openURL(`tel:${client.contact}`);
  };
  const goToEmail = async () => {
    await Linking.openURL(`mailto:${client.email}`);
  };
  const goToSMS = async () => {
    await Linking.openURL(`sms:${client.contact}`);
  };
  const goToWhatsapp = async () => {
    await Linking.openURL(`whatsapp://send?phone=${client.contact}`);
  };

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
          <View style={styles.row}>
            <View>
              <Text style={styles.lightfont}>Mobile </Text>
              {client.email && <Text style={styles.lightfont}>Email </Text>}
            </View>
            <View>
              <Text selectable={true} style={styles.contactText}>
                {client.contact}
              </Text>
              {client.email && (
                <Text selectable={true} style={styles.contactText}>
                  {client.email}
                </Text>
              )}
            </View>
          </View>

          <View style={[styles.row, styles.contact]}>
            <View style={styles.row}>
              <Text onPress={goToCall} style={styles.contactText}>
                <Feather name="phone-call" size={30} color={colors.AMAZON} />
              </Text>
            </View>
            <View style={styles.row}>
              <Text onPress={goToSMS} style={styles.contactText}>
                <Feather name="message-circle" size={30} color={colors.BABY_BLUE} />
              </Text>
            </View>
            {client.email && (
              <View style={styles.row}>
                <Text onPress={goToEmail} style={styles.contactText}>
                  <Feather name="mail" size={30} color={colors.ORANGE_WEB} />
                </Text>
              </View>
            )}
            {hasWhatsapp && (
              <View style={styles.row}>
                <Text onPress={goToWhatsapp} style={styles.contactText}>
                  <FontAwesome name="whatsapp" size={30} color={colors.WHATSAPP_GREEN} />
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
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
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

export default ClientDetails;
