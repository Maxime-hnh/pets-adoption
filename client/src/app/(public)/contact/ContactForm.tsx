"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { Textarea } from "@/_components/ui/textarea";
import { Button } from "@/_components/ui/button";
import { SendHorizontal } from "lucide-react";

export default function ContactForm() {

  const formSchema = z.object({
    subject: z.string().min(2).max(50),
    fullName: z.string().min(2).max(50),
    email: z.string().min(2).max(50).email("Adresse email non valide"),
    message: z.string().min(2).max(500),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      fullName: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  const { handleSubmit, control, formState: { errors } } = form;
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-2xl shadow-2xl border border-gray-300">
        <FormField
          control={control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sujet</FormLabel>
              <FormControl>
                <Input
                  className="!bg-white border-gray-300 h-10 rounded-xl"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input

                  placeholder="Votre nom complet"
                  className="!bg-white border-gray-300 h-10 rounded-xl"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre email"
                  className="!bg-white border-gray-300 h-10 rounded-xl"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  className="!bg-white border-gray-300 h-10 rounded-xl"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button className="bg-indigo-500">Envoyer <SendHorizontal className="w-4 h-4 ml-2"/></Button>
        </div>
      </form>
    </Form>
  );
}
