import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../ui/icon";
import { LogOut, SquarePen, UserRoundX } from "lucide-react-native";
import { SheetManager } from "react-native-actions-sheet";
import { AppStyles } from "@/constants/AppStyles";

interface settingsActionsProps {
  onLogOut: () => void;
  onEditProfile: () => void;
}

export function SettingsAction({
  onLogOut,
  onEditProfile,
}: settingsActionsProps) {

  const actions = [
    {
      text: "Editar Perfil",
      icon: SquarePen,
      color: "hot-pink-500",
      action: onEditProfile
    }, 
    {
      text: "Cerrar Sesión",
      icon: LogOut,
      color: "red-500",
      action: onLogOut
    },
    {
      text: "Eliminar Cuenta",
      icon: UserRoundX,
      color: "red-500",
      action: () => {
        SheetManager.show("deleteUser");
      }
    }
  ]

  return (
    <View className="w-full flex flex-col rounded-lg overflow-hidden"
      style={{backgroundColor: AppStyles.colors.background.lighterTransparent}}
    >


      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          className="w-full h-20 px-8 flex flex-row justify-start items-center"
          onPress={action.action}
        >
          <Icon
            as={action.icon}
            size="md"
            className={`w-8 h-8 text-${action.color}`}
          />
          <Text className={`text-${action.color} text-lg font-bold ml-4`}>
            {action.text}
          </Text>
        </TouchableOpacity>
      ))}
      
    </View>
  );
}
