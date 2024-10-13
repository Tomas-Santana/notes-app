import z from 'zod'

export type CreateOrUpdateNoteRequest = {
    _id?: string;
    title: string;
    content: string;
    html: string;
}

export const CreateOrUpdateNoteResponseSchema = z.object({
    noteId: z.string(),
});

export type CreateOrUpdateNoteResponse = z.infer<typeof CreateOrUpdateNoteResponseSchema>;