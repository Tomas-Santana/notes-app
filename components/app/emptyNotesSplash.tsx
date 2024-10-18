import { Icon } from "../ui/icon";
import { NotebookPen } from "lucide-react-native";
import { Text, View } from "react-native";

export function EmptyNotesSplash() {
  return (  
    <View className="flex flex-1 flex-col items-center justify-center gap-4 mt-20">
      <Icon as={NotebookPen} size="lg" className="text-gray-500 w-12 h-12"/>
      <View className="flex flex-col items-center justify-center">
        <Text className="text-lg text-gray-500">No hay notas creadas.</Text>
        <Text className="text-sm text-gray-500">Agrega una nueva con el botón +</Text>
      </View>
    </View>
  )
}