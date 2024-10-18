import { ActivityIndicator, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";
import { TextInput } from "react-native";
import { Navbar } from "@/components/app/noteNavbar";
import { useNote } from "@/hooks/app/useNote";
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
import { useAtom } from "jotai";
import { currentNoteAtom } from "@/utils/atoms/currentNoteAtom";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AppStyles } from "@/constants/AppStyles";

type NoteParams = {
  id: string;
};

export default function Editor() {
  const params = useLocalSearchParams<NoteParams>();

  const { note, setNote, noteQuery } = useNote(params.id);

  const [currentNote] = useAtom(currentNoteAtom);

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
  const bridgeState = useBridgeState(editor);

  const { saveNote, saveNoteMutation } = useSaveNote(note, setNote, editor);

  const textContent = useEditorContent(editor, { type: "text" });

  useEffect(() => {
    if (!noteQuery.isSuccess || !note || !bridgeState.isReady || editor.getEditorState().isReady) {
      return;
    }
    editor.setContent(note?.html);
  }, [noteQuery.isSuccess, note, bridgeState.isReady]);

  const canSave = useMemo(() => {
    return !!(note && textContent && note.title);
  }, [textContent, note]);

  const noteChanging = useMemo(() => {
    return noteQuery.isFetching || noteQuery.isPending;
  }, [noteQuery.isFetching, noteQuery.isPending]);

  if (noteQuery.isFetching || noteQuery.isLoading) {
    return (
      <View className="flex flex-col w-full flex-1 relative justify-center items-center">
        <View
          className="w-0 h-0 overflow-hidden"
        >

          <RichText
            editor={editor}
            style={{ display: "none", width: 0, height: 0, flex: 0 }}
          ></RichText>
        </View>
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white">Cargando...</Text>
      </View>
    );
  }

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
            value={noteChanging ? undefined : note?.title ?? "Título"}
            className="text-4xl font-bold !text-white max-w-full"
            placeholder={noteChanging ? "Cargando..." : "Título"}
            onChangeText={(text) => {
              if (note) {
                setNote({
                  ...note,
                  title: text,
                });
              }
            }}
            aria-disabled={noteQuery.isLoading}
            editable={!noteQuery.isLoading}
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

        <View className="flex flex-row gap-4 items-end justify-start p-2">
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
        </View>

        <View className="h-10">
          <Toolbar editor={editor} hidden={false} items={TOOLBAR_ITEMS} />
        </View>

        <View className="px-4 flex-1 relative w-full">
          <RichText
            editor={editor}
            className={`flex-1 ${noteChanging ? "hidden" : ""}`}
          />
        </View>
      </View>
    </Animated.View>
  );
}
