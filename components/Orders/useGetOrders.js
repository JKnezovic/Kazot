import { useState } from "react";
import Parse from "parse/react-native.js";
import serviceOrdersTransformer from "./serviceOrdersTransformer";
import { serviceStatuses } from "../../utils/constants";

const useGetOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getOrders = async ({ statusFilters = [], dateFilter = null }) => {
    // get orders
    setIsLoading(true);
    setIsLoaded(false);

    let queryArray = [];

    try {
      let joinedResults = [];
      if (
        statusFilters.length > 0 &&
        statusFilters.length < serviceStatuses.length
      ) {
        // trazi s filterima
        statusFilters.forEach((filter) => {
          let query = new Parse.Query("Services");

          query.equalTo("status", filter);
          if (dateFilter) {
            dateFilter.setHours(0, 0, 0, 0);
            query.greaterThanOrEqualTo("service_date", dateFilter);
            var datePlusOne = new Date(dateFilter);
            datePlusOne.setDate(datePlusOne.getDate() + 1);
            datePlusOne.setHours(0, 0, 0, 0);
            query.lessThan("service_date", datePlusOne);
          }
          queryArray.push(query);
        });
        joinedResults = await Parse.Query.or(...queryArray)
          .include("client_fkey")
          .include("vehicle_fkey")
          .ascending("service_date")
          .find();
      } else {
        // trazi sve
        let parseOrders = new Parse.Query("Services");
        parseOrders.limit(999999);
        parseOrders.include("client_fkey");
        parseOrders.include("vehicle_fkey");
        parseOrders.ascending("service_date");

        if (dateFilter) {
          dateFilter.setHours(0, 0, 0, 0);
          parseOrders.greaterThanOrEqualTo("service_date", dateFilter);
          var datePlusOne = new Date(dateFilter);
          datePlusOne.setDate(datePlusOne.getDate() + 1);
          datePlusOne.setHours(0, 0, 0, 0);
          parseOrders.lessThan("service_date", datePlusOne);
        }

        joinedResults = await parseOrders.find();
      }
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
