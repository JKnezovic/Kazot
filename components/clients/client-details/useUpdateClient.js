import { useEffect, useState } from "react";
import Parse from "parse/react-native.js";
import clientTransformer from "./clientTransformer";

const useUpdateClient = ({ setClient }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const updateClient = async ({ clientId, key = "", value }) => {
    let updateQuery = new Parse.Object("Clients");
    updateQuery.set("objectId", clientId);
    reset();

    try {
      updateQuery.set(key, value);
      let client = await updateQuery.save();
      setClient(clientTransformer({ client }));
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setToastMessage("Client updated successfully!");
    } else if (isError) {
      setToastMessage("Client update failed.");
    }
  }, [isSuccess, isError]);

  const reset = () => {
    setIsSuccess(false);
    setIsError(false);
    setToastMessage("");
  };

  return { reset, updateClient, toastMessage, isSuccess, isError };
};

export default useUpdateClient;
