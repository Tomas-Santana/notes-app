import z from "zod";

export const SendEmailResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, "Se debe ingresar un email.")
    .max(50, "El email es muy largo.")
    .email("Email invalido.")
    .toLowerCase()
    .trim(),
});

export type SendEmailResetRequest = z.infer<typeof SendEmailResetRequestSchema>;

export const SendEmailResetResponseSchema = z.object({
    message: z.string().optional(),
    error: z.string().optional(),
})

export type SendEmailResetResponse = z.infer<typeof SendEmailResetResponseSchema>;