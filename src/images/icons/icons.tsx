import { forwardRef } from "react";
import {
  Image,
  StyleProp,
  ImageStyle,
  Pressable,
  GestureResponderEvent,
  View,
} from "react-native";

const icons = {
  "chevron-back": require("./chevron-back.png"),
  bell: require("./bell.png"),
  search: require("./search.png"),
  "scan-b": require("./scan-b.png"),
  filter: require("./filter.png"),
  cancel: require("./cancel.png"),
  "fwd-arrow": require("./fwd-arrow.png"),
  "arrow-expand": require("./expand-arrow.png"),
  "checkbox-tick": require("./checkbox-tick.png"),
  "checkbox-outline": require("./checkbox-outline.png"),
  wapp: require("./wapp.png"),
  call: require("./phone.png"),
  "active-expand": require("./arrow-expand-active.png"),
};

interface TAppIcons {
  name: keyof typeof icons;
  style?: StyleProp<ImageStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  size?: number;
}

const AppIcons = forwardRef<View, TAppIcons>(function (
  { name, style, size = 24, onPress },
  ref
) {
  return (
    (onPress && (
      <Pressable
        onPress={onPress}
        ref={ref}
        style={[{ width: size, height: size }, style]}
      >
        <Image
          style={[{ width: size, height: size }, style]}
          source={icons[name]}
        />
      </Pressable>
    )) || (
      <Image
        style={[{ width: size, height: size }, style]}
        source={icons[name]}
      />
    )
  );
});

export default AppIcons;
