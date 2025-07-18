import { animalsServerService } from "@/_services/animals-server.service";
import { eventsServerService } from "@/_services/events-server.service";
import { incompatibilitiesServerService } from "@/_services/incompatibilities-server.service";
import { cache } from "react";

export const getAllAnimals = cache(async () => {
  const { serverGetAll } = animalsServerService;
  const animals = await serverGetAll();
  return animals;
})

export const getAnimalById = cache(async (id: number) => {
  const { serverGetById } = animalsServerService;
  const animal = await serverGetById(Number(id), 300);
  return animal;
})

export const getEventById = cache(async (id: number) => {
  const { serverGetById } = eventsServerService;
  const event = await serverGetById(Number(id), 300);
  return event;
})

export const getIncompatibilities = cache(async () => {
  const { serverGetIncompatibilities } = incompatibilitiesServerService;
  const incompatibilities = await serverGetIncompatibilities();
  return incompatibilities;
})