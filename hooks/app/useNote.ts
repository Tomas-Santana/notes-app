import NoteController from "@/api/controllers/NoteController";
import myToast from "@/components/toast";
import { GetNoteResponse } from "@/types/api/GetNote";
import { currentNoteAtom } from "@/utils/atoms/currentNoteAtom";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
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

  // const [note, setNote] = useState(noteQuery.data?.note);
  const [ note, setNote ] = useAtom(currentNoteAtom)

  useEffect(() => {
    setNote(noteQuery.data?.note);
  }, [noteQuery.data]);

  return {
    note,
    setNote,
    noteQuery,
  }
}
