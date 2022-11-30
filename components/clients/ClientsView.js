import { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ClientsSearch from "./ClientsSearch";
import ClientsList from "./ClientsList";
import useGetClients from "./useGetClients";
import { colours } from "../../utils/constants";

export default function ClientsView() {
  const [filteredClients, setFilteredClients] = useState([]);
  const [query, setQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const { clients, getClients, isLoading, isLoaded } = useGetClients();

  // on first render, get the clients
  useEffect(() => {
    getClients();
  }, []);

  // before clients are fetched, show a loader
  useEffect(() => {
    if (showLoader && isLoaded) setShowLoader(false);
  }, [isLoaded]);

  // when clients are fetched, set them
  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  const searchForClients = () => {
    //filter array of clients by name or surname
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.surname.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    if (query?.length > 0) setFilteredClients(searchForClients());
    else setFilteredClients(clients);
  }, [query]);

  useEffect(() => {
    // fetch clients when user pulls list down
    if (isRefreshing) getClients();
  }, [isRefreshing]);

  useEffect(() => {
    if (!isLoading && isLoaded) setIsRefreshing(false);
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ClientsSearch setQuery={setQuery} searchQuery={query} />
        {showLoader ? (
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        ) : (
          <ClientsList
            clients={filteredClients}
            {...{ isRefreshing, setIsRefreshing }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  container: {
    height: "100%",
    backgroundColor: colours.PLATINUM,
  },
});
