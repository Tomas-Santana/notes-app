import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import NoteController from "@/api/controllers/NoteController";
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SearchNotesRequestSchema, SearchNotesResponse } from "@/types/api/SearchNote";
import { ActivityIndicator } from "react-native";
import { Text } from "../ui/text";
import { NoteSearchPreview } from "./notePreview";

interface NoteSearchProps {
    searchQuery: string;
}

export function SearchNotes({ searchQuery }: NoteSearchProps) {
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    const searchNotesQuery = useQuery({
        queryFn: async () => {
            const query = {
                query: debouncedQuery,
            };

            if (SearchNotesRequestSchema.safeParse(query).success) {
                const res = await NoteController.searchNotes(query);
                return res;
            }
            return null;
        },
        queryKey: ["searchNotes", debouncedQuery],
    });

    return (
        <ScrollView
            className="flex-1 p-4 w-full"
            keyboardShouldPersistTaps="handled"
        >
            <Animated.View
                className={"flex-1 flex-col gap-4 w-full"}
                layout={LinearTransition}
                entering={FadeIn}
                exiting={FadeOut}
            >
                {searchNotesQuery.isFetching && <ActivityIndicator />}
                {searchNotesQuery.isError && <Text>Error</Text>}
                {searchNotesQuery.isSuccess && searchNotesQuery.data?.notes?.map((note) => (
                    <Animated.View
                        key={note._id}
                        className={"w-full"}
                        layout={LinearTransition}
                        entering={FadeIn}
                        exiting={FadeOut}
                    > 
                        <NoteSearchPreview note={note} query={searchQuery} />
                    </Animated.View>
                ))}


                

            </Animated.View>

        </ScrollView>
    );

}
    