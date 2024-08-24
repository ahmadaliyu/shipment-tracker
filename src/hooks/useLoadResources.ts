import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useLoadResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          interRegular: require("../images/fonts/Inter_18pt-Regular.ttf"),
          interMedium: require("../images/fonts/Inter_18pt-Medium.ttf"),
          interBold: require("../images/fonts/Inter_18pt-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Delay for 5 seconds before hiding the splash screen
        setTimeout(async () => {
          setLoadingComplete(true);
          await SplashScreen.hideAsync();
        }, 5000);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
