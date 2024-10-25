import { AppStyles } from "@/constants/AppStyles";
import { Icon } from "../ui/icon";
import { Cat, NotebookPen } from "lucide-react-native";
import { Text, View } from "react-native";
import Animated, { ZoomIn, ZoomOut} from "react-native-reanimated";

export function EmptyNotesSplash() {
  return (  
    <Animated.View className="flex flex-1 flex-col items-center justify-center gap-4 mt-8"
      entering={ZoomIn}
      exiting={ZoomOut}
    >
      <View 
        className="flex flex-col items-center justify-center gap-4 rounded-lg p-8 shadow-lg"
        style={{backgroundColor: AppStyles.colors.background.lighterTransparent}}
      >

        <Icon as={Cat} size="lg" className="text-gray-500 w-12 h-12"/>
        <View className="flex flex-col items-center justify-center">
          <Text className="text-lg text-gray-500">Está vacío aquí.</Text>
          <Text className="text-sm text-gray-500">Crea una nota presionando +</Text>
        </View>
      </View>
    </Animated.View>
  )
}