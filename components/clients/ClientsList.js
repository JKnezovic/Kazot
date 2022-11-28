import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ClientItem from "./ClientItem";
import ClientDetails from "./client-details/ClientDetails";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import useScreenDimensions from "../../useScreenDimensions";

export default function ClientsList({
  clients = [],
  isRefreshing = false,
  setIsRefreshing,
}) {
  const [selectedClient, setSelectedClient] = useState(null);
  const screenData = useScreenDimensions();
  const navigation = useNavigation();
  useEffect(() => {
    setIsRefreshing(false), [clients];
  });
  const renderItem = ({ item }) => (
    <ClientItem
      client={item}
      setSelectedClient={setSelectedClient}
      selected={item.id === selectedClient?.id}
      navigation={navigation}
      screenData={screenData}
    />
  );
  return (
    <View style={[{ height: "100%" }, selectedClient && styles.landscapeView]}>
      <FlashList
        data={clients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onRefresh={() => setIsRefreshing(true)}
        refreshing={isRefreshing}
        estimatedItemSize={75}
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
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 100,
    marginBottom: 70,
  },
});
