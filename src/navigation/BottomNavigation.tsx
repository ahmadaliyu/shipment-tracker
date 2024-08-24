import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import ShipmentIconActive from "@/images/svgs/ship-active.svg";
import ShipmentIconInActive from "@/images/svgs/ship-inactive.svg";
import ScanActive from "@/images/svgs/scan-active.svg";
import ScanInActive from "@/images/svgs/scan-inactive.svg";
import WalletActive from "@/images/svgs/wallet-active.svg";
import WalletInActive from "@/images/svgs/wallet-inactive.svg";
import ProfileActive from "@/images/svgs/profile-active.svg";
import ProfileInActive from "@/images/svgs/profile-inactive.svg";
import ShipmentScreen from "@/screens/main/shipment";
import Wallet from "@/screens/main/wallet";
import Scan from "@/screens/main/scan";
import Profile from "@/screens/main/profile";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        //@ts-expect-error
        style: {
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        tabBarActiveTintColor: theme.colors.secondary,
        headerShown: false,
        tabBarStyle: {
          paddingTop: 20,
          marginTop: 0,
          height: 70,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ShipmentScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <ShipmentIconActive /> : <ShipmentIconInActive />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <ScanActive /> : <ScanInActive />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <WalletActive /> : <WalletInActive />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <ProfileActive /> : <ProfileInActive />,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
