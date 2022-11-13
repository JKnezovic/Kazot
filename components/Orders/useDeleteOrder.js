import { useState } from "react";
import Parse from "parse/react-native.js";

const useDeleteOrder = () => {
  const [isLoading, setIsLoading] = useState([false]);
  const [isLoaded, setIsLoaded] = useState(false);

  const deleteOrder = async ({ orderId }) => {
    setIsLoading(true);
    setIsLoaded(false);
    let deleteOrder = new Parse.Object("Services");
    deleteOrder.set("objectId", orderId);
    try {
      console.log(orderId);
      await deleteOrder.destroy();
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

  return { deleteOrder, isLoading, isLoaded, reset };
};

export default useDeleteOrder;
