import { View } from "react-native";
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
} from "@10play/tentap-editor";
import {
  customCSS,
  customDarkTheme,
  TOOLBAR_ITEMS,
} from "@/components/utils/editorTheme";
import { useSaveNote } from "@/hooks/app/useSaveNote";
import { NoteImportance } from "@/components/app/noteImportance";

type NoteParams = {
  id: string;
};


export default function Editor() {
  const params = useLocalSearchParams<NoteParams>();

  const { note, setNote, noteQuery } = useNote(params.id);

  const editor = useEditorBridge({
    avoidIosKeyboard: true,
    initialContent: note?.html,
    theme: customDarkTheme,
    bridgeExtensions: [...TenTapStartKit, CoreBridge.configureCSS(customCSS), PlaceholderBridge.configureExtension({ placeholder: "Escribe algo..." })],
  });
  
  const { saveNote, saveNoteMutation } = useSaveNote(note, setNote, editor);
  
  const textContent = useEditorContent(editor, { type: "text" });
  useEffect(() => {
    if (noteQuery.isSuccess && note) {
      editor.setContent(note?.html);
    }
  }, [noteQuery.isSuccess]);

  const canSave = useMemo(() => {
    return !!(note && textContent && note.title)
  }, [textContent, note]);

  return (
    <View className="flex flex-col w-full flex-1">
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
            placeholder={noteQuery.isLoading ? "Cargando..." : "Título 2"}
            onChangeText={(text) => {
              if (note) {
                setNote({
                 ...note,
                  title: text,
                });
              }
            }}
            aria-disabled={noteQuery.isLoading}
            maxLength={50}
            blurOnSubmit
            multiline
          />

          {/* text fo updatedAt and createdAt */}

            <View className="flex flex-col gap-2  w-full items-start justify-start">
            <Text className="!text-white">
               {note?.updatedAt.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, hora {note?.updatedAt.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            </View>
        </View>

        <View className="flex flex-row gap-4 items-end justify-start p-2">
          <NoteImportance importance={note?.importance ?? 0} onChange={(rating) => {
            if (note) {
              setNote({
                ...note,
                importance: Math.round(rating),
              })
            }
          }} />
        </View>

        <View className="h-10">
          <Toolbar editor={editor} hidden={false} items={TOOLBAR_ITEMS} />
        </View>
        <View className="px-4 flex-1">
          <RichText editor={editor} className="flex-1" />
        </View>
      </View>
    </View>
  );
}
