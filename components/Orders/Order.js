import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { moderateScale } from "../../Scaling";
import { Colors, colorMap } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import DateToDDMMYY from "../../utils/DateToDDMMYY";
import OrderMenu from "./order/OrderMenu";

const Order = ({
  order = {},
  modal = {},
  setSelectedOrderId,
  getOrders,
  isTablet = false,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.shadowWrapper}
      onPress={() =>
        navigation.navigate("orderDetails", { serviceId: order.serviceOrderId })
      }
    >
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            order.isHighlighted
              ? styles.highlightedBg
              : { backgroundColor: colorMap[order.status] },
          ]}
        >
          <Text style={styles.text}>{order.serviceId}</Text>
          <Text style={styles.text}>{DateToDDMMYY(order.serviceDate)}</Text>
        </View>
        <View
          style={[
            styles.content,
            {
              paddingVertical: moderateScale(isTablet ? 5 : 10),
              paddingHorizontal: moderateScale(isTablet ? 5 : 10),
            },
          ]}
        >
          <View style={styles.details}>
            <View style={styles.client}>
              <View
                style={[
                  {
                    display: "flex",
                    flexDirection: "row",
                  },
                ]}
              >
                {isTablet && (
                  <View style={styles.contactTitles}>
                    <Text style={isTablet && { marginBottom: 5 }}>Name:</Text>
                    <Text style={isTablet && { marginBottom: 5 }}>
                      Contact:
                    </Text>
                  </View>
                )}
                <View>
                  <Text style={isTablet && { marginBottom: 5 }}>
                    {!order.clientName && !order.clientSurname
                      ? `-`
                      : `${order.clientName} ${order.clientSurname}`}
                  </Text>
                  <Text style={isTablet && { marginBottom: 5 }}>
                    {order.clientContact || "-"}
                  </Text>
                </View>
              </View>
              <Text style={styles.status}>{order.status}</Text>
            </View>

            <View style={styles.divider} />
            <View style={styles.order}>
              <Text numberOfLines={1} style={isTablet && { marginBottom: 5 }}>
                <Text>Type:</Text> {order.type || "-"}
              </Text>
              <Text numberOfLines={1} style={isTablet && { marginBottom: 5 }}>
                <Text>Model:</Text> {order.vehicleModel || "-"}
              </Text>
              <Text numberOfLines={1}>
                <Text>Issue:</Text> {order.issue || "-"}
              </Text>
            </View>
          </View>

          <OrderMenu
            order={order}
            client={order.client}
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
    backgroundColor: Colors.WHITE,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  highlightedBg: {
    backgroundColor: Colors.ANTIQUE_RUBY,
  },
  header: {
    backgroundColor: Colors.OXFORD_BLUE,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(5),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: { color: Colors.WHITE },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    minWidth: "90%",
    maxWidth: "90%",
    overflow: "hidden",
  },
  client: {
    minWidth: "50%",
    maxWidth: "50%",
  },
  order: {
    minWidth: "50%",
    maxWidth: "50%",
  },
  divider: {
    borderRight: "solid",
    borderRightColor: Colors.PLATINUM,
    borderRightWidth: 1,
    height: "100%",
    marginHorizontal: moderateScale(7),
  },
  status: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: Colors.OXFORD_BLUE,
  },
  contactTitles: {
    marginRight: 5,
  },
});
