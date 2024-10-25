import { Pressable, TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";
import type { Category } from "@/types/Category";
import { useState } from "react";
import { CheckIcon } from "../ui/icon";
import { Check, CheckCircleIcon, CircleCheck } from "lucide-react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { StaticBG } from "./animatedbg";
import { Icon } from "../ui/icon";
import { AppStyles } from "@/constants/AppStyles";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

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
    <View className=""
      style={{padding: 4, position: "relative"}}
    >
      {
      selected &&
        <StaticBG
        viewStyles={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          borderRadius: 5,
        }}
      />}

      <TouchableOpacity
      className="w-full h-16 px-8 flex flex-col justify-center text-white rounded-md"
      onPress={onSelected}
      style={{ backgroundColor: AppStyles.colors.background.lighterTransparent }}

      >
      <View className="w-full flex flex-row justify-between items-center"
      >
        <Text className="text-lg font-bold">{category.name}</Text>
        {selected && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Icon as={CircleCheck} className="text-hot-pink-500 w-6 h-6" />
          
        </Animated.View>
        )}
      </View>
      </TouchableOpacity>
    </View>
  );
}