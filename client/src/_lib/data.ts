import { animalsServerService } from "@/_services/animals-server.service";
import { cache } from "react";

export const getAllAnimals = cache(async () => {
  const { serverGetAll } = animalsServerService;
  const animals = await serverGetAll();
  return animals;
})

export const getById = cache(async (id: number) => {
  const { serverGetById } = animalsServerService;
  const animal = await serverGetById(Number(id), 300);
  return animal;
})