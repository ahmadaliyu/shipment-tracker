import "react-native-gesture-handler";
import { darkColors, lightColors } from "./const/colors";
import RootNavigator from "@/navigation/RootNavigator";
import { persistor, store } from "@/store";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const colorScheme = useColorScheme();

  const theme = {
    ...DefaultTheme,
    colors: colorScheme === "dark" ? darkColors.colors : lightColors.colors,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#000036"
            translucent={true}
          />
          <SafeAreaView style={styles.con}>
            <RootNavigator />
          </SafeAreaView>
          <StatusBar barStyle="default" />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  con: { flex: 1, backgroundColor: "#fff" },
});
