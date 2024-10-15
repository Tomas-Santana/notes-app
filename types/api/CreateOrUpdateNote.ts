import z from 'zod'

export type CreateNoteRequest = {
    title: string;
    content: string;
    html: string;
    isFavorite: boolean;
    importance: number;
}

export type UpdateNoteRequest = {
    _id: string;
    title?: string;
    content?: string;
    html?: string;
    isFavorite?: boolean;
    importance?: number;
}

export const CreateOrUpdateNoteResponseSchema = z.object({
    noteId: z.string(),
});

export type CreateOrUpdateNoteResponse = z.infer<typeof CreateOrUpdateNoteResponseSchema>;