import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormTextInput } from "../../forms/FormTextInput";
import { Button, ButtonText } from "../../ui/button";
import Animated, {
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { EmailSchema, emailSchema, FullSchema } from "./schemas";
import { useMutation } from "@tanstack/react-query";
import AuthController from "@/api/controllers/AuthController";
import myToast from "@/components/toast";
import { ActivityIndicator } from "react-native";
import { Link } from "expo-router";

interface EmailFormProps {
  setTab: (tab: 0 | 1) => void;
  fullForm: UseFormReturn<FullSchema>;
}

export function EmailForm({ setTab, fullForm }: EmailFormProps) {
  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: fullForm.getValues("email").email,
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: AuthController.verifyEmailAvailability,
    onError: (_) => {
      myToast(false, "Error al verificar el email.");
    },
    onSuccess: (data) => {
      if (!data.available) {
        myToast(false, "El email ya está en uso.");
        return;
      }
      fullForm.setValue("email", { email: form.getValues("email") });
      setTab(1);
    },
  });

  function onSubmit(data: EmailSchema) {
    verifyEmailMutation.mutate(data);
  }

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      layout={LinearTransition}
      className={"w-full flex flex-col gap-4 p-8 bg-eerie2 shadow-md rounded-lg"}
    >
      <FormTextInput
        name="email"
        control={form.control}
        label="Email"
        placeholder="email@notebit.com"
        error={form.formState.errors.email}
        className="focus:border-hot-pink-600 !text-white"
        size="xl"
        glow
      />
      <Animated.View layout={LinearTransition}>
        <Button
          onPress={form.handleSubmit(onSubmit)}
          action="primary"
          size="xl"
          disabled={verifyEmailMutation.isPending}
        >
          {verifyEmailMutation.isPending ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <ButtonText>Siguiente</ButtonText>
          )}
        </Button>
      </Animated.View>
      <Animated.View layout={LinearTransition} className={"w-full flex items-end"}>
        <Link href="/" className="text-hot-pink-500 text-center">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </Animated.View>
    </Animated.View>
  );
}
