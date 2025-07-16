"use client"

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/_lib/cn";


interface ContactButtonProps {
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "lg" | "xl" | "2xl" | "3xl";
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
}

export default function ContactButton(
  { className, icon, size, variant, iconPosition = "right"

  }: ContactButtonProps) {

  const router = useRouter();

  const handleClick = () => {
    router.push("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Button
      className={cn("", className)}
      size={size}
      variant={variant}
      onClick={handleClick}
    >
      {iconPosition === "left" && icon}
      Nous Contacter
      {iconPosition === "right" && icon}
    </Button>

  )
}