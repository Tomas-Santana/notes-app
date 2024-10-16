import z from "zod";

export const CategorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    userId: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;