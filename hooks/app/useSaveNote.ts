import NoteController from "@/api/controllers/NoteController";
import myToast from "@/components/toast";
import { CreateNoteRequest, UpdateNoteRequest } from "@/types/api/CreateOrUpdateNote";
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
    onSuccess: async (data) => {
      myToast(true, "Nota guardada");
      note && setNote({
          ...note,
          _id: data.noteId,
          content: await editor.getText(),
          html: await editor.getHTML(),
          updatedAt: new Date(),
        });

      queryClient.invalidateQueries({ queryKey: ["myNotes"] });
      queryClient.invalidateQueries({ queryKey: ["note", note?._id] });

    },
  });

  const saveNote = async (update?: UpdateNoteRequest) => {
    if (!note) return;

    const payload = update || {
      ...note,
      content: await editor.getText(),
      html: await editor.getHTML(),
    };

    console.log("payload", payload);

    if (note._id !== "new" && note._id) {
      console.log("Update nore");
      
      saveNoteMutation.mutate({payload, method: "PUT"});
    } else {
      console.log("Create note");
      saveNoteMutation.mutate({payload});
    }
  };

  return { saveNote, saveNoteMutation };
}
