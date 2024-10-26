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
import { SimpleNavbar } from "@/components/app/noteNavbar";
import AnimatedBG from "@/components/app/animatedbg";
import { AppStyles } from "@/constants/AppStyles";

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
    <View className="flex-1 flex items-center flex-col gap-4 p-4 pt-0">
      <SimpleNavbar />
      <View className="flex items-center flex-row gap-6 mt-6 p-4 rounded-lg"
        style={{ width: "100%", backgroundColor: AppStyles.colors.background.lighterTransparent }}
      >
        <Avatar
          className="border border-white bg-white"
          style={{ width: 80, height: 80, position: "relative", overflow: "hidden", backgroundColor: "#FFFFFF" }}
        >
          <AnimatedBG
            viewStyles={{ borderRadius: 40, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, opacity : 0.5 }}
            gradientHeight={80}
            gradientWidth={80}
            
          ></AnimatedBG>

          {/* add a semi transparent view rounded full  */}


          <View
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 40 }}
          ></View>

          <Icon as={User} className="text-white w-16 h-16"
            style={{ zIndex: 2 }}
          />
        </Avatar>
        <View>
          <Text className="text-2xl text-white font-bold flex-shrink" numberOfLines={1} ellipsizeMode="tail">{`${currentUser?.firstName} ${currentUser?.lastName}`}</Text>
          <Text className="text-sm text-white">{currentUser?.email}</Text>
        </View>
      </View>
      <Animated.View entering={FadeIn} layout={LinearTransition} className="flex flex-col w-full ">
        <SettingsAction onLogOut={onLogout} onEditProfile={onEditProfile} />
      </Animated.View>
    </View>
  )
}