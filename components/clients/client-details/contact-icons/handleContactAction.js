import { Linking } from "react-native";

export const handleContactAction = async (type, client) => {
  const { contact, email } = client;

  switch (type) {
    case "call":
      await Linking.openURL(`tel:${contact}`);
      break;
    case "email":
      await Linking.openURL(`mailto:${email}`);
      break;
    case "sms":
      await Linking.openURL(`sms:${contact}`);
      break;
    case "whatsapp":
      //whatsapp only accepts country code starting with '+' not '00'
      const formattedNumber = contact.startsWith("00") ? contact.replace(/^00/, "+") : contact;
      await Linking.openURL(`whatsapp://send?phone=${formattedNumber}`);
      break;
    default:
      console.log("Invalid action type");
  }
};
