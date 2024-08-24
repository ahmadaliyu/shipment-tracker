import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import Header from "@/components/Header";
import AppIcons from "@/images/icons/icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import { useTheme } from "react-native-paper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useLoginMutation } from "@/service/auth";
import { useAppDispatch } from "@/store/hooks";

// for validation
const schema = yup.object().shape({
  url: yup.string().optional(),
  usernameOrEmail: yup.string().required("Email or username is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

type FormInput = {
  url: string;
  emailOrUsername: string;
  password: string;
};

export default function Login() {
  const defaultValues = {
    url: "",
    emailOrUsername: "",
    password: "",
  } as FormInput;

  const {
    control,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const navigation = useNavigation();

  const [login, { isLoading, error }] = useLoginMutation();

  //useful to disable button when there is no input
  const [inputValues, setInputValue] = useState({
    usrOrEmail: "",
    password: "",
  });

  // navigate back to main screen
  const handleCancel = () => {
    navigation.goBack();
  };

  // function to login the user
  const handleLogin = async () => {
    const formdata = new FormData();

    formdata.append("usr", inputValues.usrOrEmail || "");
    formdata.append("pwd", inputValues.password || "");

    try {
      await login({ formdata }).unwrap();
      reset();
    } catch (error: any) {
      if (error?.status === 401)
        Alert.alert(`Error!", "Invalid Login credentials, test with
      usr: test@brandimic.com
      pwd: testy123@    `);
      else Alert.alert("Error!");
    }
  };
  const theme = useTheme();
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.secondary }}
    >
      <Header
        left={
          <Pressable onPress={handleCancel} style={styles.iconCon}>
            <AppIcons name="chevron-back" />
            <Text style={{ ...styles.text, color: theme.colors.onPrimary }}>
              Cancel
            </Text>
          </Pressable>
        }
      />
      <View style={styles.con}>
        <Text style={styles.loginText}>Login</Text>
        <Text style={{ ...styles.text2, color: theme.colors.tertiary }}>
          Please enter your First, Last name and your phone number in order to
          register
        </Text>

        <Controller
          control={control}
          name="url"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              outerContainerStyle={styles.inputCon}
              placeholder="URL"
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="emailOrUsername"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              outerContainerStyle={styles.inputCon}
              error={errors?.emailOrUsername}
              placeholder="Username / Email"
              value={value}
              onChangeText={(text) => {
                onChange(text);
                setInputValue({
                  ...inputValues,
                  usrOrEmail: text,
                });
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              outerContainerStyle={styles.inputCon}
              password
              error={errors?.password}
              placeholder="Password"
              value={value}
              onChangeText={(text) => {
                onChange(text);
                setInputValue({
                  ...inputValues,
                  password: text,
                });
              }}
            />
          )}
        />
      </View>
      <Button
        onPress={() => handleLogin()}
        disabled={isLoading || !inputValues.usrOrEmail || !inputValues.password}
        title="Login"
        processing={isLoading}
        processingColor={theme.colors.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    padding: 24,
  },
  iconCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 17,
  },
  text2: {
    lineHeight: 24,
    marginTop: 8,
  },
  con: { flex: 1 },
  loginText: {
    fontFamily: "interBold",
    fontSize: 34,
  },
  inputCon: {
    marginVertical: 16,
  },
});
