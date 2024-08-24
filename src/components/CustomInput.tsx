import React, { RefCallback, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Text,
  Pressable,
} from "react-native";
import { Controller, Control } from "react-hook-form";
import AppIcons from "@/images/icons/icons";

interface CustomInputProps extends TextInputProps {
  name?: string;
  label?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  control?: Control<any>;
  error?: any;
  password?: boolean;
  international?: boolean;
  transformFn?: (text: string) => string;
  inputContainerStyle?: StyleProp<ViewStyle>;
  outerContainerStyle?: StyleProp<ViewStyle>;
  inputRef?: RefCallback<any>;
  underlined?: boolean;
  placeholderTextColor?: string;
  theme?: "light" | "dark" | undefined;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  leftIcon,
  rightIcon,
  control,
  error,
  password = false,
  international = false,
  transformFn,
  inputRef,
  underlined,
  placeholderTextColor,
  ...rest
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(password);

  return (
    <View
      style={[
        label && styles.container,
        rest.outerContainerStyle,
        error && styles.containerError,
      ]}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          rest.inputContainerStyle,
          underlined && styles.underline,
        ]}
      >
        {leftIcon && (
          <View
            style={{
              ...styles.iconContainer,
              alignItems: "center",
            }}
          >
            {leftIcon}
          </View>
        )}
        {control && name ? (
          <Controller
            control={control}
            name={name}
            render={({
              field: { onBlur, onChange, ref: controlRef, value },
            }) => {
              return (
                <TextInput
                  {...rest}
                  style={[styles.input, rest.style, error && styles.inputError]}
                  placeholderTextColor={placeholderTextColor || "#9CA3AF"}
                  onBlur={(e) => {
                    onBlur();
                    rest.onBlur && rest.onBlur(e);
                  }}
                  ref={(ref) => {
                    controlRef(ref);
                    inputRef && inputRef(ref);
                  }}
                  defaultValue={rest?.defaultValue}
                  onChangeText={(text) =>
                    transformFn ? onChange(transformFn(text)) : onChange(text)
                  }
                  value={value}
                  secureTextEntry={secureTextEntry}
                />
              );
            }}
          />
        ) : (
          <TextInput
            {...rest}
            ref={inputRef}
            style={[styles.input, rest.style, error && styles.inputError]}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={placeholderTextColor || "#9CA3AF"}
          />
        )}

        {rightIcon && (
          <View
            style={{
              ...styles.iconContainer,
              alignItems: "center",
              justifyContent: "center",
              right: 24,
            }}
          >
            {rightIcon}
          </View>
        )}
      </View>
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  containerError: {
    borderColor: "red",
  },
  label: {
    marginBottom: 5,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    color: "#030309",
    fontFamily: "gMedium",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 0,
    marginBottom: 5,
    borderColor: "#F5F5F5",
    paddingVertical: 2,
    alignItems: "center",
    color: "#57575B",
    height: 45,
  },
  iconContainer: {
    paddingHorizontal: 5,
  },
  input: {
    paddingVertical: 8,
    fontSize: 16,
    width: "90%",
    height: "100%",
    color: "#010E0E",
    fontWeight: "400",
    // fontFamily: "gRegular",
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    marginTop: 5,
    color: "red",
  },
  underline: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
});

export default CustomInput;
