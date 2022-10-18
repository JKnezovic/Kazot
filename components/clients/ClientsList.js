import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ClientItem from "./ClientItem";

export default function ClientsList({
  clients = [],
  isRefreshing = false,
  setIsRefreshing,
}) {
  useEffect(() => {
    setIsRefreshing(false), [clients];
  });
  return (
    <View style={{ height: "100%" }}>
      <FlatList
        data={clients}
        renderItem={({ item }) => <ClientItem client={item} />}
        keyExtractor={(item) => item.id}
        onRefresh={() => setIsRefreshing(true)}
        refreshing={isRefreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
