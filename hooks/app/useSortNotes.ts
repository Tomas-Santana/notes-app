import type { Note } from "@/types/Note";
import { useMemo, useState } from "react";

export type SortType = "created" | "updated" | "importance" | "title";

export type SortFunctions = {
    sortType: SortType;
    setSortType: (type: SortType) => void;
    sortOrder: "asc" | "desc";
    setSortOrder: (order: "asc" | "desc") => void;
}
export type UseSortNotesReturn = {
    sortFunctions: SortFunctions;
    sortedNotes: Note[];
}



export const sortDisplay: Record<SortType, string>= {
    "created": "Creación",
    "updated": "Actualización",
    "importance": "Importancia",
    "title": "Título",
}

export const sortOrderDisplay: Record<"asc" | "desc", string> = {
    "asc": "Ascendente",
    "desc": "Descendente",
}


export function useSortNotes(notes: Note[]): UseSortNotesReturn {
    const [sortType, setSortType] = useState<SortType>("updated");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const sortedNotes = useMemo(() => {
        return [...notes].sort((a, b) => {
            if (sortType === "created") {
                return sortOrder === "asc" ? a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds() : b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds();
            } else if (sortType === "updated") {
                return sortOrder === "asc" ? a.updatedAt.getMilliseconds() - b.updatedAt.getMilliseconds() : b.updatedAt.getMilliseconds() - a.updatedAt.getMilliseconds();
            } else if (sortType === "importance") {
                return sortOrder === "asc" ? a.importance - b.importance : b.importance - a.importance;
            } else if (sortType === "title") {
                return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            }
            return 0;
        });
    }, [sortType, sortOrder, notes]);

    return {
        sortFunctions: {
            sortType,
            setSortType,
            sortOrder,
            setSortOrder,
        },
        sortedNotes,
    }
}