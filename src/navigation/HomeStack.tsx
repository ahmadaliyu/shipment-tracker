import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import BottomNavigator from "./BottomNavigation";
import { Platform } from "react-native";
import HomeScreen from "@/screens/main/shipment";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator:
          Platform.OS === "ios"
            ? CardStyleInterpolators.forHorizontalIOS
            : CardStyleInterpolators.forBottomSheetAndroid,
        presentation: "transparentModal",
      }}
    >
      <Stack.Screen name="App" component={BottomNavigator} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
