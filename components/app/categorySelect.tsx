import { Pressable, TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";
import type { Category } from "@/types/Category";
import { useState } from "react";
import { CheckIcon } from "../ui/icon";
import { Check, CheckCircleIcon, CircleCheck } from "lucide-react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface CategorySelectProps {
  category: Category;
  selected: boolean;
  onCategoryChange: (categoryAdded: Category, selected: boolean) => void;
}

export function CategorySelect({
  category,
  selected,
  onCategoryChange,
}: CategorySelectProps) {
  const onSelected = () => {
    onCategoryChange(category, !selected);
  };

  return (
    <TouchableOpacity
      className="w-full h-16 px-8 flex flex-col justify-center text-white bg-[#303030] rounded-md"
      onPress={onSelected}
    >
      <View className="w-full flex flex-row justify-between">
        <Text className="text-lg font-bold">{category.name}</Text>
        {selected && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <CircleCheck size={20} color={"#8732C8"} />
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
}