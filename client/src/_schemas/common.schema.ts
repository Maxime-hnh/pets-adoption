import { z } from "zod";

export const DeleteManySchema = z.object({
  ids: z.array(z.number()),
})
export type DeleteManyEntity = z.infer<typeof DeleteManySchema>;
