import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../../forms/FormTextInput";
import { Button, ButtonText } from "../../ui/button";
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { PersonalInfoSchema, personalInfoSchema, FullSchema } from "./schemas";



interface PersonalInfoFormProps {
    setTab: (tab: 0 | 1 | 2) => void;
    fullForm: UseFormReturn<FullSchema>;
}

export function PersonalInfoForm(
    { setTab, fullForm }: PersonalInfoFormProps
) {
    const form = useForm<PersonalInfoSchema>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: fullForm.getValues("personalInfo").firstName,
            lastName: fullForm.getValues("personalInfo").lastName,
        },
    });

    function onSubmit(data: PersonalInfoSchema) {
        console.log(data);
        fullForm.setValue("personalInfo", data);
        setTab(2);
    }

    return (
        <Animated.View
            entering={SlideInRight}
            exiting={SlideOutLeft}
            layout={LinearTransition}
            className={"w-full flex flex-col gap-4"}
        >
            <FormTextInput
                name="firstName"
                control={form.control}
                label="Nombre"
                placeholder="Pepito"
                error={form.formState.errors.firstName}
                className="focus:border-bitpurple-600 !text-white"
                size="xl"
            />
            <FormTextInput
                name="lastName"
                control={form.control}
                label="Apellido"
                placeholder="Perez"
                error={form.formState.errors.lastName}
                className="focus:border-bitpurple-600 !text-white"
                size="xl"
            />


            <Animated.View
                layout={LinearTransition}
                
            >
                <Button onPress={form.handleSubmit(onSubmit)} action="primary" size="xl">
                    <ButtonText>Siguiente</ButtonText>
                </Button>
            </Animated.View>

            {/* go back (smaller ghost button inside animated view) */}
            <Animated.View
                layout={LinearTransition}
            >
                <Button onPress={() => setTab(0)} variant="link" size="sm">
                    <ButtonText>Volver</ButtonText>
                </Button>
            </Animated.View>

        </Animated.View>
    )
}


