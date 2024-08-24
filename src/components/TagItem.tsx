import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function TagItem({ title, ...rest }) {
  const theme = useTheme();
  return (
    <TouchableOpacity style={[styles.con, rest.style]}>
      <Text style={{ color: theme.colors.primary }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  con: {
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flexDirection: "row",
  },
  text: {
    fontSize: 11,
    fontFamily: "interRegular",
  },
});
