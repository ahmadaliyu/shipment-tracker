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
        tabBarStyle: {
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "#666",
        tabBarLabelStyle: {
          fontSize: 12,
          top: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ShipmentScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <ShipmentIconActive /> : <ShipmentIconInActive />,
          tabBarLabel: "Shipments",
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <ScanActive /> : <ScanInActive />,
          tabBarLabel: "Scan",
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <WalletActive /> : <WalletInActive />,
          tabBarLabel: "Wallet",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <ProfileActive /> : <ProfileInActive />,
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
