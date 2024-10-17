import { View } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import Logo from "@/assets/images/logo.svg";
import { SafeAreaView } from "@/components/utils/SafeAreaView";
import LoginForm from "@/components/appForms/loginForm";
import SendResetForm from "@/components/appForms/sendResetForm";


export default function Screen() {

  return (
    <SafeAreaView className="flex-1 justify-start bg-eerie"
    >
      <View
        className="flex flex-col gap-4 w-full items-center pt-20"
      >

        <Logo className=" h-24"></Logo>
        <Heading size="lg" className="text-center text-slate-50 font-mono">
          Cambia tu contraseña
        </Heading>
        <Text className="text-left text-slate-50">
          Ingresa tu email y te enviaremos un link para cambiar tu contraseña.
        </Text>

        <SendResetForm />
        
      </View>

    </SafeAreaView>
  );
}
