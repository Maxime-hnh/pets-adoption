"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card";
import { Skeleton } from "@/_components/ui/skeleton";
import { useAllMessagesQuery, useFilteredMessages } from "@/_hooks/messages/useMessagesQuery";
import { cn } from "@/_lib/cn";
import { formatElapsedTime } from "@/_lib/utils";
import { MessageEntity, MessageStatus } from "@/_schemas/message.schema";
import { Mail } from "lucide-react";


export default function MessagesList() {

  const { data: messages, isLoading } = useAllMessagesQuery();
  const filteredMessages = useFilteredMessages(messages);

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[136px] rounded-xl" />
        ))
      ) : (
        filteredMessages?.map((message) => (
          <Card key={message.id} className={cn(
            "w-full py-2 gap-2 bg-white",
            message.status === MessageStatus.RECEIVED && "bg-gray-100"
          )}>
            <CardHeader className="px-4">
              <CardTitle className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-row items-center gap-2">
                    <Mail className="h-4 w-4" strokeWidth={2} />
                    <h3 className="flex flex-col text-xl">{message.nameSender}</h3>
                  </div>
                  <span className="text-sm  font-normal">{message.subject}</span>
                </div>
                <div className="text-xs text-gray-500">{formatElapsedTime(message.createdAt!)}</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 text-justify">{message.content.slice(0, 170)}...</p>
            </CardContent>
            <CardFooter>

            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}