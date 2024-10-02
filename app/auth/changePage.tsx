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
  code: z.string().min(1, "Sin el codigo no puedes avanzar."),
  newPassword: z.string().min(1, "Este campo es necesario"),
  confirmPassword: z.string().min(1, "Este campo es necesario"),
});

const ResetPasswordPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      newPassword: "",
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
          Recuperar Contraseña
        </Heading>
      </View>
      <FormControl className="top-10">
        <FormControlLabel>
          <FormControlLabelText className="font-mono text-gray-400">
            Codigo de Verificacion
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={form.control}
          name="code"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="w-inp focus:border-purplee-60 mb-6"
              size="md"
              variant="rounded"
            >
              <InputField
                className="text-slate-50"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                maxLength={20}
              />
            </Input>
          )}
        />
        {form.formState.errors.code && (
          <FormControlErrorText className="font-mono bottom-4">
            {form.formState.errors.code.message}
          </FormControlErrorText>
        )}
        <FormControlLabel>
          <FormControlLabelText className="font-mono text-gray-400">
            Nueva Contraseña
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={form.control}
          name="newPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="w-inp focus:border-purplee-60 mb-6"
              size="md"
              variant="rounded"
            >
              <InputField
                className="text-slate-50"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                maxLength={20}
              />
            </Input>
          )}
        />
        {form.formState.errors.newPassword && (
          <FormControlErrorText className="font-mono bottom-4">
            {form.formState.errors.newPassword.message}
          </FormControlErrorText>
        )}
        <FormControlLabel>
          <FormControlLabelText className="font-mono text-gray-400">
            Repetir Contraseña
          </FormControlLabelText>
        </FormControlLabel>
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="w-inp focus:border-purplee-60 mb-6"
              size="md"
              variant="rounded"
            >
              <InputField
                className="text-slate-50"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                maxLength={20}
              />
            </Input>
          )}
        />
        {form.formState.errors.confirmPassword && (
          <FormControlErrorText className="font-mono bottom-4">
            {form.formState.errors.confirmPassword.message}
          </FormControlErrorText>
        )}
      </FormControl>
      <Button
        className="bg-purplee-50 top-24 w-inp"
        onPress={form.handleSubmit(onSubmit)}
      >
        <ButtonText className="font-mono">Recuperar Cuenta</ButtonText>
      </Button>
    </View>
  );
};

export default ResetPasswordPage;
