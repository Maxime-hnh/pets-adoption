import { z } from "zod";

export const IncompatibilitySchema = z.object({
  id: z.number(),
  uid: z.string(),
  label: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const ShortIncompatibilitySchema = z.object({
  id: z.number(),
  label: z.string(),
})

export type Incompatibility = z.infer<typeof IncompatibilitySchema>;
export type ShortIncompatibility = z.infer<typeof ShortIncompatibilitySchema>;