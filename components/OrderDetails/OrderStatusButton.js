import { Button } from "react-native-paper";
import { colours } from "../../utils/constants";
export default function OrderStatusButton({ setVisible, service }) {
  return (
    <Button
      mode="outlined"
      textColor={colours.ORANGE_WEB}
      style={{ borderColor: colours.ORANGE_WEB, marginLeft: 10 }}
      onPress={() => setVisible(true)}
    >
      {service.status}
    </Button>
  );
}
