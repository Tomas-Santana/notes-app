import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import NoteController from "@/api/controllers/NoteController";
import { GetNoteResponse } from "@/types/api/GetNote";
import { useEffect, useState } from "react";
import myToast from "@/components/toast";
import { TextInput } from "react-native";
import { Navbar } from "@/components/app/noteNavbar";

import React from "react";
import { RichText, Toolbar, useEditorBridge, TenTapStartKit, CoreBridge, DEFAULT_TOOLBAR_ITEMS } from "@10play/tentap-editor";
import { customCSS, customDarkTheme, TOOLBAR_ITEMS } from "@/components/utils/editorTheme";


type NoteParams = {
  id: string;
};

export default function Editor() {
  const params = useLocalSearchParams<NoteParams>();

  const noteQuery = useQuery<GetNoteResponse>({
    queryKey: ["note", params.id],
    queryFn: () =>
      NoteController.getNote({
        id: params.id,
      }),
  });

  useEffect(() => {
    if (noteQuery.isError) {
      myToast(false, "Failed to get note");
      console.log(noteQuery.error);
    }
  }, [noteQuery.isError]);

  const [note, setNote] = useState(noteQuery.data?.note);

  const editor = useEditorBridge({
    avoidIosKeyboard: true,
    initialContent: note?.content,
    theme: customDarkTheme,
    bridgeExtensions: [
      ...TenTapStartKit,
      CoreBridge.configureCSS(customCSS),
    ]
    
  });
  const state = editor.getEditorState();

  return (
    <View className="flex flex-col w-full flex-1">
      <Navbar canSave={true} />
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
