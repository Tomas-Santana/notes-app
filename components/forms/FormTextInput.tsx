import { Input, InputField } from "../ui/input";
import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";
import Animated, { LinearTransition } from "react-native-reanimated";
import { FormLabel } from "./FormLabel";
import { FormError } from "./FormError";

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
          <Input className={className} size={size}>
            <InputField
              className={fieldClassName}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={type === "password"}
            />
          </Input>
        )}
      />
      <FormError error={error} />
    </Animated.View>
  );
}
