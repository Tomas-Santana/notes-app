import type { Note } from "@/types/Note";
import { Link } from "expo-router";
import { Text } from "../ui/text";
import { Pressable } from "react-native";

interface NotePreviewProps {
    note: Note;
}

export const NotePreview: React.FC<NotePreviewProps> = ({ note }) => {
    return (
        <Link href={`/note/${note._id}`} asChild>
            <Pressable className="w-full p-4 flex flex-col text-white rounded-md bg-black my-2">
                <Text className="text-lg font-bold">{note.title}</Text>
                <Text>{note.preview.split("\n")[0]}</Text>
            </Pressable>
        </Link>
    );
};