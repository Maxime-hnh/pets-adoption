"use client";

import { ShortIncompatibility } from "@/_schemas/incompatibility.schema";
import FiltersBar from "./FiltersBar";
import { Animal } from "@/_schemas/animal.schema";
import { useAnimalsStore } from "@/_stores/animals.store";
import { useEffect, useRef, useState } from "react";
import AnimalCard from "@/_components/AnimalCard";
import Image from "next/image";
import ExpandableFiltersBar from "./ExpandableFiltersBar";
import { ScrollArea } from "@/_components/ui/scroll-area";
import { Button } from "@/_components/ui/button";
import { Rocket } from "lucide-react";

export default function ClientAnimalsWrapper({ animals, incompatibilities }: { animals: Animal[], incompatibilities: ShortIncompatibility[] }) {

  const setIncompatibilities = useAnimalsStore((state => state.setIncompatibilities))
  const setAnimals = useAnimalsStore((state) => state.setAnimals)
  const filteredAnimals = useAnimalsStore((state) => state.filteredAnimals);
  const filterDesktopContainer = useRef<HTMLDivElement>(null);
  const [filterDesktopContainerHeight, setFilterDesktopContainerHeight] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (filterDesktopContainer.current) {
        setFilterDesktopContainerHeight(filterDesktopContainer.current.scrollHeight)
      }
    })
  }, [filteredAnimals])

  console.log(filterDesktopContainerHeight)

  useEffect(() => {
    setAnimals(animals)
    setIncompatibilities(incompatibilities)
  }, [animals, incompatibilities, setAnimals, setIncompatibilities])

  const handleClick = () => {
    const target = document.querySelector("main")
    console.log(target)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <>
      <div ref={filterDesktopContainer} className="relative hidden sm:block sm:col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3 3xl:col-span-2">
        <Image
          src="/assets/mascot/mascot_face_paw.png"
          width={500}
          height={500}
          alt=""
          className="hidden sm:block absolute -top-22 left-1/2 -translate-x-1/2 z-30 h-24 w-24"
        />

        <div id="filters-bar-desktop" className="rounded-xl py-6 px-4 shadow-2xl border bg-white">
          <div className=" flex flex-col gap-4 mt-4">
            <FiltersBar />
          </div>
        </div>
        {filterDesktopContainerHeight > 1380
          && <Button
            className="group hover:animate-bounce absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full w-12 h-12 bg-indigo-500 hover:bg-indigo-500"
            onClick={() => handleClick()}
          >
            <Rocket className="!h-5 !w-5 group-hover:animate-vibrate -rotate-45" />
          </Button>
        }
      </div>
      <ExpandableFiltersBar />
      <div color={"bg-indigo-500"} className=" z-10 px-4 sm:px-0 col-span-12 sm:col-span-6 md:col-span-7 lg:col-span-8 xl:col-span-9 3xl:col-span-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 pb-8">
          {filteredAnimals.length > 0 ? filteredAnimals.map((animal, i) =>
            <div className="col-span-1" key={i}>
              <AnimalCard animal={animal} />
            </div>
          ) : (
            <div className="col-span-12 flex justify-center items-center h-[calc(100dvh-205px)] sm:h-[calc(100dvh-90px)]">
              <h2 className="text-2xl font-semibold text-center ">Aucun animal trouvé...</h2>
            </div>
          )}
        </div>
      </div>
    </>
  )
}