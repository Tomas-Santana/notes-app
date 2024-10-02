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

const formSchema = z.object({
  email: z.string().min(1, "El email es requerido").max(35).email(),
});

const forgotPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
          Recuperacion de contraseña
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
      </FormControl>
      <Button
        className="bg-purplee-50 top-10 w-inp"
        onPress={form.handleSubmit(onSubmit)}
      >
        <ButtonText className="font-mono">Enviar</ButtonText>
      </Button>
      {/* <View className="flex-row justify-between items-center gap-2 top-10">
        <Text className="text-gray-400">Tambien puedes</Text>
        <Link href={"/auth/registerPage"}>
          <Text className="font-mono text-purplee-50">Regístrarte</Text>
        </Link>
      </View> */}
    </View>
  );
};

export default forgotPage;
