import { Input, InputField } from "../ui/input";
import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";
import Animated, { LinearTransition } from "react-native-reanimated";
import { FormLabel } from "./FormLabel";
import { FormError } from "./FormError";
import { StyleProp, StyleSheet } from "react-native";
import { ViewStyle } from "@expo/html-elements/build/primitives/View";
import { TextInput } from "react-native-gesture-handler";
import { Ref } from "react";
import { AppStyles } from "@/constants/AppStyles";

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
  
}: FormTextInputProps) {
  return (
    <Animated.View layout={LinearTransition} className={"flex flex-col gap-2"}>
      {label && <FormLabel label={label} />}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input className={className + "text-white"} size={size}>
            <InputField
              className={fieldClassName + "text-white"}
              placeholder={placeholder}
              placeholderTextColor={AppStyles.colors.placeholder.DEFAULT}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={type === "password"}
              maxLength={100}
            />
          </Input>
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
