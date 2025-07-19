import { Skeleton } from "@/_components/ui/skeleton";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Camera, Heart, PawPrint } from "lucide-react";

export default function Loading() {

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden sm:block">
        <section id="animalProfile_container">
          <div className="w-full h-[calc(100vh-90px)]">
            <div className="flex flex-col gap-4 w-full h-full">
              
              {/* Main Hero Section */}
              <div className="bg-[#f5f3e4] h-2/3 md:px-5 lg:px-20 xl:px-50 2xl:px-75 flex justify-center items-center">
                <div className="grid grid-cols-12 gap-12">
                  
                  {/* Left Column - Text Content */}
                  <div className="flex flex-col gap-8 col-span-6 xl:col-span-7">
                    {/* Badges */}
                    <div className="flex flex-row gap-4">
                      <Skeleton className="h-8 w-40 rounded-full" />
                      <Skeleton className="h-8 w-32 rounded-full" />
                    </div>
                    
                    {/* Title */}
                    <Skeleton className="h-12 w-80" />
                    
                    {/* Description */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col lg:flex-row gap-4">
                      <Skeleton className="h-14 w-60" />
                      <Skeleton className="h-14 w-48" />
                    </div>
                  </div>

                  {/* Right Column - Image */}
                  <div className="relative w-[20rem] h-full lg:w-[25rem] col-span-6 xl:col-span-5">
                    <AspectRatio ratio={1}>
                      <Skeleton className="rounded-3xl w-full h-full" />
                    </AspectRatio>
                    {/* Favorite Button */}
                    <Skeleton className="absolute -bottom-6 -right-6 h-14 w-12 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Info Cards Section */}
              <div className="h-1/3 flex flex-row gap-8 justify-center items-center">
                {/* Race Card */}
                <div className="h-42 w-52 bg-white rounded-3xl">
                  <div className="h-full w-full bg-emerald-500/40 rounded-3xl">
                    <div className="flex flex-col justify-center gap-1 items-center h-full">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
                
                {/* Age Card */}
                <div className="h-42 w-52 bg-white rounded-3xl">
                  <div className="h-full w-full bg-amber-500/40 rounded-3xl">
                    <div className="flex flex-col justify-center gap-1 items-center h-full">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
                
                {/* Gender Card */}
                <div className="h-42 w-52 bg-white rounded-3xl">
                  <div className="h-full w-full bg-blue-500/40 rounded-3xl">
                    <div className="flex flex-col justify-center gap-1 items-center h-full">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div id="animalProfile_description" className="bg-[#f5e0e3] px-10 lg:px-25 xl:px-50 2xl:px-75 flex flex-col gap-16 justify-center items-center py-20">
            <div className="flex flex-row gap-4 items-center">
            <Heart className="fill-current text-red-500 !h-10 !w-10" />
            <h3 className="font-fredoka font-[700] text-4xl">Mon histoire</h3>
            </div>
            <div className="bg-white shadow-2xl p-12 rounded-3xl w-[740px] lg:max-w-2/3">
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>

          {/* Additional Photos Section */}
          <div id="animalProfile_photos" className="py-20 px-10 lg:px-25 xl:px-35 2xl:px-55 flex flex-col gap-16 justify-center items-center">
            <h3 className="font-fredoka font-[700] text-4xl">Plus de photos de <Skeleton className="inline-block h-10 w-32" /></h3>
            <div className="flex flex-row gap-4 justify-start items-center max-w-full overflow-x-auto">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="min-w-80 max-w-80">
                  <AspectRatio ratio={1}>
                    <Skeleton className="rounded-3xl w-full h-full" />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Version */}
      <div className="block sm:hidden">
        <section id="animalProfile_container">
          <div className="w-full">

            {/* Image Section */}
            <div className="relative">
              {/* Header Buttons */}
              <div className="absolute top-8 z-10 w-full px-4 flex justify-between">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              
              {/* Main Image */}
              <AspectRatio ratio={1}>
                <Skeleton className="w-full h-full" />
              </AspectRatio>
              
              {/* Info Card Overlay */}
              <div className="absolute -bottom-12 right-1/2 translate-x-1/2 w-7/8 h-25 bg-white rounded-3xl shadow-2xl">
                <div className="h-full flex flex-row gap-4 py-2 px-8 justify-between">
                  <div className="flex flex-col justify-between">
                    <Skeleton className="h-8 w-32" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-24" />
                      <div className="flex flex-row flex-nowrap items-center gap-1">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="flex flex-col gap-4 pt-18 px-4">
              <div className="flex flex-row gap-2 items-center">
              <PawPrint className="!w-6 !h-6 -rotate-45 text-indigo-500" strokeWidth={2.5} />
              <h2 className="text-2xl font-fredoka font-[700]">À propos de <Skeleton className="inline-block h-6 w-20" /></h2>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* Race Card */}
                <div className="h-21 bg-white rounded-xl">
                  <div className="h-full w-full bg-emerald-500/50 rounded-xl px-2 py-2">
                    <div className="flex flex-col items-start gap-1 h-full">
                      <Skeleton className="h-5 w-12" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
                
                {/* Age Card */}
                <div className="h-21 bg-white rounded-xl">
                  <div className="h-full w-full bg-amber-500/50 rounded-xl px-2 py-2">
                    <div className="flex flex-col items-start gap-1 h-full">
                      <Skeleton className="h-5 w-8" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                </div>
                
                {/* Gender Card */}
                <div className="h-21 bg-white rounded-xl">
                  <div className="h-full w-full bg-blue-500/50 rounded-xl px-2 py-2">
                    <div className="flex flex-col items-start gap-1 h-full">
                      <Skeleton className="h-5 w-10" />
                      <Skeleton className="h-4 w-14" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 px-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>

            {/* Photos Section */}
            <div className="flex flex-col gap-4 py-8 px-4">
              <div className="flex flex-row gap-2 items-center">
              <Camera className="!w-6 !h-6 text-indigo-500" strokeWidth={2.5} />
              <h2 className="text-2xl font-fredoka font-[700]">Plus de photos</h2>
              </div>

              <div className="flex flex-col gap-4 max-w-full">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="w-full h-80" />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pb-8 px-4">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}