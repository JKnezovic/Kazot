import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { moderateScale } from "../../Scaling";
import { colours, orderOptions } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import DateToDDMMYY from "../../utils/DateToDDMMYY";
import OrderMenu from "./order/OrderMenu";

const Order = ({ order = {}, modal = {}, setSelectedOrderId, getOrders }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.shadowWrapper}
      onPress={() =>
        navigation.navigate("orderDetails", { serviceId: order.id })
      }
    >
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            order.get("is_highlighted") && styles.highlightedBg,
          ]}
        >
          <Text style={styles.text}>{order.get("service_id")}</Text>
          <Text style={styles.text}>
            {DateToDDMMYY(order.get("createdAt"))}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.details}>
            <View style={styles.client}>
              <Text>
                <Text>Name:</Text> {order.get("client_fkey")?.get("name")}
              </Text>
              <Text>
                <Text>Surname:</Text> {order.get("client_fkey")?.get("surname")}
              </Text>
              <Text>
                <Text>Contact:</Text> {order.get("client_fkey")?.get("contact")}
              </Text>
              <Text>
                <Text>Status:</Text>
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.order}>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text>Type:</Text> {order.get("type")}
              </Text>
              <Text>
                <Text>Model:</Text> {order.get("vehicle_fkey")?.get("model")}
              </Text>
              <Text>
                <Text>Issue:</Text> {order.get("issue")}
              </Text>
              <Text
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: colours.OXFORD_BLUE,
                }}
              >
                {order.get("status")}
              </Text>
            </View>
          </View>

          <OrderMenu
            order={order}
            clientId={order.get("client_fkey")}
            modal={modal}
            setSelectedOrderId={setSelectedOrderId}
            getOrders={getOrders}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default Order;

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  container: {
    backgroundColor: colours.WHITE,
    marginBottom: moderateScale(10),
    borderRadius: 10,
    overflow: "hidden",
  },
  highlightedBg: {
    backgroundColor: colours.ANTIQUE_RUBY,
  },
  header: {
    backgroundColor: colours.OXFORD_BLUE,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(5),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: { color: colours.WHITE },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  details: {
    display: "flex",
    flexDirection: "row",
    minWidth: "90%",
    maxWidth: "90%",
    overflow: "hidden",
  },
  client: {
    minWidth: "40%",
  },
  order: {
    minWidth: "50%",
  },
  divider: {
    borderRight: "solid",
    borderRightColor: colours.PLATINUM,
    borderRightWidth: 1,
    height: "100%",
    marginHorizontal: moderateScale(7),
  },
});
