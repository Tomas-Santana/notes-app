import { View } from "react-native";
import { useFonts } from "expo-font";
import { Heading } from "@/components/ui/heading";
import Logo from "@/assets/images/logo.svg";
import { SafeAreaView } from "@/components/utils/SafeAreaView";
import LoginForm from "@/components/appForms/loginForm";
import { Bg } from "@/components/new/Bg";

const Gradient = require("../assets/images/gradient_bg.png");
export default function Screen() {
  const fontLoaded = useFonts({
    monospace: require("../assets/fonts/FiraMono-Medium.ttf"),
    pixelated: require("../assets/fonts/PixelifySans-VariableFont_wght.ttf"),
  });

  if (!fontLoaded) {
    console.log("Font loading failed");
  }

  return (
    <SafeAreaView className="flex-1 justify-start">
      <View className="flex flex-col gap-4 w-full items-center  p-4 pt-20">
        <Logo className=" h-24"></Logo>
        <Heading
          size="lg"
          className="text-center text-slate-50 font-pixel italic text-lg"
        >
          Inicia sesión
        </Heading>
        
        <View className="p-4 rounded-lg bg-eerie2 shadow-md w-full">
          <LoginForm />
        </View>
      </View>
      <Bg />
    </SafeAreaView>
  );
}
