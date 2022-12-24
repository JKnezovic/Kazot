import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import UserProfile from "../UserProfile/UserProfile";
import OrderMainScreen from "../Orders/OrderMainScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InventoryMainScreen from "../Inventory/InventoryMainScreen";
import NewOrderMainScreen from "../NewOrder/NewOrderMainScreen";
import ClientsMainScreen from "../clients/ClientsView";
import { moderateScale } from "../../Scaling";

const Tab = createBottomTabNavigator();

export default function MainScreen({ setUser, currentUser }) {
  return (
    <Tab.Navigator
      initialRouteName="Orders"
      screenOptions={{
        tabBarActiveTintColor: "#fca311",
        tabBarStyle: {
          height: moderateScale(79),
        },
      }}
    >
      <Tab.Screen
        name="Orders"
        unmountOnBlur={true}
        component={OrderMainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="tools" size={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="New Order"
        component={NewOrderMainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Clients"
        unmountOnBlur={true}
        component={ClientsMainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="contacts-outline"
              size={size}
              color={color}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      {currentUser?.role === "admin" && (
        <Tab.Screen
          name="Inventory"
          unmountOnBlur={true}
          component={InventoryMainScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="barcode" size={size} color={color} />
            ),
            unmountOnBlur: true,
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      >
        {() => <UserProfile setUser={setUser} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
