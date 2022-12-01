import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ClientItem from "./ClientItem";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import useScreenDimensions from "../../useScreenDimensions";

export default function ClientsList({
  clients = [],
  isRefreshing = false,
  setIsRefreshing,
}) {
  const screenData = useScreenDimensions();
  const navigation = useNavigation();
  useEffect(() => {
    setIsRefreshing(false), [clients];
  });
  const renderItem = ({ item }) => (
    <ClientItem client={item} navigation={navigation} screenData={screenData} />
  );
  return (
    <View style={[{ height: "100%" }]}>
      <FlashList
        data={clients}
        renderItem={renderItem}
        keyExtractor={(item) => item.clientId}
        onRefresh={() => setIsRefreshing(true)}
        refreshing={isRefreshing}
        estimatedItemSize={75}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  firstChild: { flex: 3 },
  secondChild: { flex: 1 },
  list: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 100,
    marginBottom: 70,
  },
});
