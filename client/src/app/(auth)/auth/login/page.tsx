"use client"

import SignInForm from "@/_components/forms/SignInForm";
import { queryClient } from "@/_core/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {


  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-12 h-full relative">
        <div className="col-span-12 flex flex-col relative xl:col-span-4">
          <div className="pt-4  pl-4 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Button
                size="icon"
                className="rounded-full bg-[#5f2858] hover:bg-[#5f2858]/90"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="block text-2xl font-extrabold">Refuge de Lorem</h1>
            </Link>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-1/2">
            <SignInForm />
          </div>
        </div>
        <div className="hidden relative xl:block xl:col-span-8">
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