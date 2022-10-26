import OrderForm from "./OrderForm";
import ClientForm from "./ClientForm";
import UploadImageForm from "./UploadImageForm";
import { View } from "react-native";
import AnimatedMultistep from "./AnimatedMultistep";

const allSteps = [
  { name: "step 1", component: ClientForm },
  { name: "step 2", component: OrderForm },
  { name: "step 3", component: UploadImageForm },
];

const NewOrderMainScreen = ({ navigation }) => {
  onNext = () => {};

  onBack = () => {};

  finish = (finalState) => {
    console.log(finalState);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AnimatedMultistep
        steps={allSteps}
        onFinish={finish}
        onBack={onBack}
        onNext={onNext}
        navigation={navigation}
      />
    </View>
  );
};

export default NewOrderMainScreen;
