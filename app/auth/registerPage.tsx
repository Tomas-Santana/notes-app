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

  name: z.string().min(1, "Se debe ingresar un nombre."),

  lastName: z.string().min(1, "Se debe ingresar un apellido."),
});

const registerPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
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
    <View className="flex-1 flex-col justify-center items-center gap-5 bg-eerie">
      <Image source={require("../../assets/images/Logo V2.png")} className="" />
      <Heading size="lg" className="text-center text-slate-50 font-mono">
        Crea una cuenta
      </Heading>
      <View></View>
      <View className="flex flex-col gap-4">
        
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
            <FormControlErrorText className="font-mono max-w-full">
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
      </View>
    </View>
  );
};

export default registerPage;
