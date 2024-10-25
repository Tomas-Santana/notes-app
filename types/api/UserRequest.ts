import { z } from "zod";

export type UserDeleteRequest = {
  _id: string;
}

export type UserUpdateRequest = {
  _id: string;
  firstName: string;
  lastName: string;
}

export const UserDeleteSchema = z.object({
  _id: z.string(),
})

export const UserFormSchema = z.object({
  firstName: z.string().min(1, "Se debe ingresar un nombre.").max(50, "El nombre es muy largo."),
  lastName: z.string().min(1, "Se debe ingresar un apellido.").max(50, "El apellido es muy largo."),
})

export const UserUpdateSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
})

export type UserDeleteResponse = z.infer<typeof UserDeleteSchema>;

export type UserUpdateResponse = z.infer<typeof UserUpdateSchema>;