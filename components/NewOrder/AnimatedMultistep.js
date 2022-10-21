import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { fadeIn, fadeOutLeft, fadeOutRight } from "./Animations";
import { ProgressBar, Button } from "react-native-paper";
import { moderateScale } from "../../Scaling";
import Parse from "parse/react-native.js";

const AnimatedMultistep = ({ steps, navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [orderState, setOrderState] = useState({
    name: "",
    surname: "",
    contact: "",
    email: "",
    date: new Date(),
    client: null,
    serviceType: "",
    serialNumber: "",
    model: "",
    problem: "",
    notes: "",
  });
  const [images, setImages] = useState([]);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTotalSteps(steps.length - 1);
  }, []);

  const showAlert = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Ok",
          onPress: () => navigation.navigate("Main"),
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => navigation.navigate("Main"),
      }
    );

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
    images.forEach(async (image, i) => {
      const { base64 } = image;
      const filename = "testing" + i;
      const parseFile = new Parse.File(filename, { base64 });
      // 2. Save the file
      try {
        const responseFile = await parseFile.save();
        const Attachments = Parse.Object.extend("Attachments");
        const attachments = new Attachments();
        attachments.set("attachment", responseFile);
        attachments.set("service_fkey", serviceOrder);
        await attachments.save();
      } catch (error) {
        Alert.alert(
          "The file either could not be read, or could not be saved to Back4app.",
          error
        );
      }
    });
  };

  const SaveNewClient = async () => {
    let Client = new Parse.Object("Clients");
    Client.set("name", orderState.name);
    Client.set("surname", orderState.surname);
    Client.set("email", orderState.email);
    Client.set("contact", orderState.contact);

    try {
      let client = await Client.save();
      console.log("Success!", "Client created!");
      return client;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      return false;
    }
  };

  const SaveNewVehicle = async (client) => {
    let Vehicle = new Parse.Object("Vehicles");
    Vehicle.set("model", orderState.model);
    Vehicle.set("serial_number", orderState.serialNumber);
    Vehicle.set("client_fkey", client);

    try {
      let vehicle = await Vehicle.save();
      console.log("Success!", "Vehicle created!");
      return vehicle;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      return false;
    }
  };

  const SaveServiceOrder = async (client, vehicle) => {
    let Service = new Parse.Object("Services");
    Service.set("issue", orderState.problem);
    Service.set("notes", orderState.notes);
    Service.set("type", orderState.serviceType);
    Service.set("service_id", 10002);
    Service.set("status", "Created");
    Service.set("client_fkey", client);
    Service.set("vehicle_fkey", vehicle);

    try {
      var serviceOrder = await Service.save();
      showAlert("Success!", "Service order created!");
      return serviceOrder;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      return false;
    }
  };

  const IsNewVehicleForClient = async (client) => {
    try {
      let query1 = new Parse.Query("Vehicles");
      query1.equalTo("client_fkey", client);
      let query2 = new Parse.Query("Vehicles");
      query2.equalTo("serial_number", orderState.serialNumber);
      let query = new Parse.Query("Vehicles");
      query._andQuery([query1, query2]);
      let queryResult = await query.find();
      return queryResult;
    } catch (error) {
      Alert.alert("Error!", error.message);
      return false;
    }
  };

  const finish = async () => {
    var client;
    var vehicle;
    setActivityIndicator(true);

    //If existing client was not selected create new client
    if (orderState.client && orderState.client.get("name") === orderState.name)
      client = orderState.client;
    else client = await SaveNewClient();
    if (client === false) {
      Alert.alert("Failed to add Client");
      setActivityIndicator(false);
      return;
    }
    //If serial number exist check if vehicle already exist for user, if not create a new one
    if (orderState.serialNumber) {
      var isNew = await IsNewVehicleForClient(orderState.client);
      if (isNew.length === 0) {
        vehicle = await SaveNewVehicle(client);
        if (vehicle === false) {
          Alert.alert("Failed to add Vehicle");
          setActivityIndicator(false);
          return;
        }
      } else vehicle = isNew[0];
    } else vehicle = null;

    //Create service order with client and vehicle foreign key
    var serviceOrder = await SaveServiceOrder(client, vehicle);
    if (serviceOrder === false) {
      Alert.alert("Failed to create service order");
      setActivityIndicator(false);
      return;
    }
    //Upoladimages if they exist
    if (images.length > 0) await UploadAttachments(serviceOrder);

    resetState();
    setActivityIndicator(false);
  };

  const resetState = () => {
    setOrderState({
      name: "",
      surname: "",
      contact: "",
      email: "",
      date: new Date(),
      client: null,
      serviceType: "",
      serialNumber: "",
      model: "",
      problem: "",
      notes: "",
    });
    setImages([]);
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

        <Button
          style={{ width: moderateScale(120) }}
          textColor="#14213D"
          mode="elevated"
          buttonColor="#fca311"
          onPress={currentStep === totalSteps ? () => finish() : () => next()}
          color="#000000"
        >
          {currentStep === totalSteps ? "Finish" : "Next"}
        </Button>
      </View>
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
