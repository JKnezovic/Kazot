import React from "react";
import ContactIcon from "./ContactIcon";
import { View, StyleSheet } from "react-native";
import { handleContactAction } from "./handleContactAction";
import { moderateScale } from "../../../../Scaling";
import { Colors } from "../../../../utils/constants";

const ContactIcons = ({ hasWhatsapp, client }) => {
  return (
    <View style={[styles.row, styles.contact]}>
      <ContactIcon
        onPress={() => handleContactAction("call", client)}
        iconName={"phone-call"}
        iconColor={Colors.AMAZON}
        iconType={"Feather"}
      />
      <ContactIcon
        onPress={() => handleContactAction("sms", client)}
        iconName={"message-circle"}
        iconColor={Colors.BABY_BLUE}
        iconType={"Feather"}
      />
      {client.email && (
        <ContactIcon
          onPress={() => handleContactAction("email", client)}
          iconName={"mail"}
          iconColor={Colors.ORANGE_WEB}
          iconType={"Feather"}
        />
      )}
      {hasWhatsapp && (
        <ContactIcon
          onPress={() => handleContactAction("whatsapp", client)}
          iconName={"whatsapp"}
          iconColor={Colors.WHATSAPP_GREEN}
          iconType={"FontAwesome"}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contact: {
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(8),
  },
});

export default ContactIcons;
