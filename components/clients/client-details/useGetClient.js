import { useState } from "react";
import Parse from "parse/react-native.js";
import clientTransformer from "./clientTransformer";

const useGetClient = () => {
  const [client, setClient] = useState({});
  const [isLoading, setIsLoading] = useState([false]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getClient = async ({ clientId }) => {
    setIsLoading(true);
    setIsLoaded(false);
    let parseClient = new Parse.Query("Clients");
    parseClient.equalTo("objectId", clientId);

    try {
      let queryResult = await parseClient.first();
      setClient(clientTransformer({ client: queryResult }));
    } catch (e) {
      console.log("Something went wrong.", e);
    }

    setIsLoading(false);
    setIsLoaded(true);
  };

  return { client, getClient, isLoading, isLoaded };
};

export default useGetClient;
