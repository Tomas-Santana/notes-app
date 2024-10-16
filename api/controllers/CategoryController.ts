import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  CreateCategoryResponseSchema,
} from "@/types/api/CreateCategory";
import { DeleteCategoryRequest, DeleteCategoryResponse, DeleteCategoryResponseSchema } from "@/types/api/DeleteCategory";
import { superFetch} from "./superFetch";
import { MyCategoriesResponse, MyCategoriesResponseSchema } from "@/types/api/MyCategories";

export default class CategoryController {
  static async createCategory(
    payload: CreateCategoryRequest
  ): Promise<CreateCategoryResponse> {
    try {
      const res = await superFetch<
        CreateCategoryRequest,
        CreateCategoryResponse,
        "category"
      >({
        options: {
          method: "POST",
          includeCredentials: true,
        },
        route: "category",
        payload: payload,
        responseSchema: CreateCategoryResponseSchema,
      });
      console.log("createCategory", res);
      return res;
    } catch (error) {
      console.log(error);
      throw new Error("Create category failed");
    }
  }

  static async getCategories() {
    try {
      const res = await superFetch<undefined, MyCategoriesResponse, "categories">({
        options: {
          method: "GET",
          includeCredentials: true,
        },
        route: "categories",
        responseSchema: MyCategoriesResponseSchema,
      });
        console.log("getCategories", res);
        if (res.error) {
            throw new Error(res.error);
        }


        return res;
    } catch (error) {
        console.log(error);
        throw new Error("Get categories failed");
    }
  }

  static async deleteCategory(id: string) {
    try {
      const res = await superFetch<undefined, DeleteCategoryResponse, "category/[id]">({
        options: {
          method: "DELETE",
          includeCredentials: true,
        },
        route: "category/[id]",
        params: [id],
        responseSchema: DeleteCategoryResponseSchema,
      });
      console.log("deleteCategory", res);
      return res;
    } catch (error) {
      console.log(error);
      throw new Error("Delete category failed");
    }
  }
}
