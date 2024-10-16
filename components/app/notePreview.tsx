import type { Note } from "@/types/Note";
import { Link } from "expo-router";
import { Text } from "../ui/text";
import { Pressable, View } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
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
import { deleteNote } from "@/hooks/app/deleteNote";

interface NotePreviewProps {
  note: Note;
}

export const NotePreview: React.FC<NotePreviewProps> = ({ note }) => {
  const translateX = useSharedValue(0);
  const hasReachedThreshold = useSharedValue(false);

  // const panGesture = Gesture.Pan()
  //   .onStart(() => {})
  //   .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
  //       if (event.translationX < 0) {
  //           translateX.value = event.translationX < -80 ? -80 : event.translationX;

  //           if (event.translationX <= -80) {

  //               if (!hasReachedThreshold.value) runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
  //               hasReachedThreshold.value = true;

  //           }
  //       } else {
  //         translateX.value = event.translationX > 80 ? 80 : event.translationX;

  //               if (event.translationX >= 80) {
  //                   if (!hasReachedThreshold.value) runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
  //                   hasReachedThreshold.value = true;
  //               }
  //       }
  //   })
  //   .onEnd(() => {
  //     if (translateX.value >= 80) {
  //       translateX.value = withTiming(0, { "duration": 500 });
  //       console.log(`Nota agregada a favoritos: ${note.title}`) //setear note.isFavorite a true
  //     } else if (translateX.value <= -80) {
  //       translateX.value = withTiming(0, { "duration": 500 });
  //       console.log("Eliminar nota con id", note._id) //Llamar funcion para eliminar la nota
  //     } else {
  //       translateX.value = withTiming(0, { "duration": 500 });
  //     }
  //     if (hasReachedThreshold.value) {
  //       hasReachedThreshold.value = false;
  //     }
  //   });

  const renderRightActions = () => {
    return (
      <View className="w-24 h-24 justify-center items-center bg-red-600">
        <Icon as={Trash} size="xl" className="h-8 w-8 left-9 absolute"/>
      </View>
    );
  };

  const { mutate: jk } = deleteNote()
  const renderLeftActions = () => {
    return (
      <View className="w-24 h-24 justify-center items-center bg-yellow-400">
        <Icon as={Star} size="xl" className="h-8 w-8 right-9 absolute"/>
      </View>
    );
  }

  const setFavorite = () => {
    console.log(`La nota: ${note.title} se ha agregado a favoritos`);
  }

  const onOpen = (direction: "left" | "right") => {
    if (direction === "left") {
      setFavorite();
    } else if (direction === "right") {
      jk({ _id: note._id })
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  const title = useMemo(() => {
    return note.title.length > 30
      ? note.title.slice(0, 30) + "..."
      : note.title;
  }, [note.title]);

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={(direction) => onOpen(direction)} leftThreshold={20} renderLeftActions={renderLeftActions} rightThreshold={20}>
        <View className="w-full relative">
          <Animated.View className="w-full z-20" style={animatedStyle}>
            <Link href={`/note/${note._id}`} asChild>
              <Pressable className="w-full h-24 p-4 flex flex-col text-white bg-[#303030] border-white border-b">
                <Text className="text-lg font-bold">{title}</Text>
                <Text>{note.preview.split("\n")[0]}</Text>
              </Pressable>
            </Link>
          </Animated.View>
          {/* <View className="w-24 h-24 absolute right-0 justify-center items-center bg-red-600">
            <Icon as={Trash} size="xl" className="h-8 w-8 left-9 absolute"/>
            </View>
            <View className="w-24 h-24 absolute left-0 justify-center items-center bg-yellow-400">
            <Icon as={Star} size="xl" className="h-8 w-8 right-9 absolute"/>
            </View> */}
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};
