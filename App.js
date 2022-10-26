import * as React from "react";
import Parse from "parse/react-native.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { APPLICATION_ID, JAVASCRIPT_KEY } from "./config.js";
import OrderDetailsMainScreen from "./components/OrderDetails/OrderDetailsMainScreen.js";
import LoginScreen from "./components/Login/LoginScreen";
import MainScreen from "./components/MainScreen/MainScreen";
import * as ScreenOrientation from "expo-screen-orientation";
import { isSmartPhoneBasedOnRatio } from "./Scaling";
import { Provider as PaperProvider } from "react-native-paper";
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const setUser = async () => {
    const currentUser = await Parse.User.currentAsync();
    setIsSignedIn(currentUser ? true : false);
  };

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }

  React.useEffect(() => {
    setUser();
    if (isSmartPhoneBasedOnRatio()) changeScreenOrientation();
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName="orderDetails">
          {!isSignedIn ? (
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Main">
                {(props) => <MainScreen {...props} setUser={setUser} />}
              </Stack.Screen>
              <Stack.Screen
                name="orderDetails"
                component={OrderDetailsMainScreen}
                initialParams={{ serviceId: "p5yxXzCTz0" }}
              ></Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
