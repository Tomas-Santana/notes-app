import CategoryController from "@/api/controllers/CategoryController";
import myToast from "@/components/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MyCategoriesResponse } from "@/types/api/MyCategories";

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    const deleteCategoryMutation = useMutation({
        mutationFn: CategoryController.deleteCategory,
        onMutate: async (id) => {
            // Optimistic update
            queryClient.cancelQueries({ queryKey: ["categories"] });

            const previousCategories = queryClient.getQueryData<MyCategoriesResponse>(["categoriess"]);

            if (previousCategories && previousCategories.categories) {
                queryClient.setQueryData<MyCategoriesResponse>(["categories"], {
                    categories: previousCategories.categories.filter((category) => category._id !== id),
                });
            }

            return { previousCategories };
        },
        onError: (error, _, context) => {
            myToast(false, error.message);

            queryClient.setQueryData(["categories"], context?.previousCategories);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    return deleteCategoryMutation;
};