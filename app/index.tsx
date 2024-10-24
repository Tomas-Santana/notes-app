import { View, Image } from "react-native";
import { useFonts } from "expo-font";
import { Heading } from "@/components/ui/heading";
import Logo from "@/assets/images/logo.svg";
import { SafeAreaView } from "@/components/utils/SafeAreaView";
import LoginForm from "@/components/appForms/loginForm";
import CircleBgSvg from "@/assets/images/circle_bg.svg";
import AnimatedBG from "@/components/app/animatedbg";

const Gradient = require("../assets/images/gradient_bg.png");
export default function Screen() {
  const fontLoaded = useFonts({
    monospace: require("../assets/fonts/FiraMono-Medium.ttf"),
    pixel: require("../assets/fonts/PixelifySans-VariableFont_wght.ttf"),
  });


  if (!fontLoaded) {
    console.log("Font loading failed");
  }


  return (
    <SafeAreaView className="flex-1 justify-start"
    >
      <View
        className="flex flex-col gap-4 w-full items-center  p-4 pt-20"
      >

        <Logo className=" h-24"></Logo>
        <Heading size="lg" className="text-center text-slate-50 font-pixel text-lg">
          Inicia sesión
        </Heading>
        <View className="p-4 rounded-lg bg-eerie shadow-md w-full">

          <LoginForm />
        </View>
        
      </View>
      <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: -1,
                }}
              >
                <AnimatedBG
                  viewStyles={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                  }}
                ></AnimatedBG>
                {/* <Image
                  source={Gradient}
                  style={{
                    flex: 1,
                    resizeMode: "repeat",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                  }}
                /> */}


                <CircleBgSvg
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2,
                  }}
                ></CircleBgSvg>
              </View>

    </SafeAreaView>
  );
}
