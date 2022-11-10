import * as React from "react";
import Parse from "parse/react-native.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { APPLICATION_ID, JAVASCRIPT_KEY } from "./config.js";
import OrderDetailsMainScreen from "./components/OrderDetails/OrderDetailsMainScreen.js";
import LoginScreen from "./components/Login/LoginScreen";
import MainScreen from "./components/MainScreen/MainScreen";
import NewOrderMainScreen from "./components/NewOrder/NewOrderMainScreen.js";
import ClientDetailsView from "./components/clients/client-details/ClientDetailsView.js";
import * as ScreenOrientation from "expo-screen-orientation";
import { isSmartPhoneBasedOnRatio } from "./Scaling";
import {
  MD3LightTheme,
  Provider as PaperProvider,
  Button,
} from "react-native-paper";
import { colours } from "./utils/constants";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  colors: {
    ...MD3LightTheme.colors,
    primary: colours.ORANGE_WEB,
  },
};

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
      <PaperProvider theme={theme}>
        <Stack.Navigator initialRouteName="Main">
          {!isSignedIn ? (
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Main" options={{ headerShown: false }}>
                {(props) => <MainScreen {...props} setUser={setUser} />}
              </Stack.Screen>
              <Stack.Screen name="NewOrder" component={NewOrderMainScreen} />
            </>
          )}
          <Stack.Screen name="Client Details" component={ClientDetailsView} />
          <Stack.Screen
            name="orderDetails"
            component={OrderDetailsMainScreen}
            initialParams={{ serviceId: "wAkT5FhJwM" }}
            options={{
              title: "SO-10023-22",
              headerRight: () => (
                <Button
                  mode="outlined"
                  textColor={colours.ORANGE_WEB}
                  style={{ borderColor: colours.ORANGE_WEB }}
                >
                  {"Created"}
                </Button>
              ),
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
