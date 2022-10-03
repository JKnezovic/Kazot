import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Parse from "parse/react-native.js";
import ClientsSearch from "./ClientsSearch";
import ClientsList from "./ClientsList";

export default function ClientsView() {
  const [clients, setClients] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    let query = new Parse.Query("Clients");
    let queryResult = await query.findAll();
    setClients(queryResult);
  };

  return (
    <View>
      <ClientsSearch setQuery={setQuery} setSortBy={setSortBy} />
      <ClientsList clients={clients} />
    </View>
  );
}

const styles = StyleSheet.create({});
