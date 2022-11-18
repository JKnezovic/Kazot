import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import useGetVehicles from "./useGetVehicles";
import { Portal, Snackbar, List } from "react-native-paper";
import { colours } from "../../../utils/constants";
import useDeleteVehicle from "./useDeleteVehicle";
import DeleteVehiclesModal from "./DeleteVehicleModal";

export default function Vehicles({ clientId }) {
  const { vehicles, getVehicles, isLoaded } = useGetVehicles();
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarShown, setSnackbarShown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const { deleteVehicle, isLoaded: isDoneDeleting, reset } = useDeleteVehicle();

  const handleExpansion = () => setIsExpanded(!isExpanded);

  //get vehicles on first render
  useEffect(() => {
    reset();
    getVehicles({ clientId });
  }, [clientId]);

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

      <List.Accordion
        style={{ backgroundColor: "rgba(229, 229, 229, 0.4)" }}
        titleStyle={{ color: "#14213D" }}
        title="Vehicles"
        left={(props) => <List.Icon {...props} icon="scooter" />}
        expanded={isExpanded}
        onPress={handleExpansion}
      >
        {!vehicles.length && isLoaded ? (
          <List.Item
            title="No vehicles found"
            titleStyle={{
              textAlign: "center",
            }}
            right={() => <View />}
          />
        ) : (
          vehicles.map((vehicle, key) => (
            <List.Item
              key={key}
              title={`Model: ${vehicle.get("model")}`}
              description={`S/N: ${vehicle.get("serial_number")}`}
              right={(props) => (
                <Pressable onPress={() => deleteWithId(vehicle.id)}>
                  <List.Icon {...props} icon="delete-outline" />
                </Pressable>
              )}
            />
          ))
        )}
      </List.Accordion>

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
    justifyContent: "center",
  },
});
