import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ClientItem({ client = {} }) {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Client Details")}>
        <Text>
          {client.get("name")} {client.get("surname")}
        </Text>
      </Pressable>
    </View>
  );
}
