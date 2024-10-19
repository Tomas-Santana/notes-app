import z from "zod";
import { NoteSchema } from "../Note";

export const SearchNotesRequestSchema = z
  .object({
    query: z.string().min(4).max(50),
  })
  .refine(
    (data) => {
      if (data.query.trim().length < 1) {
        return false;
      }
      return true;
    },
    {
      message:
        "Al menos un caracter debe ser ingresado para realizar la búsqueda.",
      path: ["query"],
    }
  );

export type SearchNotesRequest = z.infer<typeof SearchNotesRequestSchema>;

export const SearchNotesResponseSchema = z.object({
  notes: z.array(NoteSchema).optional().nullable(),
  error: z.string().optional(),
});

export type SearchNotesResponse = z.infer<typeof SearchNotesResponseSchema>;


