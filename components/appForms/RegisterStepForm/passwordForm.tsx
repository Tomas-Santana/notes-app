import z, { set } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../../forms/FormTextInput";
import { Button, ButtonText } from "../../ui/button";
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { PasswordSchema, passwordSchema, FullSchema } from "./schemas";
import { useMutation } from "@tanstack/react-query";
import AuthController from "@/api/controllers/AuthController";
import myToast from "../../toast";
import { router, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { RegisterRequest } from "@/types/api/Register";



interface EmailFormProps {
    setTab: (tab: 0 | 1 | 2) => void;
    fullForm: UseFormReturn<FullSchema>;
}

export function PasswordForm(
    { setTab, fullForm }: EmailFormProps

) {
    const router = useRouter();
    const form = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: fullForm.getValues("password").password,
            confirmPassword: fullForm.getValues("password").confirmPassword
        }
    });

    const registerMutation = useMutation({
        mutationFn: AuthController.register,
        onError: (error) => {
          console.log(error);
          myToast(false, "Error al registrarse.");
        },
        onSuccess: () => {
          myToast(true, "Bienvenido a BitNotes.");
          router.push("/notes");
        },
      });

    function onSubmit(data: PasswordSchema) {
        fullForm.setValue("password", data);
        const formData = fullForm.getValues()
        const registerPayload: RegisterRequest = {
            email: formData.email.email,
            password: formData.password.password,
            firstName: formData.personalInfo.firstName,
            lastName: formData.personalInfo.lastName,
        }
        registerMutation.mutate(registerPayload);
    }

    return (
        <Animated.View
            entering={SlideInRight}
            exiting={SlideOutLeft}
            layout={LinearTransition}
            className={"w-full flex flex-col gap-4"}
        >
            <FormTextInput
                name="password"
                control={form.control}
                label="Contraseña"
                placeholder=""
                error={form.formState.errors.password}
                className="focus:border-bitpurple-600"
                size="xl"
                type="password"
            />
            <FormTextInput
                name="confirmPassword"
                control={form.control}
                label="Confirmar Contraseña"
                placeholder=""
                error={form.formState.errors.confirmPassword}
                className="focus:border-bitpurple-600"
                size="xl"
                type="password"
            />
            <Animated.View
                layout={LinearTransition}
                
            >
                <Button onPress={form.handleSubmit(onSubmit)} action="primary" size="xl">
                {registerMutation.isPending ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <ButtonText>Crear cuenta</ButtonText>
                    )}
                </Button>
            </Animated.View>
            <Animated.View
                layout={LinearTransition}
            >
                <Button onPress={() => setTab(1)} variant="link" size="sm">
                    <ButtonText>Volver</ButtonText>
                </Button>
            </Animated.View>
        </Animated.View>
    )
}


