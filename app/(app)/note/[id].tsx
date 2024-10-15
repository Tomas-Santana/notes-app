import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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
import { Rating } from '@kolking/react-native-rating';
import { AppStyles } from "@/constants/AppStyles";

type NoteParams = {
  id: string;
};

const exclamationFilled = require("@/assets/images/exclamation.png");

export default function Editor() {
  const params = useLocalSearchParams<NoteParams>();

  const { note, setNote, noteQuery } = useNote(params.id);

  const editor = useEditorBridge({
    avoidIosKeyboard: true,
    initialContent: note?.html,
    theme: customDarkTheme,
    bridgeExtensions: [...TenTapStartKit, CoreBridge.configureCSS(customCSS), PlaceholderBridge.configureExtension({ placeholder: "Escribe algo..." })],
  });

  useEffect(() => {
    console.log("note", note);
    if (note?.html) {
      editor.setContent(note.html);
    }
  }, [note]);

  const { saveNote, saveNoteMutation } = useSaveNote(note, setNote, editor);

  const textContent = useEditorContent(editor, { type: "text" });

  const canSave = useMemo(() => {
    return !!(note && textContent && note.title)
  }, [textContent, note]);

  return (
    <View className="flex flex-col w-full flex-1">
      <Navbar
        canSave={canSave}
        onSave={saveNote}
        pending={saveNoteMutation.isPending}
      />
      <View className=" flex flex-col flex-1">
        <View className="p-4">
          <TextInput
            value={note?.title}
            className="text-4xl font-bold !text-white max-w-full"
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

        <View className="flex flex-row gap-4 items-end justify-start p-2">
          <Rating
            fillColor={AppStyles.colors.bitpurple.DEFAULT}
            spacing={0}
            touchColor={AppStyles.colors.bitpurple[100]}
            rating={note?.importance ?? 0}
            baseSymbol={exclamationFilled}
            fillSymbol={exclamationFilled}
            onChange={(rating) => {
              setNote(
                note
                  ? {
                      ...note,
                      importance: Math.round(rating)
                    }
                  : undefined
              );
            }}
          />
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
