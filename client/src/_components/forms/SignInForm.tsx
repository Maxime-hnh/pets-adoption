'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/_services/auth.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/_stores/auth.store";
import { useRouter } from 'next/navigation';
import { Role } from "@/_types/role.interface";


export default function SignInForm() {

  const setLoggedUser = useAuthStore((state) => state.setLoggedUser);
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().min(2).max(50).email("Adresse email non valide"),
    password: z.string().min(8).max(50)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })


  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (user) => {
      setLoggedUser(user);
      toast.success(`Connexion réussie !`);
      if (user.role === Role.SUPERADMIN) {
        router.push('/admin');
      } else {
        router.push('/')
      }
    },
    onError: (error: any) => {
      toast.error("Échec de la connexion", {
        description: error?.message ?? "Vérifie ton email et mot de passe.",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values)
  }

  return (

    <Form {...form}>
      <div className="p-6 border-2 shadow rounded-2xl w-[450px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-xl font-bold">Connexion </h1>
            <p className="text-sm text-gray-500">Connectez-vous pour accéder à votre compte</p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Votre adresse mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input placeholder="Votre mot de passe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending
              ? <Loader2 className="animate-spin" />
              : "Connexion"
            }
          </Button>
        </form>
        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border my-4">
          <span className="text-xs text-muted-foreground">Ou</span>
        </div>

        <Button type="button" className="w-full" variant="outline">Inscription</Button>
      </div>

    </Form>
  )
}