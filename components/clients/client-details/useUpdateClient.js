import { useState } from "react";
import Parse from "parse/react-native.js";
import clientTransformer from "./clientTransformer";

const useUpdateClient = ({ setClient }) => {
  const [isSuccess, setIsSuccess] = useState([false]);
  const [isError, setIsError] = useState(false);

  const updateClient = async ({ clientId, key = "", value }) => {
    setIsSuccess(false);
    setIsError(false);
    let updateQuery = new Parse.Object("Clients");
    updateQuery.set("objectId", clientId);

    try {
      updateQuery.set(key, value);
      let client = await updateQuery.save();
      setClient(clientTransformer({ client }));
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    }
  };

  return { updateClient, isSuccess, isError };
};

export default useUpdateClient;
