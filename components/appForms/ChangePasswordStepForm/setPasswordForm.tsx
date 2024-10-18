import {
  PasswordResetRequest,
} from "@/types/api/PasswordReset";
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import z, { set } from "zod";
import { FormTextInput } from "../../forms/FormTextInput";
import { Button, ButtonText } from "../../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import AuthController from "@/api/controllers/AuthController";
import myToast from "../../toast";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

interface SetPasswordProps {
  setTab: (tab: 0 | 1) => void;
  fullForm: UseFormReturn<PasswordResetRequest>;
}

const setPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export function SetPasswordForm({ setTab, fullForm }: SetPasswordProps) {
  const form = useForm<z.infer<typeof setPasswordFormSchema>>({
    resolver: zodResolver(setPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const sendResetMutation = useMutation({
    mutationFn: AuthController.resetPassword,
    onError: (error) => {
      myToast(false, error.message);
      setTab(0);
    },
    onSuccess: () => {
      myToast(true, "Inicia sesión con tu nueva contraseña");
      router.push("/");
    },
  });

  const onSubmit = (data: z.infer<typeof setPasswordFormSchema>) => {
    fullForm.setValue("password", form.getValues("password"));
    sendResetMutation.mutate({
      code: fullForm.getValues("code"),
      password: data.password,
    });
  };

  return (
    <Animated.View className="w-full p-4 flex flex-col gap-4"
    entering={SlideInRight}
    exiting={SlideOutLeft}
    layout={LinearTransition}
    >
      <FormTextInput
        name="password"
        control={form.control}
        label="Contraseña"
        placeholder=""
        error={form.formState.errors.password}
        className="focus:border-bitpurple-600 !text-white"
        size="xl"
        type="password"
      />

      <FormTextInput
        name="confirmPassword"
        control={form.control}
        label="Confirmar contraseña"
        error={form.formState.errors.confirmPassword}
        className="focus:border-bitpurple-600 !text-white"
        size="xl"
        type="password"
      />

      <Animated.View layout={LinearTransition}>
        <Button
          onPress={form.handleSubmit(onSubmit)}
          action="primary"
          size="xl"
        >
          {sendResetMutation.isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ButtonText>Cambiar contraseña</ButtonText>
          )}
        </Button>
      </Animated.View>
    </Animated.View>
  );
}
