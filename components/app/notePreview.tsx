import { Note } from "@/types/Note";
import { AnimatedSwipable } from "./animatedSwipable";
import { Trash, Star } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Icon } from "../ui/icon";
import { useDeleteNote } from "@/hooks/app/deleteNote";
import { Link } from "expo-router";
import { Text } from "../ui/text";
import { useMemo } from "react";
import { NoteImportance, NoteImportanceDisplay } from "./noteImportance";

const renderRightActions = () => {
  return (
    <View className="w-full h-20 justify-center items-end bg-red-600 rounded-md">
      <Pressable className="">
        <Icon as={Trash} size="xl" className="mr-8" />
      </Pressable>
    </View>
  );
};

export function NotePreview({ note }: { note: Note }) {
  const deleteMutation = useDeleteNote();

  const onOpen = (direction: "left" | "right") => {
    if (direction === "left") {
      console.log("left");
    } else if (direction === "right") {
      deleteMutation.mutate({ _id: note._id });
    }
  };

  const title = useMemo(() => {
    return note.title.length > 30
      ? note.title.slice(0, 30) + "..."
      : note.title;
  }, [note.title]);

  const preview = useMemo(() => {
    const firstLine = note.preview.split("\n")[0];
    return firstLine.length > 30 ? firstLine.slice(0, 30) + "..." : firstLine;
  }, [note.preview]);

  // if date is today, show time

  const date = useMemo(() => {
    const today = new Date();
    if (
      today.getDate() === note.updatedAt.getDate() &&
      today.getMonth() === note.updatedAt.getMonth() &&
      today.getFullYear() === note.updatedAt.getFullYear()
    ) {
      return note.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return note.updatedAt.toLocaleDateString();
  }, [note.updatedAt]);

  return (
    <AnimatedSwipable onOpen={onOpen} renderRightActions={renderRightActions}>
      <Link href={`/note/${note._id}`} asChild>
        <Pressable className="w-full h-20 px-8 flex flex-col justify-center text-white bg-[#303030] rounded-md">
            <View className="w-full flex flex-row justify-between">
                <Text className="text-lg font-bold">{title}</Text>
                <NoteImportanceDisplay importance={note.importance} size={15}  />
            </View>
          <View className="flex gap-2 flex-row">
            <Text>{date}</Text>
            <Text>{preview}</Text>
          </View>
        </Pressable>
      </Link>
    </AnimatedSwipable>
  );
}
