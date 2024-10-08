import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormTextInput } from "../forms/FormTextInput";
import { Button } from "../ui/button";
import Animated, { LinearTransition } from "react-native-reanimated";


const emailSchema = z.object({
    email: z
      .string()
      .min(1, "Se debe ingresar un email.")
      .max(25, "El email es muy largo.")
      .email("Email invalido.")
      .toLowerCase(),
});


type EmailSchema = z.infer<typeof emailSchema>;


export function EmailForm() {
    const form = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema)
    });

    function onSubmit(data: EmailSchema) {
        console.log(data);
    }

    return (
        <Animated.View
            layout={LinearTransition}
        >
            <FormTextInput
                name="email"
                control={form.control}
                label="Email"
                placeholder="email@notebit.com"
                error={form.formState.errors.email}
            />
            <Button onPress={form.handleSubmit(onSubmit)}>Next</Button>
        </Animated.View>
    )
}


