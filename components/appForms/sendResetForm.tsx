import Animated, { LinearTransition } from "react-native-reanimated";
import { Text } from "../ui/text";
import z from "zod";
import { FormTextInput } from "../forms/FormTextInput";
import { Button, ButtonText } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import AuthController from "@/api/controllers/AuthController";
import myToast from "../toast";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/AppStyles";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Se debe ingresar un email.")
    .max(50, "El email es muy largo.")
    .email("Email invalido.")
    .toLowerCase()
    .trim(),
});

export default function SendResetForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();

  const sendResetMutation = useMutation({
    mutationFn: AuthController.sendResetEmail,
    onError: (error) => {
      myToast(false, error.message);
    },
    onSuccess: () => {
      myToast(true, "Email enviado");
      router.push("/auth/forgotPage");
    },
  })

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    sendResetMutation.mutate(data);
  };

  return (
    <Animated.View className="w-full p-4 flex flex-col gap-4">
      <FormTextInput
        name="email"
        control={form.control}
        label="Email"
        placeholder="hola@notebit.com"
        error={form.formState.errors.email}
        className="focus:border-bitpurple-600 !text-white"
        size="xl"
      />

      <Animated.View
        layout={LinearTransition}
        className="w-full flex items-end border-bitpurple text-bitpurple-600"
      ></Animated.View>
      <Animated.View layout={LinearTransition}>
        <Button
          onPress={form.handleSubmit(onSubmit)}
          action="primary"
          size="xl"
        >
          {false ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ButtonText>
                Enviar email de recuperación
            </ButtonText>
          )}
        </Button>
      </Animated.View>
      <Animated.View
        layout={LinearTransition}
        className="w-full flex items-end border-bitpurple text-bitpurple-600"
      >
        <Text>
          Si recuerdas tu contraseña,{" "}
          <Link href={"/"} className="text-center text-bitpurple-600">
            inicia sesión.
          </Link>
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const TextInputStyles = StyleSheet.create({
  focusInput: {
    borderColor: AppStyles.colors.bitpurple[600],
  },
});
