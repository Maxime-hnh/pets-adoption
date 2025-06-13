"use client"

import SignInForm from "@/_components/forms/SignInForm";
import { queryClient } from "@/_core/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function SignIn() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-[calc(100dvh-120px)] pt-20 flex items-start justify-center">
        <SignInForm />
      </div>
    </QueryClientProvider>
  )
}