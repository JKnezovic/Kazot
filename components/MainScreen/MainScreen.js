import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import UserProfile from "../UserProfile/UserProfile";
import NewOrderMainScreen from "../NewOrder/NewOrderMainScreen";
import OrderMainScreen from "../Orders/OrderMainScreen";
import InventoryMainScreen from "../Inventory/InventoryMainScreen";
import ClientsMainScreen from "../clients/ClientsView";

const Tab = createBottomTabNavigator();

export default function MainScreen(props) {
  return (
    <Tab.Navigator
      initialRouteName="Orders"
      screenOptions={{
        tabBarActiveTintColor: "#fca311",
      }}
    >
      <Tab.Screen
        name="Orders"
        component={OrderMainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="tools" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Clients"
        component={ClientsMainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryMainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="barcode" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      >
        {() => <UserProfile setUser={props.setUser} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
