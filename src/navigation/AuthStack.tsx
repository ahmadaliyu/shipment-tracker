import React from "react";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import Login from "@/screens/auth/Login";
import Main from "@/screens/auth";

const Stack = createStackNavigator();

type AuthStackParamList = {
  Login: undefined;
};

export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
