import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function BackButtonOrders({ goTo = "Orders" }) {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (goTo === "Client Details") navigation.goBack();
    else navigation.navigate("Orders");
  };

  return (
    <Pressable onPress={handleNavigation}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </Pressable>
  );
}
