import { z } from "zod";

export const coverLetterSchema = z
  .string()
  .min(20, "Cover letter must be at least 20 characters long.");

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  fullname: z.string().min(6, "Full name must be at least 6 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const postJobSchema = z.object({
  role: z
    .string()
    .min(3, "Role must be atleast 3 characters long")
    .max(20, "Role must not exceed 20 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long"),
  compnay: z
    .string()
    .min(3, "Compnay name must be at least 3 characters long")
    .max(20, "Compnay name must not exceed 20 characters"),
  location: z.string().min(5, "Location must be at least 3 characters long"),
  salary: z.string().min(1, "Salary must be at least 1 character long"),
});

export const applyForJobSchema = z.object({
  resume: z.string().url("Invalid URL"),
  coverLetter: z.string().min(20, "Cover letter must have at least 20 characters").max(500, "Cover letter must not exceed 500 letters"),
})