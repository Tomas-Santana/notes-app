import { Input, InputField } from "../ui/input";
import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { FormLabel } from "./FormLabel";
import { FormError } from "./FormError";
import { StyleProp, StyleSheet, Image, View } from "react-native";
import { ViewStyle } from "@expo/html-elements/build/primitives/View";
import { TextInput } from "react-native-gesture-handler";
import { Ref } from "react";
import { AppStyles } from "@/constants/AppStyles";
import React from "react";

const Gradient = require("../../assets/images/circle_bg.png");

interface FormTextInputProps {
  className?: string;
  fieldClassName?: string;
  placeholder?: string;
  label?: string;
  name: string;
  control: Control<any>;
  type?: "text" | "password";
  error?: FieldError;
  size?: "sm" | "md" | "lg" | "xl";
  styles?: StyleProp<ViewStyle>;
  inputRef?: Ref<TextInput>;
  autofocus?: boolean;
  glow?: boolean;
}

export function FormTextInput({
  className,
  fieldClassName,
  placeholder,
  label,
  name,
  control,
  type = "text",
  error,
  size = "md",
  glow = false,
}: FormTextInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(isFocused && glow ? 1 : 0),
    }),
    [isFocused, glow]
  );
  return (
    <Animated.View
      layout={LinearTransition}
      className={"flex flex-col gap-2"}
    >


      
      {label && <FormLabel label={label} />}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Animated.View
            className={"relative rounded-md"}
            style={{padding: 2}}
          >
          <Animated.Image
              src={"https://as1.ftcdn.net/v2/jpg/02/29/42/34/1000_F_229423447_pmfwB7qiLhgs3fcfufprb8nQ68lu5h7k.jpg"}
              style={[{
                flex: 1,
                resizeMode: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                borderRadius: 5,
              }, animatedStyle]}

             ></Animated.Image>
              
            <Input className={className + " text-white"} size={size}>
              <InputField
                className={fieldClassName + " text-white bg-eerie"}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                placeholderTextColor={AppStyles.colors.placeholder.DEFAULT}
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  setIsFocused(false);
                  onBlur();
                }}
                secureTextEntry={type === "password"}
                maxLength={100}
              />
            </Input>

          </Animated.View>
        )}
      />
      <FormError error={error} />
    </Animated.View>
  );
}

export function UnstyledFormTextInput({
  className,
  placeholder,
  label,
  name,
  control,
  type = "text",
  error,
  autofocus,
}: FormTextInputProps) {
  return (
    <Animated.View layout={LinearTransition} className={"flex flex-col gap-2"}>
      {label && <FormLabel label={label} />}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={className}
            placeholder={placeholder}
            placeholderTextColor={AppStyles.colors.placeholder.DEFAULT}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={type === "password"}
            autoFocus={autofocus}
            maxLength={100}
          />
        )}
      />
      <FormError error={error} />
    </Animated.View>
  );
}
