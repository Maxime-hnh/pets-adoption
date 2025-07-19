import { Skeleton } from "@/_components/ui/skeleton";
import Image from "next/image";

export default function Loading() {

  return (
    <section className="relative grid grid-cols-12 md:px-4 sm:gap-4 lg:gap-8 min-h-[calc(100dvh-90px)]">
      {/* Background green */}
      <div className="hidden sm:block absolute right-0 bottom-0 not-odd:h-[128px] w-[40%]  scale-[2] rounded-[50%] bg-custom-green blur-[100px] sm:h-[256px]"></div>
      {/* Background orange */}
      <div
        className="hidden sm:block absolute top-0 left-0 not-odd:h-[210px] w-[40%] rotate-[35deg]  scale-[2] rounded-[50%] bg-custom-orange blur-[50px] sm:h-[256px]"
        style={{ transform: "translate(-35%, -40%)" }}
      />
      <div className="col-span-12 sm:sr-only py-6">
        <h2 className=" min-w-full text-center text-pretty text-3xl md:text-4xl lg:text-5xl lg:max-w-3xl animate-fade-in-down">
          Animaux à adopter
        </h2>
      </div>
      <div className="relative hidden sm:block sm:col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3 3xl:col-span-2">
        <Image
          src="/assets/mascot/mascot_face_paw.png"
          width={96}
          height={96}
          alt=""
          className="hidden sm:block absolute -top-22 left-1/2 -translate-x-1/2 z-30 h-24 w-24"
        />

        <div id="filters-bar-desktop" className="rounded-xl py-6 px-4 shadow-2xl border bg-white">
          <div className=" flex flex-col gap-4 mt-4">
            <Skeleton className="h-[720px] w-full" />
          </div>
        </div>
      </div>
      <div className=" z-10 px-4 sm:px-0 col-span-12 sm:col-span-6 md:col-span-7 lg:col-span-8 xl:col-span-9 3xl:col-span-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 pb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="col-span-1" key={i}>
              <Skeleton className="h-[440px] w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}