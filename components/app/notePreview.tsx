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
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Icon } from "../ui/icon";
import { Trash } from "lucide-react-native";

interface NotePreviewProps {
  note: Note;
}

export const NotePreview: React.FC<NotePreviewProps> = ({ note }) => {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {})
    .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        if (event.translationX < 0) {
            translateX.value = event.translationX < -80 ? -80 : event.translationX;
        }
    })
    .onEnd(() => {
      translateX.value =
        translateX.value > 50 ? withSpring(100) : withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <GestureDetector gesture={panGesture}>
      <View className="w-full relative">
        <Animated.View className="w-full z-20" style={animatedStyle}>
          <Link href={`/note/${note._id}`} asChild>
            <Pressable className="w-full p-4 flex flex-col text-white rounded-md bg-black my-2">
              <Text className="text-lg font-bold">{note.title}</Text>
              <Text>{note.preview.split("\n")[0]}</Text>
            </Pressable>
          </Link>
        </Animated.View>
        <View className="w-20 h-20 rounded-lg absolute right-[5%] justify-center items-center bg-red-600 top-3">
            <Icon as={Trash} size="xl" className="h-8 w-8 left-14"/>
        </View>
      </View>
    </GestureDetector>
  );
};
