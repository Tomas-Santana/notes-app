import { Note } from "@/types/Note";
import { AnimatedSwipable } from "./animatedSwipable";
import { Trash } from "lucide-react-native";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Icon } from "../ui/icon";
import { useDeleteNote } from "@/hooks/app/deleteNote";
import { Link } from "expo-router";
import { Text } from "../ui/text";
import { useMemo } from "react";
import { NoteImportanceDisplay } from "./noteImportance";
import { currentNoteAtom } from "@/utils/atoms/currentNoteAtom";
import { useAtom, useSetAtom } from "jotai";

const renderRightActions = () => {
  return (
    <View className="w-full h-20 justify-center items-end bg-red-600 rounded-md">
      <Pressable className="">
        <Icon as={Trash} size="xl" className="mr-8" />
      </Pressable>
    </View>
  );
};

export function NotePreview({ note, query }: { note: Note; query: string }) {
  const deleteMutation = useDeleteNote();
  const setCurrentNote = useSetAtom(currentNoteAtom);

  const onOpen = (direction: "left" | "right") => {
    if (direction === "left") {
    } else if (direction === "right") {
      deleteMutation.mutate({ _id: note._id });
    }
  };

  const title = useMemo(() => {
    const queryIndex = note.title.toLowerCase().indexOf(query.toLowerCase());

    if (queryIndex === -1) {
      return {
        beforeText:
          note.title.length > 30 ? note.title.slice(0, 30) + "..." : note.title,
        query: "",
        afterText: "",
      };
    }

    const start = queryIndex - 15;
    const end = queryIndex + 15;

    return {
      beforeText: note.title.slice(start < 0 ? 0 : start, queryIndex),
      query: note.title.slice(queryIndex, queryIndex + query.length),
      afterText: note.title.slice(
        queryIndex + query.length,
        end > note.title.length ? note.title.length : end
      ),
    };
  }, [note.title, query]);

  const preview = useMemo(() => {
    const queryIndex = note.content.toLowerCase().indexOf(query.toLowerCase());

    if (queryIndex === -1) {
      return {
        beforeText:
          note.content.slice(0, 30) + (note.content.length > 30 ? "..." : ""),
        query: "",
        afterText: "",
      };
    }

    const maxLength = 30;
    const queryLength = query.length;
    const availableLength = maxLength - queryLength;

    const start = queryIndex - Math.floor(availableLength / 2);
    const end = queryIndex + queryLength + Math.ceil(availableLength / 2);

    const beforeText = note.content
      .slice(start < 0 ? 0 : start, queryIndex)
      .replace(/\n/g, " ");
    const queryText = note.content
      .slice(queryIndex, queryIndex + queryLength)
      .replace(/\n/g, " ");
    const afterText =
      note.content
        .slice(
          queryIndex + queryLength,
          end > note.content.length ? note.content.length : end
        )
        .replace(/\n/g, " ") + (end > note.content.length ? "" : "...");

    const totalLength = beforeText.length + queryText.length + afterText.length;

    if (totalLength > maxLength) {
      const excessLength = totalLength - maxLength;
      if (afterText.length > excessLength) {
        return {
          beforeText,
          query: queryText,
          afterText:
            afterText.slice(0, afterText.length - excessLength) + "...",
        };
      } else {
        return {
          beforeText:
            beforeText.slice(
              0,
              beforeText.length - (excessLength - afterText.length)
            ) + "...",
          query: queryText,
          afterText,
        };
      }
    }

    return {
      beforeText,
      query: queryText,
      afterText,
    };
  }, [note.content, query]);


  const date = useMemo(() => {
    const today = new Date();
    if (
      today.getDate() === note.updatedAt.getDate() &&
      today.getMonth() === note.updatedAt.getMonth() &&
      today.getFullYear() === note.updatedAt.getFullYear()
    ) {
      return note.updatedAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return note.updatedAt.toLocaleDateString();
  }, [note.updatedAt]);

  return (
    <AnimatedSwipable onOpen={onOpen} renderRightActions={renderRightActions}>
      <Link
        href={{
          pathname: `/note/[id]`,
          params: { id: note._id },
        }}
        onPress={() => {
          setCurrentNote(note);
        }}
        asChild
      >
        <Pressable className="w-full h-20 px-8 flex flex-col justify-center text-white bg-[#303030] rounded-md">
          <View className="w-full flex flex-row justify-between">
            <Text className="text-lg font-bold">
              {title.beforeText}
              <Text
                style={{
                  color: "black",
                  backgroundColor: "yellow",
                }}
              >
                {title.query}
              </Text>
              {title.afterText}
            </Text>
            <NoteImportanceDisplay importance={note.importance} size={15} />
          </View>
          <View className="flex gap-2 flex-row">
            <Text>{date}</Text>
            <Text>
              {preview.beforeText}
              <Text
                style={{
                  color: "black",
                  backgroundColor: "yellow",
                }}
              >
                {preview.query}
              </Text>
              {preview.afterText.trimEnd()}
            </Text>
          </View>
        </Pressable>
      </Link>
    </AnimatedSwipable>
  );
}

export function NoteSearchPreview({
  note,
  query,
}: {
  note: Note;
  query: string;
}) {
  const title = useMemo(() => {
    const queryIndex = note.title.toLowerCase().indexOf(query.toLowerCase());

    if (queryIndex === -1) {
      return {
        beforeText:
          note.title.length > 30 ? note.title.slice(0, 30) + "..." : note.title,
        query: "",
        afterText: "",
      };
    }

    const start = queryIndex - 15;
    const end = queryIndex + 15;

    return {
      beforeText: note.title.slice(start < 0 ? 0 : start, queryIndex),
      query: note.title.slice(queryIndex, queryIndex + query.length),
      afterText: note.title.slice(
        queryIndex + query.length,
        end > note.title.length ? note.title.length : end
      ),
    };
  }, [note.title, query]);

  const content = useMemo(() => {
    const queryIndex = note.content.toLowerCase().indexOf(query.toLowerCase());

    if (queryIndex === -1) {
      return {
        beforeText:
          note.content.slice(0, 30) + (note.content.length > 30 ? "..." : ""),
        query: "",
        afterText: "",
      };
    }

    const maxLength = 30;
    const queryLength = query.length;
    const availableLength = maxLength - queryLength;

    const start = queryIndex - Math.floor(availableLength / 2);
    const end = queryIndex + queryLength + Math.ceil(availableLength / 2);

    const beforeText = note.content
      .slice(start < 0 ? 0 : start, queryIndex)
      .replace(/\n/g, " ");
    const queryText = note.content
      .slice(queryIndex, queryIndex + queryLength)
      .replace(/\n/g, " ");
    const afterText =
      note.content
        .slice(
          queryIndex + queryLength,
          end > note.content.length ? note.content.length : end
        )
        .replace(/\n/g, " ") + (end > note.content.length ? "" : "...");

    const totalLength = beforeText.length + queryText.length + afterText.length;

    if (totalLength > maxLength) {
      const excessLength = totalLength - maxLength;
      if (afterText.length > excessLength) {
        return {
          beforeText,
          query: queryText,
          afterText:
            afterText.slice(0, afterText.length - excessLength) + "...",
        };
      } else {
        return {
          beforeText:
            beforeText.slice(
              0,
              beforeText.length - (excessLength - afterText.length)
            ) + "...",
          query: queryText,
          afterText,
        };
      }
    }

    return {
      beforeText,
      query: queryText,
      afterText,
    };
  }, [note.content, query]);

  const date = useMemo(() => {
    const today = new Date();
    if (
      today.getDate() === note.updatedAt.getDate() &&
      today.getMonth() === note.updatedAt.getMonth() &&
      today.getFullYear() === note.updatedAt.getFullYear()
    ) {
      return note.updatedAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return note.updatedAt.toLocaleDateString();
  }, [note.updatedAt]);

  return (
    <Link href={`/note/${note._id}`} asChild>
      <TouchableOpacity
        className="w-full  px-8 flex flex-col justify-center text-white bg-[#303030] rounded-md"
        // minimun height for the touchable
        style={{ minHeight: 70 }}
        onPress={() => {
          console.log("pressed", note._id);
        }}
      >
        <View className="w-full flex flex-row justify-between">
          <View>
            <Text className="text-lg font-bold">
              {title.beforeText}
              <Text
                // highlight the query
                style={{
                  color: "black",
                  backgroundColor: "yellow",
                  borderRadius: 5,
                }}
              >
                {title.query}
              </Text>
              {title.afterText}
            </Text>
          </View>

          <NoteImportanceDisplay importance={note.importance} size={15} />
        </View>
        <View className="flex gap-2 flex-row">
          <Text>{date}</Text>
          <Text>
            {content.beforeText}
            <Text
              // highlight the query
              style={{
                color: "black",
                backgroundColor: "yellow",
                borderRadius: 5,
              }}
            >
              {content.query}
            </Text>
            {content.afterText.trimEnd()}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
