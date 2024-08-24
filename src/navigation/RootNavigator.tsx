import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import LoadingScreen from "@/screens/intro/LoadingScreen";
import useLoadResources from "@/hooks/useLoadResources";
import { useAppSelector } from "@/store/hooks";

export default function RootNavigator() {
  const { user } = useAppSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const isLoadingComplete = useLoadResources();

  // solely for testing
  useEffect(() => {
    // Set a 4-second delay
    const timer = setTimeout(() => {
      setLoading(true);
    }, 4000); // 4000ms = 4 seconds

    // Clean up the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if (!isLoadingComplete || !loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer fallback={<LoadingScreen />}>
      {user?.home_page ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
