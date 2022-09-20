import * as React from "react";
import Parse from "parse/react-native.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/Login/LoginScreen";
import MainScreen from "./components/MainScreen/MainScreen";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("", "");
Parse.serverURL = "https://parseapi.back4app.com/";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const setUser = async () => {
    const currentUser = await Parse.User.currentAsync();
    setIsSignedIn(currentUser ? true : false);
  };

  React.useEffect(() => {
    setUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!isSignedIn ? (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
