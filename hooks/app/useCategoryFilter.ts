import { useMemo, useState } from "react";
import type { MyNotesResponse } from "@/types/api/MyNotes";
import type { Note } from "@/types/Note";
import { UseQueryResult } from "@tanstack/react-query";

export function useCategoryFilter(myNotes: UseQueryResult<MyNotesResponse>) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const filteredNotes = useMemo(() => {
      if (!myNotes.data?.notes) return [] as Note[];
  
  
      if (selectedCategory === "all") {
        return myNotes.data?.notes;
      }
      if (selectedCategory === "favorites") {
        return myNotes.data?.notes.filter((note) => note.isFavorite);
      }
      return myNotes.data?.notes.filter((note) => note.categories.some((category) => category._id === selectedCategory));
  
    }, [myNotes.data, selectedCategory]);
  
    const categories = useMemo(() => {
      const defaultCategories = [{ _id: "all", name: "Todos" },{ _id: "favorites", name: "Favoritos" }];
  
      const all = [...defaultCategories, ...(myNotes.data?.notes?.flatMap(note => note.categories) || [])]
      // Remove duplicates
      return all.filter((category, index, self) => self.findIndex((t) => t._id === category._id) === index);
    }, [myNotes.data]);

    return {
        selectedCategory,
        setSelectedCategory,
        filteredNotes,
        categories
    }
}