import { z } from "zod"

export const createUrlSchema = z.object({
  url: z
    .string()
    .trim()
    .url("Please enter a valid URL")
    .refine(
      (value) => {
        try {
          const url = new URL(value)

          return url.protocol === "http:" || url.protocol === "https:"
        } catch {
          return false
        }
      },
      {
        message: "Only HTTP and HTTPS URLs are supported",
      },
    ),
})