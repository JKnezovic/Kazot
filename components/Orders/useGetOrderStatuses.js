import React, { useState } from "react";
import Parse from "parse/react-native.js";

const useGetOrderStatuses = () => {
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getOrderStatuses = async () => {
    // get order statuses
    setIsLoading(true);
    setIsLoaded(false);
    let parseOrderStatuses = new Parse.Query("OrderStatus");
    try {
      let results = await parseOrderStatuses.find();
      setOrderStatuses(results);
    } catch (error) {
      console.log("Something went wrong.");
    }

    setIsLoading(false);
    setIsLoaded(true);
  };

  const reset = () => {
    setIsLoading(false);
    setIsLoaded(true);
    setOrderStatuses([]);
  };

  return { orderStatuses, isLoading, isLoaded, getOrderStatuses, reset };
};

export default useGetOrderStatuses;
