import { useState } from "react";
import Parse from "parse/react-native.js";

const useGetServicesForClient = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getServices = async ({ clientId }) => {
    setIsLoading(true);
    setIsLoaded(false);
    let parseServices = new Parse.Query("Services");
    parseServices.equalTo(
      "client_fkey",
      new Parse.Object("Clients", { id: clientId })
    );
    let queryResult = await parseServices.findAll();
    setServices(queryResult);
    setIsLoading(false);
    setIsLoaded(true);
  };

  const reset = () => {
    setServices([]);
    setIsLoading(false);
    setIsLoaded(false);
  };

  return { services, getServices, isLoading, isLoaded, reset };
};

export default useGetServicesForClient;
