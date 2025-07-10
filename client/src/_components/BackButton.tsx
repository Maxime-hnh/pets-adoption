"use client"

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      size="icon"
      className="rounded-full !bg-white/15 backdrop-blur-xl hover:bg-white/50"
      onClick={() => router.back()}
    >
      <ArrowLeft className="!w-6 !h-6" />
    </Button>
  )
}