import { z } from "zod";

export enum MessageStatus {
  RECEIVED = "RECEIVED",
  OPENED = "OPENED",
  DELETED = "DELETED",
  SPAM = "SPAM"
}

export const MessageStatusSchema = z.nativeEnum(MessageStatus).optional();

export const MessageSchema = z.object({
  id: z.number().optional(),
  uid: z.string().optional(),
  subject: z.string(),
  content: z.string(),
  emailSender: z.string(),
  nameSender: z.string(),
  status: MessageStatusSchema,
  internalNotes: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional(),
  userId: z.number().optional(),
  // user: UserSchema,
})

export type MessageEntity = z.infer<typeof MessageSchema>;

export const CreateMessageSchema = MessageSchema.omit({
  id: true,
  uid: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  status: true,
})

export const UpdateStatusSchema = MessageSchema.pick({
  status: true,
})

export const UpdateNoteSchema = MessageSchema.pick({
  internalNotes: true,
})

export const DeleteManySchema = z.object({
  ids: z.array(z.number()),
})

export type CreateMessageEntity = z.infer<typeof CreateMessageSchema>;
export type UpdateStatusEntity = z.infer<typeof UpdateStatusSchema>;
export type UpdateNoteEntity = z.infer<typeof UpdateNoteSchema>;
export type DeleteManyEntity = z.infer<typeof DeleteManySchema>;
