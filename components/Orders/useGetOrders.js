import React, { useState, useEffect } from "react";
import Parse from "parse/react-native.js";

const useGetOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getOrders = async () => {
    // get orders
    setIsLoading(true);
    setIsLoaded(false);
    let parseOrders = new Parse.Query("Services");

    parseOrders.include("client_fkey");
    parseOrders.include("vehicle_fkey");
    try {
      let joinedResults = await parseOrders.find();
      setOrders(joinedResults);
    } catch (error) {
      console.log("Something went wrong.");
    }

    setIsLoading(false);
    setIsLoaded(true);
  };

  const reset = () => {
    setIsLoading(false);
    setIsLoaded(true);
    setOrders([]);
  };

  return { orders, isLoading, isLoaded, getOrders, reset };
};

export default useGetOrders;
