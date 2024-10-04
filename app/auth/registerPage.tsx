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
import myToast from "@/components/toast";

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
    alert(JSON.stringify(data));
    myToast(true, "Regristro exitoso!");
    router.push("/start/notesPage");
  };
  return (
    <View className="flex-1 flex-col gap-4 justify-center items-center gap-5 bg-eerie">
      <Image source={require("../../assets/images/Logo V2.png")} className="" />
      <Heading size="lg" className="text-center text-slate-50 font-mono">
        Crea una cuenta
      </Heading>
      <View></View>
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
              <Input
                className="w-inp focus:border-bitpurple-600 "
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
            <FormControlErrorText className="font-mono ">
              {form.formState.errors.email.message}
            </FormControlErrorText>
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
            name="name"
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
          {form.formState.errors.name && (
            <FormControlErrorText className="font-mono ">
              {form.formState.errors.name.message}
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
            <FormControlErrorText className="font-mono ">
              {form.formState.errors.lastName.message}
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
              <Input
          className="w-inp focus:border-bitpurple-600"
          size="md"
          variant="rounded"
              >
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
            <FormControlErrorText className="font-mono ">
              {form.formState.errors.password.message}
            </FormControlErrorText>
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
              <Input className="w-inp focus:p-60" size="md" variant="rounded">
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
            <FormControlErrorText className="font-mono ">
              {form.formState.errors.confirmPassword.message}
            </FormControlErrorText>
          )}
        </FormControl>
      </View>
      <Button
        action="primary"
        className=""
        onPress={form.handleSubmit(onSubmit)}
      >
        <ButtonText className="font-mono">Registrar</ButtonText>
      </Button>
      <View className="flex-row justify-between items-center gap-2 ">
        <Text className="">Ya tienes una cuenta?</Text>
        <Link
          className="font-mono text-bitpurple-500"
          href={"/"}
        >
          Inicia Sesion
        </Link>
      </View>
    </View>
  );
};

export default registerPage;
