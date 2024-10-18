import AuthController from "@/api/controllers/AuthController";
import UserController from "@/api/controllers/UserController";
import { SettingsAction } from "@/components/app/settingsActions";
import { Avatar } from "@/components/ui/avatar";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { userAtom } from "@/utils/atoms/userAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { LogOut, SquarePen, User, UserRoundX } from "lucide-react-native";
import { Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

export default function Settings() {

  const [currentUser] = useAtom(userAtom)
  const queryClient = useQueryClient()

  const deleteUserMutation = useMutation({
    mutationFn: UserController.DeleteUser,
    onSuccess: () => {
      console.log("El usuario ha sido eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["user", currentUser?._id] })
      router.push("/")
    },
    onError: (error) => {
      console.error("Error al eliminar el usuario: ", error.message);
    }
  })

  const deleteUser = () => {
    if(currentUser?._id) {
      deleteUserMutation.mutate({ _id: currentUser._id })
    }
  }

  const onEditProfile = () => {
    console.log(`El usuario: ${currentUser?.firstName} ${currentUser?.lastName} se ha editado`);
    SheetManager.show("updateUser")
  }

  const onLogout = () => {
    AuthController.logout()
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
      </View>
      <Animated.View entering={FadeIn} layout={LinearTransition} className="flex flex-col w-full px-4 mt-6 ">
        <SettingsAction onLogOut={onLogout} onEditProfile={onEditProfile} onDelete={deleteUser}/>
      </Animated.View>
    </View>
  )
}