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
      await deleteOrder.destroy();
      removeImages(orderId);
      setIsLoading(false);
      setIsLoaded(true);
    } catch (e) {
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  const removeImages = async (orderId) => {
    try {
      const params = { serviceOrderId: orderId };
      const result = await Parse.Cloud.run(
        "deleteImagesForServiceOrder",
        params
      );
    } catch (error) {
      console.log(error, "delet");
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsLoaded(false);
  };

  return { deleteOrder, isLoading, isLoaded, reset };
};

export default useDeleteOrder;
