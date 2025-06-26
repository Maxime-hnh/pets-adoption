"use client"
import { useAuthStore } from "@/_stores/auth.store";
import { redirect } from "next/navigation";

export default function ProfilePage() {

  const loggedUser = useAuthStore((state) => state.loggedUser)
  if (!loggedUser) redirect('/')

  return (
    <div>
      <h1>{`Bienvenue ${loggedUser.email}`}</h1>
    </div>
  )
}