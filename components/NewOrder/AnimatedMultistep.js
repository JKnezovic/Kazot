import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { fadeIn, fadeOutLeft, fadeOutRight } from "./Animations";
import { ProgressBar, Button } from "react-native-paper";
import { moderateScale } from "../../Scaling";
import Parse from "parse/react-native.js";
import MandatoryInputsDialog from "./MandatoryInputsDialog";

const AnimatedMultistep = ({ steps, setSnackbar, navigation, client }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [orderState, setOrderState] = useState({
    name: "",
    surname: "",
    contact: "",
    email: "",
    date: new Date(),
    serviceType: "",
    serialNumber: "",
    model: "",
    problem: "",
    notes: "",
  });
  const [images, setImages] = useState([]);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [visibleMandatoryInputs, setVisibleMandatoryInputs] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTotalSteps(steps.length - 1);
  }, []);

  useEffect(() => {
    if (client) {
      setOrderState((prevState) => ({
        ...prevState,
        name: client.name,
        surname: client.surname,
        contact: client.contact,
        email: client.email,
      }));
    }
  }, [client]);

  const next = () => {
    const duration = 200;
    if (currentStep !== totalSteps) {
      fadeOutLeft(duration, translateFadeAnim, fadeAnim);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, duration);
    } else {
      finish();
    }
  };

  const back = () => {
    const duration = 200;
    if (currentStep !== 0) {
      fadeOutRight(duration, translateFadeAnim, fadeAnim);

      setTimeout(() => {
        setCurrentStep(currentStep - 1);
      }, duration);
    }
  };

  const UploadAttachments = async (serviceOrder) => {
    // 1. Create a file
    var bar = new Promise((resolve, reject) => {
      images.forEach(async (image, index, array) => {
        const { base64 } = image;
        const filename = serviceOrder.get("service_id") + "_" + index;
        const parseFile = new Parse.File(filename, { base64 });
        // 2. Save the file
        try {
          const responseFile = await parseFile.save();
          const Attachments = Parse.Object.extend("Attachments");
          const attachments = new Attachments();
          attachments.set("attachment", responseFile);
          attachments.set("service_fkey", serviceOrder);
          await attachments.save();
          if (index === array.length - 1) resolve();
        } catch (error) {
          setSnackbar(
            true,
            "Opps, something went wrong when uploading images."
          );
        }
      });
    });
  };

  const createNewOrder = async () => {
    const params = {
      orderState: orderState,
    };
    return await Parse.Cloud.run("createNewOrder", params)
      .then(async (resultObject) => {
        return resultObject.result;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const finish = async () => {
    setActivityIndicator(true);
    var serviceOrder = await createNewOrder();

    if (serviceOrder === false) {
      setSnackbar(true, "Failed to create service order");
      setActivityIndicator(false);
      return;
    }

    await SaveNewStatusHistory(serviceOrder);
    //Upoladimages if they exist
    if (images.length > 0) await UploadAttachments(serviceOrder);

    resetState();
    setActivityIndicator(false);
    navigation.navigate("orderDetails", {
      serviceId: serviceOrder.id,
    });
  };

  const SaveNewStatusHistory = async (service) => {
    const currentUser = await Parse.User.currentAsync();
    let StatusHistory = new Parse.Object("OrderStatusHistory");
    StatusHistory.set("status", "Created");
    StatusHistory.set("service_fkey", service);
    StatusHistory.set("user_name", currentUser.get("username"));

    try {
      await StatusHistory.save();
      return true;
    } catch (error) {
      setSnackbar(true, "Oops, something went wrong");
      console.log(error);
      return false;
    }
  };

  const resetState = () => {
    setOrderState({
      name: "",
      surname: "",
      contact: "",
      email: "",
      date: new Date(),
      serviceType: "",
      serialNumber: "",
      model: "",
      problem: "",
      notes: "",
    });
    setCurrentStep(0);
    setImages([]);
  };

  const checkMandatoryInputs = () => {
    return orderState.name === "" ||
      orderState.contact === "" ||
      orderState.problem === "" ||
      orderState.model === "" ||
      orderState.serviceType === ""
      ? true
      : false;
  };

  const Step = steps[currentStep].component;

  const FadeIn = () => {
    fadeIn(200, translateFadeAnim, fadeAnim);
  };

  if (activityIndicator)
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#fca311"
          style={{ alignSelf: "center" }}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "40%",
          alignSelf: "center",
          marginVertical: 8,
        }}
      >
        <Text
          style={{ alignSelf: "center", paddingTop: 0, marginTop: 0 }}
        >{`Step ${currentStep + 1} of ${totalSteps + 1}`}</Text>
        <ProgressBar
          style={{}}
          progress={(currentStep + 1) / (totalSteps + 1)}
          color={"#fca311"}
        />
      </View>

      <Animated.View
        style={[
          {
            flex: 1,
            width: "100%",
            opacity: fadeAnim,
            transform: [{ translateX: translateFadeAnim }],
          },
        ]}
      >
        <Step
          orderState={orderState}
          setOrderState={setOrderState}
          resetState={resetState}
          FadeIn={FadeIn}
          images={images}
          setImages={setImages}
        />
      </Animated.View>

      <View
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          right: 10,
          bottom: 20,
        }}
      >
        <Button
          style={{ width: moderateScale(120), marginRight: "5%" }}
          textColor="#14213D"
          disabled={currentStep === 0 ? true : false}
          mode="elevated"
          buttonColor="#fca311"
          onPress={() => back()}
        >
          Previous
        </Button>

        {currentStep === totalSteps ? (
          <Button
            style={{ width: moderateScale(120) }}
            textColor="#14213D"
            mode="elevated"
            buttonColor="#fca311"
            onPress={
              checkMandatoryInputs()
                ? () => setVisibleMandatoryInputs(true)
                : () => finish()
            }
            color="#000000"
          >
            {"Finish"}
          </Button>
        ) : (
          <Button
            style={{ width: moderateScale(120) }}
            textColor="#14213D"
            mode="elevated"
            buttonColor="#fca311"
            onPress={() => next()}
            color="#000000"
          >
            {"Next"}
          </Button>
        )}
      </View>

      <MandatoryInputsDialog
        setVisibleMandatoryInputs={setVisibleMandatoryInputs}
        visibleMandatoryInputs={visibleMandatoryInputs}
        orderState={orderState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AnimatedMultistep;
