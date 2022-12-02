import { useState } from "react";
import Parse from "parse/react-native.js";

export default function useHighlightOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const highlightOrder = async ({ order }) => {
    setIsLoading(true);

    // send post request
    try {
      const updatedOrder = new Parse.Object("Services");
      updatedOrder.set("objectId", order.serviceOrderId);
      updatedOrder.set("is_highlighted", !order.isHighlighted);
      await updatedOrder.save();
    } catch (e) {
      console.log("Something went wrong.", e);
    }

    setIsLoading(false);
    setIsLoaded(true);
  };

  const reset = () => {
    setIsLoading(false);
    setIsLoaded(false);
  };

  return { isLoading, isLoaded, reset, highlightOrder };
}
