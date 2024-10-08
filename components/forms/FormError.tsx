import type { FieldError } from "react-hook-form";
import { Text } from "../ui/text";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";


interface FormErrorProps {
    error?: FieldError;
}

export function FormError(
    {
        error
    }: FormErrorProps
) {
    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            layout={LinearTransition}
        >
            {error && <Text className="text-error-500 text-sm">
                {error.message}
            </Text>}
        </Animated.View>
    )
}