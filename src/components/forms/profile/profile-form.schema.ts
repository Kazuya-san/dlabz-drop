import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  dob: z
    .date({
      required_error: "Date of birth is required.",
    })
    .refine(
      (date) => {
        const dob = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        return age >= 13;
      },
      {
        message: "You must be at least 13 years old.",
      }
    ),
});
