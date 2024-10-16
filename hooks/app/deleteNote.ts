import NoteController from "@/api/controllers/NoteController"
import myToast from "@/components/toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const deleteNote = () => {
  const queryClient = useQueryClient()
  const deleteNoteMutation = useMutation({
    mutationFn: NoteController.deleteNote,
    onSuccess: () => {
      myToast(true, "Nota borrada exitosamente!")
      queryClient.invalidateQueries({ queryKey: ["myNotes"] })
    },
    onError: (error) => myToast(false, error.message)
  })

  return deleteNoteMutation
}