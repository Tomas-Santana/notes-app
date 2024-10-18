import { Icon } from "../ui/icon";
import { Cat, Frown, NotebookPen } from "lucide-react-native";
import { Text, View } from "react-native";

export function EmptyCategories() {
  return (  
    <View className="flex flex-1 flex-col items-center justify-center gap-4 mt-20">
      <Icon as={Cat} size="lg" className="text-gray-500 w-12 h-12"/>
      <View className="flex flex-col items-center justify-center">
        <Text className="text-lg text-gray-500">Está vacío aquí.</Text>
      </View>
    </View>
  )
}