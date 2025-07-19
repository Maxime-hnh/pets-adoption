"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { Textarea } from "@/_components/ui/textarea";
import { Button } from "@/_components/ui/button";
import { SendHorizontal } from "lucide-react";
import { CreateMessageEntity, MessageSchema } from "@/_schemas/message.schema";
import { useCreateMessage } from "@/_hooks/messages/useCreateMessage";
import { useAuthStore } from "@/_stores/auth.store";

export default function ContactForm() {

  const createMessage = useCreateMessage();
  const loggedUser = useAuthStore(state => state.loggedUser);
  
  const form = useForm<CreateMessageEntity>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      subject: "",
      content: "",
      emailSender: "",
      nameSender: "",
      userId: loggedUser?.id || undefined,
    },
  })

  function onSubmit(data: CreateMessageEntity) {
    createMessage.mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  const { handleSubmit, control } = form;
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 rounded-2xl shadow-2xl border border-gray-300 w-full lg:w-[450px]"
      >
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
          name="nameSender"
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
          name="emailSender"
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  className="!bg-white border-gray-300 h-30 rounded-xl"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button className="bg-indigo-500" type="submit">Envoyer <SendHorizontal className="w-4 h-4 ml-2" /></Button>
        </div>
      </form>
    </Form>
  );
}
