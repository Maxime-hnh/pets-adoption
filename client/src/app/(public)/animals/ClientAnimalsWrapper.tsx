"use client";

import { ShortIncompatibility } from "@/_schemas/incompatibility.schema";
import FiltersBar from "./filters-bar";
import { Animal } from "@/_schemas/animal.schema";
import { useAnimalsStore } from "@/_stores/animals.store";
import { Suspense, useEffect } from "react";
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
      <div className="col-span-3">
        <div className="rounded-xl py-6 px-4 shadow-2xl border bg-white">
          <div className="flex flex-col gap-4">
            {/* <h2 className="font-inter font-[900] text-xl">Je trouve mon compagnon</h2> */}
            <FiltersBar />
          </div>
        </div>
      </div>
      <div className="col-span-9">
        <div className="grid grid-cols-4 gap-4">
          {filteredAnimals.map((animal, i) =>
            <div className="col-span-1 bg-white rounded-2xl shadow-md border" key={i}>
              {animal.photos && animal.photos.length > 0 && animal.photos![0] && <Image
                src={animal.photos![0]}
                alt=""
                width={50}
                height={50}
              />
              }
              <p>{animal.name}</p>
              <p>{animal.icadNumber}</p>
              <p>{animal.species}</p>
              <p>{animal.breed}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}