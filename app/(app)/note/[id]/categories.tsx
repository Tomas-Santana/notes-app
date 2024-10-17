import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { SheetManager } from "react-native-actions-sheet";
import { useCategories } from "@/hooks/app/useCategoryFilter";
import { ScrollView } from "react-native";
import { CategorySelect } from "@/components/app/categorySelect";
import { Plus } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { TouchableOpacity } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useState } from "react";
import { useAtom } from "jotai";
import { currentNoteAtom } from "@/utils/atoms/currentNoteAtom";
import { Category } from "@/types/Category";

export default function Categories() {
  const categories = useCategories();
  const [note, setNote] = useAtom(currentNoteAtom)

  const handleCategoryChange = (categoryAdded: Category, selected: boolean) => {
    const updatedCategories = selected
    ? [...(note?.categories || []), categoryAdded] : (note?.categories || []).filter((category) => category._id !== categoryAdded._id)

    if (note) {
      setNote({
        ...note,
        categories: updatedCategories,
      });
    }

    console.log(note?.categories);
    
  }

  return (
    <View className="flex-1 flex items-center flex-col gap-4 mt-10 p-4">
      <View className="w-full">
        <Heading size="3xl" className="text-white font-mono">
          Categorias
        </Heading>
      </View>

      <ScrollView className="w-full">
        <Animated.View
          layout={LinearTransition}
          entering={FadeIn}
          exiting={FadeOut}
          className="flex-1 flex-col gap-4 py-4"
        >
          {categories.data?.categories &&
            categories.data?.categories.map((category) => (
              <CategorySelect category={category} key={category._id} selected={note?.categories?.includes(category) || false} onCategoryChange={handleCategoryChange}/>
            ))
          }
          <Animated.View
            layout={LinearTransition}
          >
            <TouchableOpacity className="w-full h-20 px-8 flex flex-col justify-center text-white bg-[#303030] rounded-md"
              onPress={() => SheetManager.show("createCategory")}
            >
              <View className="w-full flex flex-col items-center justify-center">
                <Icon as={Plus} className="mt-2 text-bitpurple-600 w-8 h-8" />
                <Text className="text-lg ">Nueva categoría</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  )
}