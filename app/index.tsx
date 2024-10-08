import { View } from "react-native";
import { useFonts } from "expo-font";
import { Heading } from "@/components/ui/heading";
import Logo from "@/assets/images/logo.svg";
import { SafeAreaView } from "@/components/utils/SafeAreaView";
import LoginForm from "@/components/appForms/loginForm";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import { useEffect } from "react";
import { useRouter } from "expo-router";


export default function Screen() {
  const fontLoaded = useFonts({
    monospace: require("../assets/fonts/FiraMono-Medium.ttf"),
  });

  const user = useAtomValue(userAtom);
  const router = useRouter();
  // useEffect(() => {
  //   console.log("user", user);
  //   if (user) {
  //     router.push("/notes");
  //   }
  // }, [user]);

  if (!fontLoaded) {
    console.log("Font loading failed");
  }
  return (
    <SafeAreaView className="flex-1 justify-start bg-eerie"
    >
      <View
        className="flex flex-col gap-4 w-full items-center pt-20"
      >

        <Logo className=" h-24"></Logo>
        <Heading size="lg" className="text-center text-slate-50 font-mono">
          Inicia sesión
        </Heading>
        <LoginForm />
      </View>

    </SafeAreaView>
  );
}
