import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../../forms/FormTextInput";
import { Button, ButtonText } from "../../ui/button";
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { EmailSchema, emailSchema, FullSchema } from "./schemas";



interface EmailFormProps {
    setTab: (tab: 0 | 1) => void;
    fullForm: UseFormReturn<FullSchema>;
}

export function EmailForm(
    { setTab, fullForm }: EmailFormProps

) {
    const form = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: fullForm.getValues("email").email
        }
    });

    function onSubmit(data: EmailSchema) {
        fullForm.setValue("email", data);
        setTab(1);
    }

    return (
        <Animated.View
            entering={SlideInRight}
            exiting={SlideOutLeft}
            layout={LinearTransition}
            className={"w-full flex flex-col gap-4"}
        >
            <FormTextInput
                name="email"
                control={form.control}
                label="Email"
                placeholder="email@notebit.com"
                error={form.formState.errors.email}
                className="focus:border-bitpurple-600"
                size="xl"
            />
            <Animated.View
                layout={LinearTransition}
                
            >
                <Button onPress={form.handleSubmit(onSubmit)} action="primary" size="xl">
                    <ButtonText>Siguiente</ButtonText>
                </Button>
            </Animated.View>
        </Animated.View>
    )
}


