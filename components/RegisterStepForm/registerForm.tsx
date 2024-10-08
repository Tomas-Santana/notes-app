import { useState } from "react";
import z from "zod";



const emailSchema = z.object({
    email: z
      .string()
      .min(1, "Se debe ingresar un email.")
      .max(25, "El email es muy largo.")
      .email("Email invalido.")
      .toLowerCase(),
});

type EmailSchema = z.infer<typeof emailSchema>;

const personalInfoSchema = z.object({
    firstName: z.string().min(1, "Se debe ingresar un nombre."),
    lastName: z.string().min(1, "Se debe ingresar un apellido."),
});

type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;

const passwordSchema = z.object({
    password: z
      .string()
      .min(8, "Se debe ingresar una contraseña.")
      .max(50, "La contraseña es muy larga."),
    // })
    confirmPassword: z
      .string()
      .min(1, "Ingresa la contraseña de nuevo.")
      .max(50, "La contraseña es muy larga."),
    }).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
});

type PasswordSchema = z.infer<typeof passwordSchema>;

export default function RegisterForm() {


}