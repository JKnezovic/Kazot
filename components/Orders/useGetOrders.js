import { useState } from "react";
import Parse from "parse/react-native.js";
import serviceOrdersTransformer from "./serviceOrdersTransformer";

const useGetOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getOrders = async ({ statusFilters = [], dateFilter = null }) => {
    // get orders
    setIsLoading(true);
    setIsLoaded(false);
    let parseOrders = new Parse.Query("Services");
    parseOrders.limit(999999);
    parseOrders.include("client_fkey");
    parseOrders.include("vehicle_fkey");
    statusFilters.forEach((filter) => parseOrders.equalTo("status", filter));
    if (dateFilter) {
      parseOrders.greaterThanOrEqualTo("service_date", dateFilter);
      var datePlusOne = new Date(dateFilter);
      datePlusOne.setDate(datePlusOne.getDate() + 1);
      datePlusOne.setHours(0, 0, 0, 0);
      parseOrders.lessThan("service_date", datePlusOne);
    }
    try {
      let joinedResults = await parseOrders.find();
      setOrders(serviceOrdersTransformer({ data: joinedResults }));
    } catch (error) {
      console.log("Something went wrong.", error);
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
