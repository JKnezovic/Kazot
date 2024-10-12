import React from "react";
import ContactIcon from "./ContactIcon";
import { View } from "react-native";
import { handleContactAction } from "./handleContactAction";
import styles from "../../styles";
import { contactMap } from "./ContactIcons.consts";

const ContactIcons = ({ hasWhatsapp, client }) => {
  const contactIcons = Object.keys(contactMap).filter(
    (key) => !((key === "email" && !client.email) || (key === "whatsapp" && !hasWhatsapp))
  );

  return (
    <View style={[styles.row, styles.contact]}>
      {contactIcons.map((iconKey) => {
        const iconData = contactMap[iconKey];
        return (
          <ContactIcon
            onPress={() => handleContactAction(iconKey, client)}
            iconName={iconData.name}
            iconColor={iconData.color}
            iconType={iconData.type}
            key={iconKey}
          />
        );
      })}
    </View>
  );
};

export default ContactIcons;
