import { useState } from "react";
import Parse from "parse";

export default function useHighlightOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const highlightOrder = async ({ order }) => {
    setIsLoading(true);

    // send post request
    try {
      let updateOrder = new Parse.Object({ id: order.serviceOrderId });
      updateOrder.set("is_highlighted", !order.isHighlighted);
      await updateOrder.save();
    } catch (e) {
      console.log("Something went wrong.");
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
