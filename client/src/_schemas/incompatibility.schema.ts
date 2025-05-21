import IconCatForbidden from "@/_components/icons/IconCatForbidden";
import IconChildForbidden from "@/_components/icons/IconChildForbidden";
import IconDogForbidden from "@/_components/icons/IconDogForbidden";
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

export const IncompatibilityConfigMap: Record<string, { icon: React.ElementType, label: string }> = {
  "Chats": { icon: IconCatForbidden, label: 'Chats' },
  "Chiens": { icon: IconDogForbidden, label: 'Chiens' },
  "Enfants": { icon: IconChildForbidden, label: 'Enfants' },
}

export type Incompatibility = z.infer<typeof IncompatibilitySchema>;
export type ShortIncompatibility = z.infer<typeof ShortIncompatibilitySchema>;