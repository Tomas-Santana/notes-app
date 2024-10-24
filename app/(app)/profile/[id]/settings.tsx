import AuthController from "@/api/controllers/AuthController";
import { SettingsAction } from "@/components/app/settingsActions";
import { Avatar } from "@/components/ui/avatar";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { userAtom } from "@/utils/atoms/userAtom";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { User } from "lucide-react-native";
import { Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

export default function Settings() {

  const [currentUser] = useAtom(userAtom)
  const queryClient = useQueryClient();


  const onEditProfile = () => {
    console.log(`El usuario: ${currentUser?.firstName} ${currentUser?.lastName} se ha editado`);
    SheetManager.show("updateUser")
  }

  const onLogout = async () => {
    queryClient.clear()
    await AuthController.logout()
    router.push("/")
  }

  return (
    <View className="flex-1 flex items-center flex-col gap-4 mt-10 p-4">
      <View className="w-full mt-10">
        <Heading size="3xl" className="text-center text-white font-mono">
          Tu Perfil
        </Heading>
      </View>
      <View className="flex items-center flex-col gap-6 mt-6">
        <Avatar
          size="xl"
          className="border-2 border-bitpurple-600 bg-bitpurple-200"
        >
          <Icon as={User} className="text-bitpurple-600 w-16 h-16" />
        </Avatar>
        <Text className="text-2xl text-white font-bold">{`${currentUser?.firstName} ${currentUser?.lastName}`}</Text>
        <Text className="text-sm text-white">{currentUser?.email}</Text>
      </View>
      <Animated.View entering={FadeIn} layout={LinearTransition} className="flex flex-col w-full px-4 mt-6 ">
        <SettingsAction onLogOut={onLogout} onEditProfile={onEditProfile} />
      </Animated.View>
    </View>
  )
}