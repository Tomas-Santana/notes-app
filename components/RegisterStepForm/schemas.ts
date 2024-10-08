import z from "zod";

export const emailSchema = z.object({
    email: z
      .string()
      .min(1, "Se debe ingresar un email.")
      .max(25, "El email es muy largo.")
      .email("Email invalido.")
      .toLowerCase(),
  });
  
  export type EmailSchema = z.infer<typeof emailSchema>;
  
  export const personalInfoSchema = z.object({
    firstName: z.string().min(1, "Se debe ingresar un nombre."),
    lastName: z.string().min(1, "Se debe ingresar un apellido."),
  });
  
  export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
  
  export const passwordSchema = z
    .object({
      password: z
        .string()
        .min(8, "Se debe ingresar una contraseña.")
        .max(50, "La contraseña es muy larga."),
      // })
      confirmPassword: z
        .string()
        .min(1, "Ingresa la contraseña de nuevo.")
        .max(50, "La contraseña es muy larga."),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden.",
      path: ["confirmPassword"],
    });
  
  export type PasswordSchema = z.infer<typeof passwordSchema>;
  
  export const fullSchema = z.object({
      email: emailSchema,
      personalInfo: personalInfoSchema,
      password: passwordSchema,
  });
  
  export type FullSchema = z.infer<typeof fullSchema>;