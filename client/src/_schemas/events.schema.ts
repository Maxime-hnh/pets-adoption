import { z } from "zod";
import { DollarSign } from "lucide-react";
import { House } from "lucide-react";
import { Ticket } from "lucide-react";
import { Dog } from "lucide-react";



export enum EventType {
  FUNDRAISING = "FUNDRAISING",
  OPEN_HOUSE = "OPEN_HOUSE",
  RAFFLE = "RAFFLE", // TOMBOLA
  TRAINING_SESSION = "TRAINING_SESSION",
  OTHER = "OTHER"
}

export const EventTypeLabelMap = {
  [EventType.FUNDRAISING]: "Fondation",
  [EventType.OPEN_HOUSE]: "Open House",
  [EventType.RAFFLE]: "Tombola",
  [EventType.TRAINING_SESSION]: "Session d'entraînement",
  [EventType.OTHER]: "Autre"
}

export const EventTypeConfigMap = {
  [EventType.FUNDRAISING]: { color: "text-green-500", bgColor: "bg-green-500/80", icon: DollarSign },
  [EventType.OPEN_HOUSE]: { color: "text-orange-500", bgColor: "bg-orange-500/80", icon: House },
  [EventType.RAFFLE]: { color: "text-blue-500", bgColor: "bg-blue-500/80", icon: Ticket },
  [EventType.TRAINING_SESSION]: { color: "text-purple-500", bgColor: "bg-purple-500/80", icon: Dog },
  [EventType.OTHER]: { color: "text-gray-500", bgColor: "bg-gray-500/80", icon: Dog },
}


export const EventTypeSchema = z.nativeEnum(EventType);

export const EventSchema = z.object({
  id: z.number().optional(),
  uid: z.string().optional(),
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