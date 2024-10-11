import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@/components/ui/text";
import { useQuery } from "@tanstack/react-query";
import type { Note } from "@/types/Note";
import { NoteSchema } from "@/types/Note";
import NoteController from "@/api/controllers/NoteController";
import { GetNoteResponse } from "@/types/api/GetNote";
import { useEffect } from "react";
import myToast from "@/components/toast";
import { TextInput } from "react-native";
import { Navbar } from "@/components/app/noteNavbar";

type NoteParams = {
    id: string;
}

export default function Editor() {
    const params = useLocalSearchParams<NoteParams>();

    const noteQuery = useQuery<GetNoteResponse>({
        queryKey: ["note", params.id],
        queryFn: () => NoteController.getNote({
            id: params.id
        }),
    })

    useEffect(() => {
        if (noteQuery.isError) {
            myToast(false, "Failed to get note");
            console.log(noteQuery.error);
        }
    }, [noteQuery.isError])


    return (
        <View className="flex flex-col w-full h-full">
            <Navbar canSave={true} />
            <View className="p-4 flex flex-col flex-1">
                <TextInput
                    value={noteQuery.data?.note?.title}
                    className="text-2xl font-bold"
                    placeholder="Title"
                />
                <TextInput
                    value={noteQuery.data?.note?.content}
                    
                    className="mt-4 w-full flex-1"
                    placeholder="Content"
                    multiline
                />
            </View>
            
        </View>
    )
}