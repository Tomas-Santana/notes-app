import z from 'zod'
import { CategorySchema } from '../Category';

export const CreateCategoryRequestSchema = z.object({
    name: z.string().min(3, {
        message: 'El nombre de la categoría debe tener al menos 3 caracteres',
    }).max(50, {
        message: 'El nombre de la categoría debe tener como máximo 50 caracteres',
    }),
});

export type CreateCategoryRequest = z.infer<typeof CreateCategoryRequestSchema>;

export const CreateCategoryResponseSchema = z.object({
    category: CategorySchema.optional(),
    error: z.string().optional(),
});

export type CreateCategoryResponse = z.infer<typeof CreateCategoryResponseSchema>;



