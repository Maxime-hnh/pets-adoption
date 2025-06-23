"use client"

import SignInForm from "@/_components/forms/SignInForm";
import { queryClient } from "@/_core/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";

export default function AuthPage() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-12 h-full relative">
        <div className="col-span-4 flex flex-col relative">
          <div className="p-8">
            <h1 className="text-2xl font-extrabold">SPA de verson.</h1>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-1/2">
            <SignInForm />
          </div>
        </div>
        <div className="col-span-8 relative">
          <Image
            src="/assets/auth/shelter.png"
            className="h-full w-full absolute top-0 right-0"
            width={600}
            height={600}
            alt=""
          />
        </div>
      </div>
    </QueryClientProvider>
  )
}