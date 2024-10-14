import z from 'zod'
import { NoteSchema, type Note } from "../Note";

export const MyNotesResponseSchema = z.object({
    notes: z.array(NoteSchema).optional().nullable(),
    error: z.string().optional(),
}).refine(data => {
    // If there are notes, there should be no error
    if (data.notes && data.error) {
        return false;
    }
    if (!data.notes && !data.error) {
        return false;
    }
    return true;
}, {"message": "Invalid response. Either notes or error must be present"});

export type MyNotesResponse = z.infer<typeof MyNotesResponseSchema>;