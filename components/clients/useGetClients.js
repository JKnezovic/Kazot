import React, { useState, useEffect } from "react";
import Parse from "parse/react-native.js";

const useGetClients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getClients = async ({ query = "" } = {}) => {
    setIsLoading(true);
    setIsLoaded(false);
    let parseClients = new Parse.Query("Clients");
    parseClients.ascending("name");
    parseClients.limit(999999);
    let queryResult = await parseClients.find();
    setClients(transformClients(queryResult, query));
    setIsLoading(false);
    setIsLoaded(true);
  };

  const transformClients = (clients, query = "") => {
    let transformedClients = clients;
    try {
      if (query.length)
        transformedClients = transformedClients.filter(
          (client) =>
            client.get("name").toLowerCase().includes(query.toLowerCase()) ||
            client.get("surname").toLowerCase().includes(query.toLowerCase())
        );
    } catch (e) {
      console.log("Error has occured");
    }
    return transformedClients;
  };

  return { clients, getClients, isLoading, isLoaded };
};

export default useGetClients;
