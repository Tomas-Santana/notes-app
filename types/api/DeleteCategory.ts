import z from 'zod'

export type DeleteCategoryRequest = {
    _id: string;
}

export const DeleteCategoryResponseSchema = z.object({
    _id: z.string(),
})

export type DeleteCategoryResponse = z.infer<typeof DeleteCategoryResponseSchema>;