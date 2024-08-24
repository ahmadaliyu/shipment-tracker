import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
} from "react-native";
import React, { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import AppIcons from "@/images/icons/icons";

export default function Header({
  right,
  left,
  otherAction,
  contentStyle,
  title,
  ...rest
}: {
  right?: ReactNode;
  left?: ReactNode;
  otherAction?: () => void;
  contentStyle?: ViewStyle;
  title?: string;
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.con, contentStyle && contentStyle]} {...rest}>
      <View style={styles.left}>
        {left ? (
          left
        ) : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            <AppIcons name="chevron-back" />
          </TouchableOpacity>
        )}
        <View style={{ left: 65 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              fontFamily: "interRegular",
            }}
          >
            {title && title}
          </Text>
        </View>
      </View>
      {right && right}
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    marginBottom: 24,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  back: {
    marginRight: 15,
  },
});
