import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ClientItem from "./ClientItem";

export default function ClientsList({ clients = [] }) {
  return (
    <FlatList
      data={clients}
      renderItem={({ item }) => <ClientItem client={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
