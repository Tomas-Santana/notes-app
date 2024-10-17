import {
  PasswordResetRequest,
  VerifyCodeRequestSchema,
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
import { useEffect } from "react";

interface VerifyCodeFormProps {
  setTab: (tab: 0 | 1) => void;
  fullForm: UseFormReturn<PasswordResetRequest>;
}

export function VerifyCodeForm({ setTab, fullForm }: VerifyCodeFormProps) {
  const form = useForm<z.infer<typeof VerifyCodeRequestSchema>>({
    resolver: zodResolver(VerifyCodeRequestSchema),
    defaultValues: {
      code: "",
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: AuthController.verifyCode,
    onError: (error) => {
      myToast(false, error.message);
    },
    onSuccess: () => {
      fullForm.setValue("code", form.getValues("code"));
      setTab(1);
    },
  });

  const onSubmit = (data: z.infer<typeof VerifyCodeRequestSchema>) => {
    verifyCodeMutation.mutate(data);
  };


  return (
    <Animated.View className="w-full p-4 flex flex-col gap-4"
    entering={SlideInRight}
    exiting={SlideOutLeft}
    layout={LinearTransition}
    >
      <FormTextInput
        name="code"
        control={form.control}
        label="Código de recuperación"
        placeholder=""
        error={form.formState.errors.code}
        className="focus:border-bitpurple-600 !text-white"
        size="xl"
      />
      <Animated.View layout={LinearTransition}>
        <Button
          onPress={
            form.handleSubmit(onSubmit)
          }
          action="primary"
          size="xl"
        >
          {verifyCodeMutation.isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ButtonText>Siguiente</ButtonText>
          )}
        </Button>
      </Animated.View>
    </Animated.View>
  );
}
