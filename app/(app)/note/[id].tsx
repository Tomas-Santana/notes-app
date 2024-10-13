import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { TextInput } from "react-native";
import { Navbar } from "@/components/app/noteNavbar";
import { useNote } from "@/hooks/app/useNote";

import React from "react";
import { RichText, Toolbar, useEditorBridge, TenTapStartKit, CoreBridge, useEditorContent } from "@10play/tentap-editor";
import { customCSS, customDarkTheme, TOOLBAR_ITEMS } from "@/components/utils/editorTheme";
import { useSaveNote } from "@/hooks/app/useSaveNote";


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
    bridgeExtensions: [
      ...TenTapStartKit,
      CoreBridge.configureCSS(customCSS),
    ]
  });

  const { saveNote, saveNoteMutation } = useSaveNote(note, setNote, editor);

  const content = useEditorContent(editor, { type: "text" });
  
  const canSave = useMemo(() => {
    return !!(note && note.title && content && !saveNoteMutation.isPending);
  }, [note, saveNoteMutation.isPending, content]);

  return (
    <View className="flex flex-col w-full flex-1">
      <Navbar canSave={canSave} onSave={saveNote} />
      <View className=" flex flex-col flex-1">
        <View className="p-4">
          <TextInput
            value={note?.title}
            className="text-4xl font-bold text-white max-w-full"
            placeholder={noteQuery.isLoading ? "Cargando..." : "Título 2"}
            onChangeText={(text) => {
              setNote(
                note
                  ? {
                      ...note,
                      title: text,
                    }
                  : undefined
              );
            }}
            aria-disabled={noteQuery.isLoading}
            maxLength={50}
            blurOnSubmit
            multiline
          />
        </View>
        <View className="h-10">
            <Toolbar editor={editor} hidden={false} items={TOOLBAR_ITEMS}  />
        </View>
        <View className="px-4 flex-1">

          <RichText editor={editor} className="flex-1"/>
        </View>

      </View>
    </View>
  );
}
