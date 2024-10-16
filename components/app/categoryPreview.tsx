import { AnimatedSwipable } from "./animatedSwipable";
import { Trash } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";
import type { Category } from "@/types/Category";
import { useDeleteCategory } from "@/hooks/app/useDeleteCategory";

const renderRightActions = () => {
  return (
    <View className="w-full h-16 justify-center items-end bg-red-600 rounded-md">
      <Pressable className="">
        <Icon as={Trash} size="xl" className="mr-8" />
      </Pressable>
    </View>
  );
};

export function CategoryPreview({ category }: { category: Category }) {
  const deleteCategory = useDeleteCategory()
  const onOpen = (direction: "left" | "right") => {
    if (direction === "left") {
      console.log("left");
    } else if (direction === "right") {
      deleteCategory.mutate(category._id)
    }
  };
  return (
    <AnimatedSwipable onOpen={onOpen} renderRightActions={renderRightActions}>
        <Pressable className="w-full h-16 px-8 flex flex-col justify-center text-white bg-[#303030] rounded-md">
            <View className="w-full flex flex-row justify-between">
                <Text className="text-lg font-bold">{category.name}</Text>
            </View>
        </Pressable>
    </AnimatedSwipable>
  );
}
