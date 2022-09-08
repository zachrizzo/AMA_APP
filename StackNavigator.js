import React from "react";
import { View, Text, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import BarcodeScreen from "./screens/BarcodeScreen";
import LoginScreen from "./screens/LoginScreen";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import useAuth, { AuthProvider } from "./hooks/useAuth";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserOptionsScreen from "./screens/UserOptionsScreen";
import SignUp from "./screens/SignUpScreen";
import ToDo from "./screens/ToDoScreen";
import ManualItemEntryScreen from "./screens/ManualItemEntryScreen";
import HomeScreenPhone from "./screens/HomeScreenPhone";
import BarcodeScreeenPhone from "./screens/BarcodeScreeenPhone";
import MISscreen from "./screens/MISscreen";
import TodoTaskPage from "./screens/ToDoTaskScreen";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const golbalScreenOptions = {
  headerStyle: { backgroundColor: "#FFFFFF" },
  headerTitle: { color: "#121111" },
  headerTintColor: "black",
  headerShown: false,
  cardStyle: { backgroundColor: "#121111" },
};
const golbaldrawerOptions = {
  headerStyle: { backgroundColor: "#FFFFFF" },
  headerTitle: { color: "#121111" },
  headerTintColor: "black",
  headerShown: true,
  cardStyle: { backgroundColor: "#121111" },
};
const ShowPhoneVersionHome = () => {
  if (Platform.isPad == true) {
    return <Drawer.Screen name="Home" component={HomeScreen} />;
  } else {
    return <Drawer.Screen name="Home" component={HomeScreenPhone} />;
  }
};
const ShowPhoneVersionBarcode = () => {
  if (Platform.isPad == true) {
    return <Drawer.Screen name="Barcode Screen" component={BarcodeScreen} />;
  } else {
    return (
      <Drawer.Screen name="Barcode Screen" component={BarcodeScreeenPhone} />
    );
  }
};
const StackNavigator = () => {
  // const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={golbalScreenOptions}>
        <Stack.Screen name="Login Screen" component={LoginScreen} />
        <Stack.Screen name="Home Drawer" component={DrawerNavigator} />
        <Stack.Screen name="Sign Up Screen" component={SignUp} />
        <Stack.Screen
          name="ToDo Screen"
          options={{ headerShown: true }}
          component={TodoTaskPage}
        />
        <Stack.Screen
          name="User Options Screen"
          component={UserOptionsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={golbaldrawerOptions}
    >
      {ShowPhoneVersionHome()}
      {/* <Drawer.Screen name="ToDo" component={ToDo} /> */}
      {ShowPhoneVersionBarcode()}
      <Drawer.Screen name="Add Item" component={ManualItemEntryScreen} />
      <Drawer.Screen name="MIS" component={MISscreen} />
    </Drawer.Navigator>
  );
}
export default StackNavigator;
