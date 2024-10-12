import React from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";

const ContactIcon = ({ onPress, iconName, iconColor, iconType }) => {
  const IconComponent = iconType === "FontAwesome" ? FontAwesome : Feather;

  return <IconComponent onPress={onPress} name={iconName} size={30} color={iconColor} />;
};

export default ContactIcon;
