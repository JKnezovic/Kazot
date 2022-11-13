import OrderForm from "./OrderForm";
import ClientForm from "./ClientForm";
import UploadImageForm from "./UploadImageForm";
import { View } from "react-native";
import AnimatedMultistep from "./AnimatedMultistep";
import { Snackbar } from "react-native-paper";
import { useState } from "react";

const allSteps = [
  { name: "step 1", component: ClientForm },
  { name: "step 2", component: OrderForm },
  { name: "step 3", component: UploadImageForm },
];

const NewOrderMainScreen = ({ navigation }) => {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const setSnackbar = (visible, message, navigate = false) => {
    setSnackbarMessage(message);
    setVisibleSnackbar(visible);

    if (navigate) setShouldNavigate(true);
  };

  const dismissSnackbar = () => {
    setVisibleSnackbar(false);
    if (shouldNavigate) {
      setShouldNavigate(false);
      navigation.navigate("Main");
    }
  };

  const onNext = () => {};

  const onBack = () => {};

  const finish = (finalState) => {
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
        setSnackbar={setSnackbar}
      />
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => dismissSnackbar()}
        duration={1000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

export default NewOrderMainScreen;
