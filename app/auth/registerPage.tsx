import { Image, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { useFonts } from "expo-font";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Link, router } from "expo-router";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { toast } from "sonner-native";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Se debe ingresar un email.")
    .max(25, "El email es muy largo.")
    .email("Email invalido."),

  name: z.string().min(1, "Se debe ingresar un nombre."),

  lastName: z.string().min(1, "Se debe ingresar un apellido."),

  password: z
    .string()
    .min(1, "Se debe ingresar una contraseña.")
    .max(50, "La contraseña es muy larga."),

  confirmPassword: z
    .string()
    .min(1, "Se debe ingresar la contraseña nuevamente.")
    .max(50, "La contraseña es muy larga."),
});

const registerPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const fontLoaded = useFonts({
    monospace: require("../../assets/fonts/FiraMono-Medium.ttf"),
  });

  if (!fontLoaded) {
    console.log("Font loading failed");
  }

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.success("Has creado una cuenta!");
    alert(JSON.stringify(data));
    router.push("/start/notesPage");
  };
  return (
    <View className="flex-1 justify-center items-center gap-5 bg-eerie">
      <View>
        <Image
          source={require("../../assets/images/Logo V2.png")}
          className="bottom-1/2
          "
        />
      </View>
      <View>
        <Heading size="lg" className="text-center text-slate-50 font-mono">
          Crea una cuenta
        </Heading>
      </View>
      <FormControl className="top-10">
        <FormControlLabel>
          <FormControlLabelText className="font-mono text-gray-400">
            Email
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={form.control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="w-inp focus:border-purplee-60 mb-6"
              size="md"
              variant="rounded"
            >
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
          <FormControlErrorText className="font-mono bottom-4">
            {form.formState.errors.email.message}
          </FormControlErrorText>
        )}
        <FormControlLabel>
          <FormControlLabelText className="font-mono text-gray-400">
            Nombre
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={form.control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="w-inp focus:border-purplee-60 mb-6"
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
        {form.formState.errors.name && (
          <FormControlErrorText className="font-mono bottom-4">
            {form.formState.errors.name.message}
          </FormControlErrorText>
        )}
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
              className="w-inp focus:border-purplee-60 mb-6"
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
          <FormControlErrorText className="font-mono bottom-4">
            {form.formState.errors.lastName.message}
          </FormControlErrorText>
        )}
        <FormControlLabel>
          <FormControlLabelText className="font-mono text-gray-400">
            Contraseña
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={form.control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="w-inp focus:border-purplee-60 mb-7"
              size="md"
              variant="rounded"
            >
              <InputField
                className="text-slate-50"
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
          <FormControlErrorText className="font-mono bottom-5">
            {form.formState.errors.password.message}
          </FormControlErrorText>
        )}
        <FormControlLabel>
          <FormControlLabelText className="font-mono text-gray-400">
            Confirmar contraseña
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="w-inp focus:border-purplee-60 mb-7"
              size="md"
              variant="rounded"
            >
              <InputField
                className="text-slate-50"
                placeholder="Contraseña"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                maxLength={50}
              />
            </Input>
          )}
        />
        {form.formState.errors.confirmPassword && (
          <FormControlErrorText className="font-mono bottom-5">
            {form.formState.errors.confirmPassword.message}
          </FormControlErrorText>
        )}
      </FormControl>
      <Button
        className="bg-purplee-50 top-10 w-inp"
        onPress={form.handleSubmit(onSubmit)}
      >
        <ButtonText className="font-mono">Registrar</ButtonText>
      </Button>
      <View className="flex-row justify-between items-center gap-2 top-10">
        <Text className="text-gray-400">Ya tienes una cuenta?</Text>
        <Text
          className="font-mono text-purplee-50"
          onPress={() => {
            router.back();
          }}
        >
          Inicia Sesion
        </Text>
      </View>
    </View>
  );
};

export default registerPage;
