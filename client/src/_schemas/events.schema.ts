import { z } from "zod";

export enum EventType {
  FUNDRAISING = "FUNDRAISING",
  OPEN_HOUSE = "OPEN_HOUSE",
  RAFFLE = "RAFFLE", // TOMBOLA
  TRAINING_SESSION = "TRAINING_SESSION",
  OTHER = "OTHER"
}

export const EventTypeSchema = z.nativeEnum(EventType);

export const EventSchema = z.object({
  id: z.number(),
  uid: z.string(),
  title: z.string(),
  description: z.string().optional(),
  type: EventTypeSchema,
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  price: z.number().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  photos: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateEventSchema = EventSchema.omit({
  id: true,
  uid: true,
  createdAt: true,
  updatedAt: true,
});

export type EventEntity = z.infer<typeof EventSchema>;
export type CreateEventEntity = z.infer<typeof CreateEventSchema>;