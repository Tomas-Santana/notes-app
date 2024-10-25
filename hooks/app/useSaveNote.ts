import NoteController from "@/api/controllers/NoteController";
import myToast from "@/components/toast";
import { CreateNoteRequest, UpdateNoteRequest } from "@/types/api/CreateOrUpdateNote";
import { Note } from "@/types/Note";
import { EditorBridge } from "@10play/tentap-editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSaveNote(
  note: Note | undefined,
  setNote: (note: Note) => void,
  editor?: EditorBridge
) {
  const queryClient = useQueryClient();

  const saveNoteMutation = useMutation({
    mutationFn: NoteController.createOrUpdateNote,
    onError: (error) => {
      myToast(false, error.message);
    },
    onMutate: async (payload) => {
      note && setNote({
        ...note,
        updatedAt: new Date(),
        content: (await editor?.getText()) ?? note.content,
        html: await editor?.getHTML() ?? note.html,
        isFavorite: payload.payload.isFavorite ?? note.isFavorite,
        categories: payload.payload.categories ?? note.categories,
      });
    },
    onSuccess: async (data) => {
      myToast(true, "Nota guardada");
      note && setNote({
          ...note,
          _id: data.noteId,
          updatedAt: new Date(),
        });

      await queryClient.invalidateQueries({ queryKey: ["myNotes"] });
    },
  });

  const saveNote = async (update?: UpdateNoteRequest) => {
    if (!note) return;

    const payload = update || {
      ...note,
      content: await editor?.getText() ?? note.content,
      html: await editor?.getHTML() ?? note.html,
      importance: note.importance,
      updatedAt: new Date(),
      categories: note.categories ?? undefined,
    };

    console.log("payload", payload);
    console.log("importance", payload.importance);

    if (note._id !== "new" && note._id) {
      
      saveNoteMutation.mutate({payload, method: "PUT"});
    } else {
      saveNoteMutation.mutate({payload});
    }
  };

  return { saveNote, saveNoteMutation };
}
