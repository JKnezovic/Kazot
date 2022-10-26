import { useState } from "react";
import Parse from "parse/react-native.js";

const useDeleteVehicle = () => {
  const [isLoading, setIsLoading] = useState([false]);
  const [isLoaded, setIsLoaded] = useState(false);

  const deleteVehicle = async ({ vehicleId }) => {
    setIsLoading(true);
    setIsLoaded(false);
    let deleteVehicle = new Parse.Object("Vehicles");
    deleteVehicle.set("objectId", vehicleId);
    try {
      await deleteVehicle.destroy();
      setIsLoading(false);
      setIsLoaded(true);
    } catch (e) {
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsLoaded(false);
  };

  return { deleteVehicle, isLoading, isLoaded, reset };
};

export default useDeleteVehicle;
