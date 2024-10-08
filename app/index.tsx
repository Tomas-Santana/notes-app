import { View } from "react-native";
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
import { useEffect } from "react";
import { Link, router } from "expo-router";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import myToast from "@/components/toast";
import { useMutation } from "@tanstack/react-query";
import AuthController from "@/api/controllers/AuthController";
import Logo from "@/assets/images/logo.svg";
import { KeyboardAvoidingView } from "react-native";


const formSchema = z.object({
  email: z
    .string()
    .min(1, "Se debe ingresar un email.")
    .max(25, "El email es muy largo.")
    .email("Email invalido.").toLowerCase(),

  password: z
    .string()
    .min(1, "Se debe ingresar una contraseña.")
    .max(50, "La contraseña es muy larga."),
});

export default function Screen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const fontLoaded = useFonts({
    monospace: require("../assets/fonts/FiraMono-Medium.ttf"),
  });

  if (!fontLoaded) {
    console.log("Font loading failed");
  }
  const loginMutation = useMutation({
    mutationFn: AuthController.login,
    onError: (error) => {
      myToast(false, error.message);
    },
    onSuccess: (data) => {
      router.push("/notes");

    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    loginMutation.mutate(data);
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center gap-4 bg-eerie">
      <View
      >
        <Logo className="w-40" />
      </View>
      <View>
        <Heading size="lg" className="text-center text-slate-50 font-mono">
        Inicia sesión en tu cuenta
        </Heading>
      </View>
      <View className="flex flex-col gap-4">
        <FormControl>
        <FormControlLabel>
          <FormControlLabelText className="font-mono text-gray-400">
          Email
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={form.control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
          <Input className="w-inp focus:border-purplee-60" size="md">
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
        {form.formState.errors.email && (
          <FormControlErrorText className="font-mono max-w-full">
          {form.formState.errors.email.message}
          </FormControlErrorText>
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
          <Input className="w-inp focus:border-purplee-60" size="md">
            <InputField
            className="text-slate-50"
            placeholder="Contraseña"
            onChangeText={onChange}
            onBlur={onBlur}
            type="password"
            value={value}
            maxLength={50}
            />
          </Input>
          )}
        />
        {form.formState.errors.password && (
          <FormControlErrorText className="font-mono max-w-full">
          {form.formState.errors.password.message}
          </FormControlErrorText>
        )}
        </FormControl>
      </View>
      {/* <View>
        <Text
        size="sm"
        className="text-purplee-50 left-20"
        onPress={() => {
          router.push("/auth/forgotPage");
        }}
        >
        Olvidaste tu contraseña?
        </Text>
      </View> */}
      <Button
        className="bg-purplee-50 top-10 w-inp"
        onPress={form.handleSubmit(onSubmit)}
      >
        <ButtonText className="font-mono text-slate-50">
        Iniciar Sesion
        </ButtonText>
      </Button>
      <View className="flex-row justify-between items-center gap-2 top-10">
        <Text className="text-gray-400">Tambien puedes</Text>
        <Link href={"/auth/registerPage"}>
        <Text className="font-mono text-purplee-50">Registrarte</Text>
        </Link>
      </View>
      </View>
    </KeyboardAvoidingView>
  );
}
