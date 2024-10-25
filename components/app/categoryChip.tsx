import { Category } from "@/types/Category";
import { View } from "react-native";
import AnimatedBG from "./animatedbg";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "../ui/text";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { AppStyles } from "@/constants/AppStyles";
import { StyleSheet } from "react-native";

interface CategoryChipProps {
  selected: boolean;
  onSelectCategory: (categoryId: string) => void;
  category: Category;
}

export function CategoryChip({
  selected,
  onSelectCategory,
  category,
}: CategoryChipProps) {

  const animatedStyle = useAnimatedStyle(() => {
    return {
      fontWeight: selected ? "bold" : "normal",
    };
    }, [selected]);

  return (
    <AnimatedTouchableOpacity
      onPress={() => onSelectCategory(category._id)}
      style={[touchableStyle.touchable]}
    >

      { selected && <AnimatedBG
        viewStyles={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 5,
        }}
      ></AnimatedBG>}
      <Animated.Text className="text-white"
        style={[animatedStyle]}
      >{category.name}</Animated.Text>
    </AnimatedTouchableOpacity>
  );
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const touchableStyle = StyleSheet.create({
  touchable: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: "white",
    paddingVertical: 8,
    position: "relative",
  },
});
