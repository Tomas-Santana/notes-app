import Animated, { LinearTransition } from "react-native-reanimated";
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
import { ActivityIndicator } from "react-native";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Se debe ingresar un email.")
    .max(50, "El email es muy largo.")
    .email("Email invalido.")
    .toLowerCase().trim(),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(50, "La contraseña es muy larga."),
});

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: AuthController.login,
    onError: (error) => {
      myToast(false, error.message);
    },
    onSuccess: () => {
      router.push("/note");
    },
  });

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    loginMutation.mutate(data);
  };

  return (
    <Animated.View className="w-full p-4 flex flex-col gap-4">
      <FormTextInput
        name="email"
        control={form.control}
        label="Email"
        placeholder="hola@notebit.com"
        error={form.formState.errors.email}
        className="focus:border-bitpurple-600"
        size="xl"
      />



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

      <Animated.View
        layout={LinearTransition}
        className="w-full flex items-end border-bitpurple text-bitpurple-600"
      >
        <Link
          href={"/auth/changePage"}
          className="text-center text-bitpurple-600"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </Animated.View>

      <Animated.View layout={LinearTransition}>
        <Button
          onPress={form.handleSubmit(onSubmit)}
          action="primary"
          size="xl"
        >
          {loginMutation.isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ButtonText>Iniciar sesión

            </ButtonText>
          )}
        </Button>
      </Animated.View>
      <Animated.View
        layout={LinearTransition}
        className="w-full flex items-end border-bitpurple text-bitpurple-600"
      >
        <Link
          href={"/auth/registerPage"}
          className="text-center text-bitpurple-600"
        >
          ¿No tienes cuenta? Registrate
        </Link>
      </Animated.View>
    </Animated.View>
  );
}
