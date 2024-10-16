import NoteController from "@/api/controllers/NoteController"
import myToast from "@/components/toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MyNotesResponse } from "@/types/api/MyNotes"

export const useDeleteNote = () => {
  const queryClient = useQueryClient()
  const deleteNoteMutation = useMutation({
    mutationFn: NoteController.deleteNote,
    onMutate: async ({_id}) => {
      // Optimistic update
      queryClient.cancelQueries({queryKey: ["myNotes"]})

      const previousNotes = queryClient.getQueryData<MyNotesResponse>(["myNotes"])

      if (previousNotes && previousNotes.notes) {
        queryClient.setQueryData<MyNotesResponse>(["myNotes"], {
          notes: previousNotes.notes.filter(note => note._id !== _id)
        })
      }

      return { previousNotes}
    },
    onError: (error, _, context) => {
      myToast(false, error.message)

      queryClient.setQueryData(["myNotes"], context?.previousNotes)
    },

    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["myNotes"]})
    }
  })

  return deleteNoteMutation
}