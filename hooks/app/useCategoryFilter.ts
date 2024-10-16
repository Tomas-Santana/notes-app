import { useMemo, useState } from "react";
import type { MyNotesResponse } from "@/types/api/MyNotes";
import type { Note } from "@/types/Note";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Category } from "@/types/Category";
import CategoryController from "@/api/controllers/CategoryController";

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
      return myNotes.data?.notes.filter((note) => note.categories?.some((category) => category._id === selectedCategory));
  
    }, [myNotes.data, selectedCategory]);

    const categoryQuery = useCategories();
  
    const categories = useMemo<Category[]>(() => {
      const defaultCategories = [{ _id: "all", name: "Todos", userId: "" },{ _id: "favorites", name: "Favoritos", userId: "" }];
  
      if (!categoryQuery.data?.categories) {
        return defaultCategories;
      }

      return [...defaultCategories, ...categoryQuery.data.categories];
    }, [myNotes.data, categoryQuery.data]);

    return {
        selectedCategory,
        setSelectedCategory,
        filteredNotes,
        categories
    }
}

export function useCategories() {
  const useCategoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryController.getCategories,
  })

  return useCategoryQuery;
}