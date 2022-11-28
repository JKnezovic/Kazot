import React, { useState, useEffect } from "react";

export default function useHighlightOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const highlightOrder = async ({ order }) => {
    setIsLoading(true);

    // send post request
    try {
      order.set("is_highlighted", !order.get("is_highlighted"));
      await order.save();
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
