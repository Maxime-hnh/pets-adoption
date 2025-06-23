"use client"

import { queryClient } from "@/_core/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import SignUpForm from "./SignUpForm";

export default function AuthPage() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-5 flex flex-col relative">
          <div className="p-8">
            <h1 className="text-2xl font-extrabold">SPA de verson</h1>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-1/2">
            <SignUpForm />
          </div>
        </div>
        <div className="col-span-7 grid grid-cols-12">
          <div className="col-span-4 flex flex-col justify-center items-center gap-4 mb-16">
            <h2 className="font-bold text-6xl">J'agis, j'adopte.</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, cumque?</p>
          </div>

          <div className="col-span-8 flex items-center">
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