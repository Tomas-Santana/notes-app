import { useEffect, useMemo, useState } from "react";
import type { MyNotesResponse } from "@/types/api/MyNotes";
import type { Note } from "@/types/Note";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Category } from "@/types/Category";
import CategoryController from "@/api/controllers/CategoryController";
import { atom, useAtom } from "jotai";

export const selectedCategoryAtom = atom<string>("all");

export function useCategoryFilter(
  myNotes: UseQueryResult<MyNotesResponse>,
  defaultCategory = "all"
) {
  const [selectedCategory, setSelectedCategory] =
    useAtom(selectedCategoryAtom);

  const filteredNotes = useMemo(() => {
    if (!myNotes.data?.notes) return [] as Note[];

    if (selectedCategory === "all") {
      return myNotes.data?.notes;
    }
    if (selectedCategory === "favorites") {
      return myNotes.data?.notes.filter((note) => note.isFavorite);
    }
    return myNotes.data?.notes.filter((note) =>
      note.categories?.some((category) => category._id === selectedCategory)
    );
  }, [myNotes.data, selectedCategory]);

  const categoryQuery = useCategories();

  const categories = useMemo<Category[]>(() => {
    const defaultCategories = [
      { _id: "all", name: "Todos" },
      { _id: "favorites", name: "Favoritos" },
    ];

    if (!categoryQuery.data?.categories) {
      return defaultCategories;
    }

    return [...defaultCategories, ...categoryQuery.data.categories.sort((a, b) => a.name.localeCompare(b.name))]
  }, [myNotes.data, categoryQuery.data]);

  // if selected category is not in the list of categories, set it to all
  useEffect(() => {
    if (!categories.some((category) => category._id === selectedCategory)) {
      setSelectedCategory("all");
    }
  }, [categories, selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredNotes,
    categories,
  };
}

export function useCategories() {
  const useCategoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryController.getCategories,
  });

  return useCategoryQuery;
}
