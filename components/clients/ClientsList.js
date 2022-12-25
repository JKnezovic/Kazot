import React, { useEffect } from "react";
import { View } from "react-native";
import ClientItem from "./ClientItem";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import useScreenDimensions from "../../useScreenDimensions";
import { moderateScale } from "../../Scaling";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function ClientsList({
  clients = [],
  isRefreshing = false,
  setIsRefreshing,
}) {
  const screenData = useScreenDimensions();
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    setIsRefreshing(false), [clients];
  });
  const renderItem = ({ item }) => (
    <ClientItem client={item} navigation={navigation} screenData={screenData} />
  );
  return (
    <View style={[{ height: "100%", paddingBottom: tabBarHeight - 30 }]}>
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
