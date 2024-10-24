import type { Note } from "@/types/Note";
import { useMemo, useState } from "react";

export function useSearchNotes(notes: Note[]) {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Note[]>(notes);

  useMemo(() => {
    if (!search) {
      setSearchResults(notes);
      return;
    }

    setSearchResults(
      notes.filter((note) =>
      (note.title + note.content).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, notes]);

  return {
    search,
    setSearch,
    searchResults,
  };
}