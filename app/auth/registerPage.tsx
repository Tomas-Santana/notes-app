import { Image, LayoutAnimation, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { useFonts } from "expo-font";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import myToast from "@/components/toast";
import AuthController from "@/api/controllers/AuthController";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react-native";
import Logo from "@/assets/images/logo.svg";
import { KeyboardAvoidingView, Platform } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { SequencedTransition } from "react-native-reanimated";
import React from "react";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "Se debe ingresar un email.")
      .max(25, "El email es muy largo.")
      .email("Email invalido.")
      .toLowerCase(),

    firstName: z.string().min(1, "Se debe ingresar un nombre."),

    lastName: z.string().min(1, "Se debe ingresar un apellido."),

    password: z
      .string()
      .min(8, "Se debe ingresar una contraseña.")
      .max(50, "La contraseña es muy larga."),
    // })
    // TODO: descubir por que el ultimo input se daña
    confirmPassword: z
      .string()
      .min(1, "Ingresa la contraseña de nuevo.")
      .max(50, "La contraseña es muy larga."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fontLoaded = useFonts({
    monospace: require("../../assets/fonts/FiraMono-Medium.ttf"),
  });

  if (!fontLoaded) {
    console.log("Font loading failed");
  }

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
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    registerMutation.mutate(data);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Animated.View
        layout={LinearTransition}
        className="flex-1 flex-col justify-center items-center gap-4 bg-eerie p-4"
      >
        <Animated.View layout={LinearTransition}>
          <Logo className="w-40" />
        </Animated.View>
        <Animated.View layout={LinearTransition}>
          <Heading size="lg" className="text-center text-slate-50 font-mono">
            Crea una cuenta
          </Heading>
        </Animated.View>
        <View className="flex flex-col gap-4">
          <FormControl>
            <Animated.View layout={LinearTransition}>
              <FormControlLabel>
                <FormControlLabelText className="font-mono text-gray-400">
                  Email
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={form.control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="focus:border-bitpurple-600 " size="md">
                    <InputField
                      className="text-slate-50"
                      placeholder="Email"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      maxLength={20}
                    />
                  </Input>
                )}
              />
            </Animated.View>
            {form.formState.errors.email && (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                layout={LinearTransition}
              >
                <FormControlErrorText className="font-mono max-w-full">
                  {form.formState.errors.email.message}
                </FormControlErrorText>
              </Animated.View>
            )}
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText className="font-mono text-gray-400">
                Nombre
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={form.control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-inp focus:border-bitpurple-600" size="lg">
                  <InputField
                    className="text-slate-50"
                    placeholder="Juan"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    maxLength={20}
                  />
                </Input>
              )}
            />
            {form.formState.errors.firstName && (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                layout={LinearTransition}
              >
                <FormControlErrorText className="font-mono max-w-full">
                  {form.formState.errors.firstName.message}
                </FormControlErrorText>
              </Animated.View>
            )}
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText className="font-mono text-gray-400">
                Apellido
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={form.control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-inp focus:border-bitpurple-600" size="lg">
                  <InputField
                    className="text-slate-50"
                    placeholder="Perez"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    maxLength={20}
                  />
                </Input>
              )}
            />
            {form.formState.errors.lastName && (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                layout={LinearTransition}
              >
                <FormControlErrorText className="font-mono max-w-full">
                  {form.formState.errors.lastName.message}
                </FormControlErrorText>
              </Animated.View>
            )}
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText className="font-mono text-gray-400">
                Contraseña
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={form.control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-inp focus:border-bitpurple-600" size="lg">
                  <InputField
                    className="text-slate-50"
                    type="password"
                    placeholder="Contraseña"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    maxLength={50}
                  />
                </Input>
              )}
            />
            {form.formState.errors.password && (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                layout={LinearTransition}
              >
                <FormControlErrorText className="font-mono max-w-full">
                  {form.formState.errors.password.message}
                </FormControlErrorText>
              </Animated.View>
            )}
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText className="font-mono text-gray-400">
                Confirmar contraseña
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-inp focus:border-bitpurple-600" size="md">
                  <InputField
                    className="text-slate-50"
                    placeholder="Contraseña"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    type="password"
                    maxLength={50}
                  />
                </Input>
              )}
            />
            <View>
              {form.formState.errors.confirmPassword && (
                <Animated.View
                  entering={FadeIn}
                  exiting={FadeOut}
                  layout={LinearTransition}
                >
                  <FormControlErrorText className="font-mono max-w-inp">
                    {form.formState.errors.confirmPassword.message}
                  </FormControlErrorText>
                </Animated.View>
              )}
            </View>
          </FormControl>
        </View>
        <Button
          action="primary"
          className="w-inp"
          onPress={form.handleSubmit(onSubmit)}
        >
          <ButtonText className="font-mono ">
            {registerMutation.isPending ? (
              <LoaderCircle className="w-6 h-6 animated-spin" />
            ) : (
              "Registrarse"
            )}
          </ButtonText>
        </Button>
        <View className="flex-row justify-between items-center gap-2 ">
          <Text className="">Ya tienes una cuenta?</Text>
          <Link className="font-mono text-bitpurple-500" href={"/"}>
            Inicia Sesion
          </Link>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default RegisterPage;
