import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface DashedLineProps {
  dashWidth?: number;
  dashGap?: number;
  dashColor?: string;
  style?: ViewStyle;
}

const DashedLine: React.FC<DashedLineProps> = ({
  dashWidth = 5,
  dashGap = 3,
  dashColor = "#fff",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: 50 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dash,
            {
              width: dashWidth,
              height: 1,
              backgroundColor: dashColor,
              marginRight: dashGap,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  dash: {
    flexShrink: 0,
  },
});

export default DashedLine;
