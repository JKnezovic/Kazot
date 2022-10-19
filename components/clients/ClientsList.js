import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ClientItem from "./ClientItem";
import ClientDetails from "./client-details/ClientDetails";

export default function ClientsList({
  clients = [],
  isRefreshing = false,
  setIsRefreshing,
}) {
  const [selectedClient, setSelectedClient] = useState(null);
  useEffect(() => {
    setIsRefreshing(false), [clients];
  });
  return (
    <View style={[{ height: "100%" }, selectedClient && styles.landscapeView]}>
      <FlatList
        data={clients}
        renderItem={({ item }) => (
          <ClientItem
            client={item}
            setSelectedClient={setSelectedClient}
            selected={item.id === selectedClient?.id}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={() => setIsRefreshing(true)}
        refreshing={isRefreshing}
        style={[selectedClient && styles.firstChild, styles.list]}
      />
      {selectedClient && (
        <View style={selectedClient && styles.secondChild}>
          <ClientDetails client={selectedClient} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  landscapeView: {
    display: "flex",
    flexDirection: "row",
  },
  firstChild: { flex: 3 },
  secondChild: { flex: 1 },
  list: {
    padding: 10,
  },
});
