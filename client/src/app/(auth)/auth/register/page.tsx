"use client"

import { queryClient } from "@/_core/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import SignUpForm from "./SignUpForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthPage() {

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-12  flex flex-col relative lg:col-span-6 lg:bg-white lg:border-r lg:border-gray-300 xl:col-span-5 ">
          <div className="hidden pt-4 pl-4 sm:flex items-center gap-4">
            <Button
              size="icon"
              className="rounded-full bg-[#5f2858] hover:bg-[#5f2858]/90"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="hidden sm:block text-2xl font-extrabold">Refuge de Lorem</h1>
          </div>
          <div className="flex items-center justify-center h-full">
            <SignUpForm />
          </div>
        </div>
        <div className="relative hidden lg:col-span-6 lg:grid lg:grid-cols-12 xl:col-span-7">
          <div className="hidden xl:block xl:col-span-4">
            <div className="absolute right-[55%] w-[240px] top-[22%] flex flex-col justify-center items-center gap-4 2xl:w-[275px]">
              <h2 className="font-bold xl:text-5xl 2xl:text-6xl">J'agis, j'adopte.</h2>
              <p>Un geste pour tout changer. Offrez une seconde chance à ceux qui n&apos;attendent que vous.</p>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-8 flex items-center">
            <Image
              src="/assets/auth/woman_dog.png"
              className=""
              width={700}
              height={700}
              alt=""
            />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  )
}