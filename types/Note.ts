import z from 'zod'

export const NoteSchema = z.object({
    _id: z.string(),
    title: z.string(),
    preview: z.string(),
    content: z.string(),
    html: z.string(),
    isFavorite: z.boolean(),
    createdAt: z.date({coerce: true}),
    updatedAt: z.date({coerce: true}),
    userId: z.any(),
    importance: z.number().min(0).max(5),
});

export type Note = z.infer<typeof NoteSchema>;

