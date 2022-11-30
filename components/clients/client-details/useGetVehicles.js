import { useState } from "react";
import Parse from "parse/react-native.js";
import vehiclesTransformer from "./vehiclesTransformer";

const useGetVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getVehicles = async ({ clientId }) => {
    setIsLoading(true);
    setIsLoaded(false);
    let parseVehicles = new Parse.Query("Vehicles");
    parseVehicles.equalTo(
      "client_fkey",
      new Parse.Object("Clients", { id: clientId })
    );

    try {
      let queryResult = await parseVehicles.findAll();
      setVehicles(vehiclesTransformer(queryResult));
    } catch (e) {
      console.log("Something went wrong.");
    }

    setIsLoading(false);
    setIsLoaded(true);
  };

  return { vehicles, getVehicles, isLoading, isLoaded };
};

export default useGetVehicles;
