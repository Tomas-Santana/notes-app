import type { Note } from "@/types/Note";
import { Link } from "expo-router";
import { Text } from "../ui/text";
import { Pressable, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Icon } from "../ui/icon";
import { Trash, Star } from "lucide-react-native";
import { useMemo } from "react";
import React from "react";
import * as Haptics from "expo-haptics";

interface NotePreviewProps {
  note: Note;
}

export const NotePreview: React.FC<NotePreviewProps> = ({ note }) => {
  const translateX = useSharedValue(0);
  const hasReachedThreshold = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onStart(() => {})
    .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        if (event.translationX < 0) {
            translateX.value = event.translationX < -80 ? -80 : event.translationX;

            if (event.translationX <= -80) {
                
                if (!hasReachedThreshold.value) runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
                hasReachedThreshold.value = true;
                
            } 
        } else {
          translateX.value = event.translationX > 80 ? 80 : event.translationX;

                if (event.translationX >= 80) {
                    if (!hasReachedThreshold.value) runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
                    hasReachedThreshold.value = true;
                }
        }
    })
    .onEnd(() => {
      // translateX.value =
      //   translateX.value > 50 ? withSpring(100, {stiffness: 200, "duration": 500}) : withTiming(0, {duration: 500});
      if (translateX.value >= 80) {
        translateX.value = withSpring(0, { stiffness: 200, "duration": 500 });
      } else if (translateX.value <= -80) {
        translateX.value = withSpring(0, { stiffness: 200, "duration": 500 });
      } else {
        translateX.value = withTiming(0, { "duration": 500 });
      }
      if (hasReachedThreshold.value) {
        hasReachedThreshold.value = false;
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  const title = useMemo(() => {
    return note.title.length > 30 ? note.title.slice(0, 30) + "..." : note.title;
  }, [note.title]);

  return (
    <GestureDetector gesture={panGesture}>
      <View className="w-full relative">
        <Animated.View className="w-full z-20" style={animatedStyle}>
          <Link href={`/note/${note._id}`} asChild>
            <Pressable className="w-full h-24 p-4 flex flex-col text-white bg-[#303030] border-white border-b">
              <Text className="text-lg font-bold">{title}</Text>
              <Text>{note.preview.split("\n")[0]}</Text>
            </Pressable>
          </Link>
        </Animated.View>
        <View className="w-24 h-24 absolute right-0 justify-center items-center bg-red-600">
            <Icon as={Trash} size="xl" className="h-8 w-8 left-9 absolute"/>
        </View>
        <View className="w-24 h-24 absolute left-0 justify-center items-center bg-yellow-400">
            <Icon as={Star} size="xl" className="h-8 w-8 right-9 absolute"/>
        </View>
      </View>
    </GestureDetector>
  );
};
