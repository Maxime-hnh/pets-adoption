"use client";

import { ShortIncompatibility } from "@/_schemas/incompatibility.schema";
import FiltersBar from "./filters-bar";
import { Animal } from "@/_schemas/animal.schema";
import { useAnimalsStore } from "@/_stores/animals.store";
import { Suspense, useEffect } from "react";
import AnimalCard from "@/_components/AnimalCard";
import Image from "next/image";

export default function ClientAnimalsWrapper({ animals, incompatibilities }: { animals: Animal[], incompatibilities: ShortIncompatibility[] }) {

  const setIncompatibilities = useAnimalsStore((state => state.setIncompatibilities))
  const setAnimals = useAnimalsStore((state) => state.setAnimals)
  const filteredAnimals = useAnimalsStore((state) => state.filteredAnimals);

  useEffect(() => {
    setAnimals(animals)
    setIncompatibilities(incompatibilities)
  }, [animals, incompatibilities, setAnimals, setIncompatibilities])


  return (
    <>
      <div className="relative md:col-span-5 lg:col-span-4 xl:col-span-3 3xl:col-span-2">
        <Image
          src="/assets/mascot/mascot_face_paw.png"
          width={500}
          height={500}
          alt=""
          className="absolute -top-22 left-1/2 -translate-x-1/2 z-30 h-24 w-24"
        />
        <div className="rounded-xl py-6 px-4 shadow-2xl border bg-white">
          <div className=" flex flex-col gap-4">
            <FiltersBar />
          </div>
        </div>
      </div>
      <div className="md:col-span-7 lg:col-span-8 xl:col-span-9 3xl:col-span-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4">
          {filteredAnimals.map((animal, i) =>
            <div className="col-span-1" key={i}>
              <AnimalCard animal={animal} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}