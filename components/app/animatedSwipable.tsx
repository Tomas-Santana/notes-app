import type { Note } from "@/types/Note";
import { View } from "react-native";
import {
  Swipeable,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import React from "react";

interface NotePreviewProps {
  note: Note;
}

interface AnimatedSwipableProps {
  children: React.ReactNode;
  renderRightActions?: () => React.ReactNode;
  renderLeftActions?: () => React.ReactNode;
  onOpen: (direction: "left" | "right") => void;
  entering?: any;
  exiting?: any;
}

/**
 * Use inside animated view
 */
export const AnimatedSwipable: React.FC<AnimatedSwipableProps> = (
  { children, renderRightActions, renderLeftActions, onOpen, entering = FadeIn, exiting = FadeOut }
) => {
  const translateX = useSharedValue(0);


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View
      layout={LinearTransition}
      entering={entering}
      exiting={exiting}
    >
      <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={(direction) => onOpen(direction)} renderLeftActions={renderLeftActions}>
        <View className="w-full relative">
          <Animated.View className="w-full z-20" style={animatedStyle}>
            {children}
          </Animated.View>
        </View>
      </Swipeable>
    </Animated.View>
  );
};
