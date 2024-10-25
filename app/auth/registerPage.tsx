import { View } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "@/components/utils/SafeAreaView";
import { Heading } from "@/components/ui/heading";
import Logo from "../../assets/images/logo.svg";
import RegisterForm from "@/components/appForms/RegisterStepForm/registerForm";
import { Bg } from "@/components/new/Bg";

const RegisterPage = () => {
  const fontLoaded = useFonts({
    monospace: require("../../assets/fonts/FiraMono-Medium.ttf"),
  });

  if (!fontLoaded) {
    console.log("Font loading failed");
  }
  return (
    <SafeAreaView className="flex-1 flex-col justify-start items-center gap-4 ">
      <View className="p-4 pt-20 flex-1 flex-col gap-4 w-full items-center">

        <Logo className="h-24"></Logo>
        <Heading size="lg" className="text-center text-slate-50 font-mono">
          Crea una cuenta
        </Heading>
          <RegisterForm />
      </View>
      <Bg />

    </SafeAreaView>
  );
};

export default RegisterPage;
