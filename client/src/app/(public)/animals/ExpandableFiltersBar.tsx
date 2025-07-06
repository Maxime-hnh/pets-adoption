"use client"
import { Button } from "@/_components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import FiltersBar from "./FiltersBar";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/_components/ui/drawer"
import useWindowSize from "@/_hooks/use-window-size";

export default function ExpandableFiltersBar() {

  const [open, setOpen] = useState(false);
  const { width } = useWindowSize()

  return (
    <Drawer open={width < 768 ? open : false} onOpenChange={setOpen}>
      <DrawerTrigger className="z-20 flex items-center justify-center text-white rounded-full fixed right-4 bottom-[100px] h-12 w-12 bg-emerald-500 hover:bg-emerald-600 sm:hidden">
        <SlidersHorizontal size={20} />
      </DrawerTrigger>
      <DrawerContent className="sm:hidden !max-h-dvh">
        <DrawerHeader className="sm:hidden">
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4 overflow-y-auto pb-4">
          <FiltersBar />
        </div>
        <DrawerFooter className="border-t border-indigo-500 h-[60px] flex justify-center items-center">
          <Button onClick={() => setOpen(false)} variant="outline" className=" !bg-indigo-500 text-white rounded-full max-w-28 mx-auto"><X size={20} /> Fermer</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}