import z from 'zod'
import { CategorySchema } from '../Category'

export const MyCategoriesResponseSchema = z.object({
    categories: z.array(CategorySchema).optional().nullable(),
    error: z.string().optional(),
}).refine(data => {
    // If there are categories, there should be no error
    if (data.categories && data.error) {
        return false;
    }
    return true;
}, {"message": "Invalid response. Either categories or error must be present"});

export type MyCategoriesResponse = z.infer<typeof MyCategoriesResponseSchema>;