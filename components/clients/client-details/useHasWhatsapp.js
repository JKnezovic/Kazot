import { Linking, Alert } from "react-native";
import { useState, useEffect } from "react";

const useHasWhatsapp = (number) => {
  const [hasWhatsapp, setHasWhatsapp] = useState(false);

  useEffect(() => {
    const checkWhatsapp = async () => {
      const whatsappUrl = `whatsapp://send?phone=${number}`;
      try {
        const supported = await Linking.canOpenURL(whatsappUrl);
        setHasWhatsapp(supported);
      } catch (error) {
        Alert.alert("Unable to check WhatsApp support.", error.message);
        setHasWhatsapp(false);
      }
    };

    if (number) {
      checkWhatsapp();
    }
  }, [number]);

  return hasWhatsapp;
};

export default useHasWhatsapp;
