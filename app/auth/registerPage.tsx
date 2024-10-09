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
import { SafeAreaView } from "@/components/utils/SafeAreaView";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Link, router, useRouter } from "expo-router";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import AuthController from "@/api/controllers/AuthController";
import { useMutation } from "@tanstack/react-query";
import myToast from "@/components/toast";
import Logo from "../../assets/images/logo.svg";
import RegisterForm from "@/components/appForms/RegisterStepForm/registerForm";



const formSchema = z.object({

    firstName: z.string().min(1, "Se debe ingresar un nombre."),

  lastName: z.string().min(1, "Se debe ingresar un apellido."),
});

const RegisterPage = () => {
  const fontLoaded = useFonts({
    monospace: require("../../assets/fonts/FiraMono-Medium.ttf"),
  });

  if (!fontLoaded) {
    console.log("Font loading failed");
  }
  return (
    <SafeAreaView className="flex-1 flex-col justify-start items-center gap-4 bg-eerie">
      <Logo className="h-24"></Logo>
      <Heading size="lg" className="text-center text-slate-50 font-mono">
        Crea una cuenta
      </Heading>
      <RegisterForm />

    </SafeAreaView>
  );
};

export default RegisterPage;


// Old

      {/* <View className="flex flex-col gap-4">
        
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
              <Input
                className="w-inp focus:border-bitpurple-600"
                size="md"
                variant="rounded"
              >
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
            <FormControlErrorText className="font-mono max-w-full">
              {form.formState.errors.firstName.message}
            </FormControlErrorText>
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
              <Input
                className="w-inp focus:border-bitpurple-600"
                size="md"
                variant="rounded"
              >
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
            <FormControlErrorText className="font-mono max-w-full">
              {form.formState.errors.lastName.message}
            </FormControlErrorText>
          )}
        </FormControl>
      </View>
      <Button
        action="primary"
        className=""
        onPress={form.handleSubmit(onSubmit)}
      >
        <ButtonText className="font-mono">Siguiente</ButtonText>
      </Button>
      <View className="flex-row justify-between items-center gap-2 ">
        <Text className="">Ya tienes una cuenta?</Text>
        <Link className="font-mono text-bitpurple-500" href={"/"}>
          Inicia Sesion
        </Link>
      </View> */}
