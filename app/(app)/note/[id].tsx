import { ActivityIndicator, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";
import { TextInput } from "react-native";
import { Navbar } from "@/components/app/noteNavbar";
import { useLocalNote } from "@/hooks/app/useNote";
import { Text } from "@/components/ui/text";

import React from "react";
import {
  RichText,
  Toolbar,
  useEditorBridge,
  TenTapStartKit,
  CoreBridge,
  useEditorContent,
  PlaceholderBridge,
  useBridgeState,
} from "@10play/tentap-editor";
import {
  customCSS,
  customDarkTheme,
  TOOLBAR_ITEMS,
} from "@/components/utils/editorTheme";
import { useSaveNote } from "@/hooks/app/useSaveNote";
import { NoteImportance } from "@/components/app/noteImportance";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AppStyles } from "@/constants/AppStyles";

type NoteParams = {
  id: string;
};

const MAX_LENGTH = 250;

export default function Editor() {
  const params = useLocalSearchParams<NoteParams>();

  const [note, setNote] = useLocalNote(params.id);

  useEffect(() => {
    console.log(note, "note");
  }, [note]);

  const editor = useEditorBridge({
    avoidIosKeyboard: true,
    initialContent: note?.html,
    theme: customDarkTheme,
    bridgeExtensions: [
      ...TenTapStartKit,
      CoreBridge.configureCSS(customCSS),
      PlaceholderBridge.configureExtension({ placeholder: "Escribe algo..." }),
    ],
  });
  
  useEffect(() => {
    if (note) {
      editor.setContent(note.html);
    }
  }, [note.html]);

  const { saveNote, saveNoteMutation } = useSaveNote(note, setNote, editor);

  const textContent = useEditorContent(editor, { type: "text" });

  const canSave = useMemo(() => {
    return !!(
      note &&
      textContent &&
      note.title &&
      textContent.length <= MAX_LENGTH
    );
  }, [textContent, note]);


  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className="flex flex-col w-full flex-1 relative"
    >
      <Navbar
        canSave={canSave}
        onSave={saveNote}
        pending={saveNoteMutation.isPending}
        setNote={setNote}
        note={note}
      />
      <View className=" flex flex-col flex-1">
        <View className="p-4">
          <TextInput
            value={note?.title}
            className="text-4xl font-bold !text-white max-w-full"
            placeholder={"Título"}
            placeholderTextColor={AppStyles.colors.placeholder.DEFAULT}
            onChangeText={(text) => {
              if (note) {
                setNote({
                  ...note,
                  title: text,
                });
              }
            }}
            editable={!saveNoteMutation.isPending}
            maxLength={50}
            blurOnSubmit
            multiline
          />

          <View className="flex flex-col gap-2  w-full items-start justify-start">
            <Text className="!text-white">
              {note?.updatedAt.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              , hora{" "}
              {note?.updatedAt.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>

        <View className="flex flex-row gap-4 items-end justify-between p-2 pr-4">
          <NoteImportance
            importance={note?.importance ?? 0}
            onChange={(rating) => {
              if (note) {
                setNote({
                  ...note,
                  importance: Math.round(rating),
                });
              }
            }}
          />

          <Text
            className={`text-white mr-2 ${
              (textContent?.length ?? 0) > MAX_LENGTH ? "text-error-500" : ""
            }`}
          >
            {textContent?.length ?? 0}/{MAX_LENGTH} caracteres
          </Text>
        </View>

        <View className="h-10">
          <Toolbar editor={editor} hidden={false} items={TOOLBAR_ITEMS} />
        </View>

        <View className="px-4 flex-1 relative w-full">
          <RichText
            editor={editor}
            className={`flex-1`}
          />
        </View>
      </View>
    </Animated.View>
  );
}
