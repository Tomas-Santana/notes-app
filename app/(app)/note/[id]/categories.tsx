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
import { useSaveNote } from "@/hooks/app/useSaveNote";
import { SimpleNavbar } from "@/components/app/noteNavbar";
import { AppStyles } from "@/constants/AppStyles";

export default function Categories() {
  const categories = useCategories();
  const [note, setNote] = useAtom(currentNoteAtom)
  const [localCategories, setLocalCategories] = useState(note.categories);
  const { saveNote } = useSaveNote(note, setNote);

  const handleCategoryChange = (categoryAdded: Category, selected: boolean) => {
    const updatedCategories = selected
      ? [...(localCategories || []), categoryAdded]
      : (localCategories || []).filter((category) => category._id !== categoryAdded._id);

    setLocalCategories(updatedCategories);
    setNote((prevNote) => ({
      ...prevNote,
      categories: updatedCategories,
    }));

    saveNote({
      _id: note._id,
      categories: updatedCategories,
    });
    
  }

  return (
    <View className="flex-1 flex items-center flex-col gap-4 p-4 pt-0">
      <SimpleNavbar />
      <View className="w-full">
        <Text size="xl" className="text-white">
          Administrar categorias:{"\n"}<Heading size="3xl" className="font-black font-mono italics text-hot-pink-300">{note.title}</Heading>
        </Text>
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
              <CategorySelect category={category} key={category._id} selected={(localCategories || []).some((cat) => cat._id === category._id) || false} onCategoryChange={handleCategoryChange}/>
            ))
          }
          <Animated.View
            layout={LinearTransition}
          >
            <TouchableOpacity className="w-full h-20 px-8 flex flex-col justify-center text-white rounded-md"
              onPress={() => SheetManager.show("createCategory")}
              style={{ backgroundColor: AppStyles.colors.background.lighterTransparent }}
            >
              <View className="w-full flex flex-col items-center justify-center">
                <Icon as={Plus} className="text-hot-pink-600 w-8 h-8" />
                <Text className="text-lg ">Nueva categoría</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  )
}