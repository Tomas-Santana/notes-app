import { z } from "zod";
import { NoteSchema, type Note } from "../Note";

export interface GetNoteRequest {
    id: string;
}

export const GetNoteResponseSchema = z.object({
    note: NoteSchema.optional(),
    error: z.string().optional(),
}).refine(data => {
    if (data.note && data.error) {
        return false;
    }

    if (!data.note && !data.error) {
        return false;
    }

    return true;
}, {"message": "Invalid response. Either note or error must be present"});

export type GetNoteResponse = z.infer<typeof GetNoteResponseSchema>;