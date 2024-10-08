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
}

export function FormTextInput({
    className,
    fieldClassName,
    placeholder,
    label,
    name,
    control,
    type = "text",
    error
}: FormTextInputProps) {
    return (
        <Animated.View
            layout={LinearTransition}
        >
            {label && <FormLabel label={label} />}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <InputField
                        className={fieldClassName}
                        placeholder={placeholder}
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        secureTextEntry={type === "password"}
                    />
                )}
            />
            <FormError error={error} />
        </Animated.View>
    )
}