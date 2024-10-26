import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { SheetManager } from "react-native-actions-sheet";
import { useCategories } from "@/hooks/app/useCategoryFilter";
import { ScrollView } from "react-native";
import { CategoryPreview } from "@/components/app/categoryPreview";
import { Plus } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { TouchableOpacity } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { selectedCategoryAtom } from "@/hooks/app/useCategoryFilter";
import { useSetAtom } from "jotai";
import { SimpleNavbar } from "@/components/app/noteNavbar";
import { Link } from "expo-router";
import { AppStyles } from "@/constants/AppStyles";

export default function Categories() {
  const categoryQuery = useCategories();

  return (
    <View className="flex-1 flex items-center flex-col gap-4 p-4 pt-0">
      <SimpleNavbar />

      <View className="w-full">
        <Heading size="3xl" className=" text-hot-pink-400 font-mono">
          Mis categorías
        </Heading>
      </View>

      {/* show categories */}
      <ScrollView className="w-full">
        <Animated.View
          layout={LinearTransition}
          entering={FadeIn}
          exiting={FadeOut}
          className="flex-1 flex-col gap-4 py-4"
        >
          {categoryQuery.data?.categories &&
            categoryQuery.data?.categories.map((category) => (
              <CategoryPreview category={category} key={category._id} />
            ))}
            <Animated.View
              layout={LinearTransition}>
          <TouchableOpacity
            className="w-full h-20 px-8 flex flex-col justify-center text-white rounded-md"
            onPress={() => SheetManager.show("createCategory")}
            style={{ backgroundColor: AppStyles.colors.background.lighterTransparent }}
          >
            <View
            className="w-full flex flex-col items-center justify-center">
              <Icon as={Plus} className="mt-2 text-hot-pink-500 w-8 h-8" />
              <Text className="text-lg ">Nueva categoría</Text>
            </View>
          </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
