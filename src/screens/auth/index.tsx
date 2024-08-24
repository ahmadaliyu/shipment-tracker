import ScrollContainer from "@/components/ScrollContainer";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "@/components/Button";
import Logo from "@/images/svgs/logo.svg";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "@/navigation/AuthStack";
import { useTheme } from "react-native-paper";

export default function Main({}) {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const theme = useTheme();

  const handleNext = () => {
    navigation.navigate("Login");
  };
  return (
    <ScrollContainer
      disableScroll
      containerStyle={{ backgroundColor: theme.colors.primary }}
      contentStyle={{ backgroundColor: theme.colors.primary }}
      style={{ backgroundColor: theme.colors.primary, flex: 1 }}
    >
      <View style={styles.container}>
        <Logo />
      </View>
      <Button
        onPress={handleNext}
        variant="solid"
        type="secondary"
        title="Login"
      />
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
