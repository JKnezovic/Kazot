import { Button } from "react-native-paper";
import { Colors } from "../../utils/constants";
export default function OrderStatusButton({ setVisible, service }) {
  return (
    <Button
      mode="outlined"
      textColor={Colors.ORANGE_WEB}
      style={{ borderColor: Colors.ORANGE_WEB, marginLeft: 10 }}
      onPress={() => setVisible(true)}
    >
      {service.status}
    </Button>
  );
}
