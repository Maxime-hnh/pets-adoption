'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/_services/auth.service";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "@/_stores/auth.store";
import { useRouter } from 'next/navigation';
import { Role } from "@/_types/role.interface";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";
import { Checkbox } from "@/_components/ui/checkbox";
import Link from "next/link";
import { PasswordStrengthIndicator } from "@/_components/ui/password-strength-indicator";
import { useState } from "react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const setLoggedUser = useAuthStore((state) => state.setLoggedUser);

  const router = useRouter();

  const formSchema = z.object({
    firstName: z.string().min(1, "Le prénom est requis").max(50, "Le prénom ne peut pas dépasser 50 caractères"),
    lastName: z.string().min(1, "Le nom est requis").max(50, "Le nom ne peut pas dépasser 50 caractères"),
    email: z.string().email("Adresse email non valide"),
    password: z.string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(50, "Le mot de passe ne peut pas dépasser 50 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(/[^\w\s]/, "Le mot de passe doit contenir au moins un caractère spécial"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: "Vous devez accepter les conditions générales"
    })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"]
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
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
    // loginMutation.mutate(values)
    console.log(values);
  }

  return (

    <Form {...form}>
      <div className="h-full relative p-6 w-dvw sm:w-[450px] sm:h-fit sm:bg-white sm:border sm:border-gray-300 sm:rounded-lg sm:shadow-md lg:shadow-none lg:border-none lg:rounded-none">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex flex-col items-center justify-center gap-2">
          <Button
            size="icon"
            className="rounded-full bg-[#5f2858] hover:bg-[#5f2858]/90 absolute top-4 left-4 sm:hidden"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl lg:text-2xl font-bold">Inscription</h1>
            <p className="text-sm text-gray-500">Accédez à toutes nos fonctionnalités</p>
          </div>
          <div className="flex flex-row flex-nowrap gap-2 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre prénom"
                      className="!bg-[#fffae9] border-0 border-b border-gray-300 shadow-none rounded-none focus-visible:ring-0 sm:!bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Votre nom"
                      className="!bg-[#fffae9] border-0 border-b border-gray-300 shadow-none rounded-none focus-visible:ring-0 sm:!bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre adresse mail"
                    className="!bg-[#fffae9] border-0 border-b border-gray-300 shadow-none rounded-none focus-visible:ring-0 sm:!bg-white"
                    {...field}
                  />
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
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Votre mot de passe"
                      className="!bg-[#fffae9] border-0 border-b border-gray-300 shadow-none rounded-none focus-visible:ring-0 pr-10 sm:!bg-white"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <FormMessage />
                <div className="mt-2">
                  <PasswordStrengthIndicator password={field.value} />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmez votre mot de passe"
                      className="!bg-[#fffae9] border-0 border-b border-gray-300 shadow-none rounded-none focus-visible:ring-0 pr-10 sm:!bg-white"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 sm:space-x-3 space-y-0 w-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 h-4 w-4 sm:h-5 sm:w-5"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs sm:text-sm font-normal text-brand-orange">
                    J'accepte les <Link href="/terms" className="!text-orange-500 hover:!underline">conditions générales d'utilisation</Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-12 bg-orange-500" disabled={loginMutation.isPending}>
            {loginMutation.isPending
              ? <Loader2 className="animate-spin" />
              : "S'inscrire"
            }
          </Button>
        </form>
        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border my-4">
          <span className="text-xs text-muted-foreground">Ou</span>
        </div>

        <Button
          type="button"
          className="w-full h-12 !bg-[#5f2858] text-white"
          variant="outline"
          onClick={() => router.push('/auth/login')}
        >
          Se connecter
        </Button>
      </div>

    </Form>
  )
}