import NoteController from "@/api/controllers/NoteController";
import myToast from "@/components/toast";
import { Note } from "@/types/Note";
import { EditorBridge } from "@10play/tentap-editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSaveNote(
  note: Note | undefined,
  setNote: (note: Note) => void,
  editor: EditorBridge
) {
  const queryClient = useQueryClient();

  const saveNoteMutation = useMutation({
    mutationFn: NoteController.createOrUpdateNote,
    onError: (error) => {
      myToast(false, error.message);
    },
    onSuccess: (data) => {
      myToast(true, "Nota guardada");
        note && setNote({
            ...note,
            _id: data.noteId,
            updatedAt: new Date()
        });

      queryClient.invalidateQueries({ queryKey: ["myNotes"] });

    },
  });

  const saveNote = async () => {
    if (!note) return;

    const payload = {
      ...note,
      content: await editor.getText(),
      html: await editor.getHTML(),
    };

    console.log("payload", payload);

    if (note._id !== "new" && note._id) {
      console.log("updating note, id", note._id);
      saveNoteMutation.mutate(payload);
    } else {
      console.log("creating note");
      saveNoteMutation.mutate({
        ...payload,
        _id: undefined,
      });
    }
  };

  return { saveNote, saveNoteMutation };
}
