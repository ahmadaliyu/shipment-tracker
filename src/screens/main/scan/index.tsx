import ScrollContainer from "@/components/ScrollContainer";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Scan() {
  return (
    <ScrollContainer style={styles.container} disableScroll>
      <Text>Scan</Text>
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
