import NoteController from "@/api/controllers/NoteController";
import myToast from "@/components/toast";
import { GetNoteResponse } from "@/types/api/GetNote";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useNote(id: string) {
  const noteQuery = useQuery<GetNoteResponse>({
    queryKey: ["note", id],
    queryFn: () =>
      NoteController.getNote({
        id: id,
      }),
  });

  useEffect(() => {
    if (noteQuery.isError) {
      myToast(false, "Failed to get note");
      console.log(noteQuery.error);
    }
  }, [noteQuery.isError]);

  const [note, setNote] = useState(noteQuery.data?.note);

  return {
    note,
    setNote,
    noteQuery,
  }
}