import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../ui/icon";
import { LogOut, SquarePen, UserRoundX } from "lucide-react-native";
import { SheetManager } from "react-native-actions-sheet";

interface settingsActionsProps {
  onLogOut: () => void;
  onEditProfile: () => void;
}

export function SettingsAction({
  onLogOut,
  onEditProfile,
}: settingsActionsProps) {
  return (
    <View className="w-full px-8 mt-6">
      <TouchableOpacity
        className="w-full h-16 px-8 flex flex-col justify-center bg-interactive-1 rounded-t-md"
        onPress={onEditProfile}
      >
        <View className="w-full flex flex-row justify-center items-center">
          <Icon
            as={SquarePen}
            size="md"
            className="w-8 h-8 text-bitpurple-500"
          />
          <Text className="text-bitpurple-500 text-lg font-bold ml-4">
            Editar Perfil
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onLogOut}
        className="w-full h-16 px-8 flex flex-col justify-center bg-interactive-1"
      >
        <View className="w-full flex flex-row justify-center items-center">
          <Icon as={LogOut} size="md" className="w-8 h-8 text-red-500" />
          <Text className="text-red-500 text-lg font-bold ml-4">
            Cerrar Sesión
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          SheetManager.show("deleteUser");
        }}
        className="w-full h-16 px-8 flex flex-col justify-center bg-interactive-1 rounded-b-md"
      >
        <View className="w-full flex flex-row justify-center items-center">
          <Icon as={UserRoundX} size="md" className="w-8 h-8 text-red-500" />
          <Text className="text-red-500 text-lg font-bold ml-4">
            Eliminar Cuenta
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
