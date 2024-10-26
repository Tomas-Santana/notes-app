import { Category } from "@/types/Category";
import { View } from "react-native";
import AnimatedBG, {StaticBG} from "./animatedbg";
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
  color: {color: string, textColor: string};
  onPress?: () => void;
}

export function CategoryChip({
  selected,
  onSelectCategory,
  category,
  color,
}: CategoryChipProps) {

    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: withTiming(selected ? color.color : AppStyles.colors.background.lighterTransparent),
        borderWidth: 1,
        borderColor: color.color,
        borderRadius: 5,
      }

    }, [color, selected]);

    const animatedTextStyle = useAnimatedStyle(() => {
      return {
        color: withTiming(selected ? color.textColor : "white"),
      }
    }, [color, selected]);

  return (
    <Animated.View
      style={[animatedStyle]}
    >
      <TouchableOpacity
        onPress={() => onSelectCategory(category._id)}
        className="w-full h-full flex flex-row items-center justify-center"
        style={{        paddingHorizontal: 16,
          paddingVertical: 8,}}
        
      >

        <Animated.Text className="text-white"
          style={[animatedTextStyle]}
        >{category.name}</Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);


