import { z } from "zod";

export const UserValidator = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

export const LoginValidator = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});
