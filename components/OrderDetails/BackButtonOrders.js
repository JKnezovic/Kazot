import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function BackButtonOrders() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Orders")}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </Pressable>
  );
}
