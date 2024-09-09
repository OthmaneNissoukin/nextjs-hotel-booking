import { z } from "zod";

export const profileSchema = z.object({
  fullname: z.string().min(3).max(64),
  nationality: z.string(),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Invalid phone number"),
  email: z.string().email("invalid email format"),
});

export const signInSchema = z.object({
  email: z.string().email("invalid email format."),
  password: z.string().min(3).max(64),
});
