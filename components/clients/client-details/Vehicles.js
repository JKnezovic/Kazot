import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import useGetVehicles from "./useGetVehicles";
import { Divider, Portal, Snackbar } from "react-native-paper";
import { colours } from "../../../utils/constants";
import useDeleteVehicle from "./useDeleteVehicle";
import DeleteVehiclesModal from "./DeleteVehicleModal";

export default function Vehicles({ clientId = {} }) {
  const { vehicles, getVehicles, isLoaded } = useGetVehicles();
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarShown, setSnackbarShown] = useState(false);
  const { deleteVehicle, isLoaded: isDoneDeleting, reset } = useDeleteVehicle();

  //get vehicles on first render
  useEffect(() => {
    getVehicles({ clientId });
  }, []);

  // set the id of vehicle to delete
  const deleteWithId = (vehicleId) => {
    setVehicleIdToDelete(vehicleId);
  };

  // once vehicle to delete is selected, open delete modal
  useEffect(() => {
    if (vehicleIdToDelete) setIsModalOpen(true);
  }, [vehicleIdToDelete]);

  // if modal is closed, set vehicle to delete to null
  useEffect(() => {
    if (!isModalOpen) setVehicleIdToDelete(null);
  }, [isModalOpen]);

  // when done deleting, get all vehicles
  useEffect(() => {
    if (isDoneDeleting) {
      setIsModalOpen(false);
      getVehicles({ clientId });
      reset();
    }
  }, [isDoneDeleting]);

  return (
    <View style={styles.container}>
      <DeleteVehiclesModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        deleteId={vehicleIdToDelete}
        deleteVehicle={deleteVehicle}
      />
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="scooter"
          size={24}
          color={colours.OXFORD_BLUE}
        />
        <Text>Vehicles</Text>
      </View>
      <Divider style={styles.divider} bold />

      {!vehicles.length && isLoaded ? (
        <Text style={styles.noVehicles}>No vehicles found</Text>
      ) : (
        vehicles.map((vehicle, key) => (
          <View key={key} style={[styles.row, styles.item]}>
            <View style={styles.row}>
              {vehicle.get("serial_number") && (
                <Text> S/N: {vehicle.get("serial_number")} |</Text>
              )}
              <Text> Model: {vehicle.get("model")}</Text>
            </View>
            <Pressable onPress={() => deleteWithId(vehicle.id)}>
              <FontAwesome
                name="trash-o"
                size={24}
                color={colours.OXFORD_BLUE}
              />
            </Pressable>
          </View>
        ))
      )}
      <Portal>
        <Snackbar
          visible={snackbarShown}
          onDismiss={() => setSnackbarShown(false)}
          elevation={5}
          action={{
            label: "Dismiss",
            onPress: () => {
              setSnackbarShown(false);
            },
          }}
          wrapperStyle={styles.snackbar}
        >
          Vehicle succesfully deleted.
        </Snackbar>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: colours.WHITE,
    borderRadius: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    backgroundColor: colours.WHITE,
    borderColor: colours.ORANGE_WEB,
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "space-between",
    marginBottom: 5,
    borderRadius: 20,
    padding: 10,
  },
  divider: {
    backgroundColor: colours.OXFORD_BLUE,
    marginVertical: 5,
  },
  snackbar: {
    position: "absolute",
    zIndex: 5,
  },
  noVehicles: {
    alignSelf: "center",
    paddingVertical: 10,
  },
});
