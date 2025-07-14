"use client"

import { Button } from "@/_components/ui/button";
import { Badge } from "@/_components/ui/badge";
import { CornerUpLeft, CornerUpRight, Trash2, User, X } from "lucide-react";
import { useAdminStore } from "@/_stores/admin.store";
import { formatDate, formatElapsedTime } from "@/_lib/utils";
import { useDeleteMessage } from "@/_hooks/messages/useDeleteMessage";

export default function SelectedMessage() {

  const selectedMessage = useAdminStore((state) => state.selectedMessage);
  const setSelectedMessage = useAdminStore((state) => state.setSelectedMessage);
  const deleteMessage = useDeleteMessage();

  const handleDeleteMessage = () => {
    deleteMessage.mutate(selectedMessage!.id!);
  }

  if (!selectedMessage) return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between border-b  min-h-[50px] h-[50px]">
        <Button variant={"ghost"} disabled>
          <Trash2 className="h-4 w-4" strokeWidth={2.5} />
        </Button>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center border-r">
            <Button variant={"ghost"} disabled>
              <CornerUpLeft className="h-4 w-4" strokeWidth={2.5} />
            </Button>
            <Button variant={"ghost"} disabled>
              <CornerUpRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </div>
          <Button variant={"ghost"} disabled>
            <X className="h-4 w-4 text-gray-500" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col flex-1">

      {/*Header : Delete, Reply, Forward*/}
      <div className="flex items-center justify-between border-b  min-h-[50px] h-[50px]">
        <Button variant={"ghost"} onClick={handleDeleteMessage}>
          <Trash2 className="h-4 w-4" strokeWidth={2.5} />
        </Button>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center border-r">
            <Button variant={"ghost"}>
              <CornerUpLeft className="h-4 w-4" strokeWidth={2.5} />
            </Button>
            <Button variant={"ghost"}>
              <CornerUpRight className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </div>
          <Button variant={"ghost"} onClick={() => setSelectedMessage(null)}>
            <X className="h-4 w-4 text-gray-500" strokeWidth={2.5} />
          </Button>
        </div>
      </div>

      {/*Sender Info*/}
      <div className="w-full flex flex-row justify-between p-4 border-b">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <Badge className="h-15 min-w-15 rounded-full px-1 bg-gray-200">
              <User className="h-8 w-8 min-h-8 min-w-8 text-black" strokeWidth={1.5} />
            </Badge>
            <div>
              <h3 className="flex flex-col text-xl">{selectedMessage.nameSender}</h3>
              <span className="text-xs font-normal">
                <span className="font-bold">Répondre à : </span>
                <a href={`mailto:${selectedMessage.emailSender}`} className="!underline">{selectedMessage.emailSender}</a>
              </span>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500">{formatDate(selectedMessage.createdAt!, true)}</div>
      </div>

      {/*Message*/}
      <div className="py-4 px-6 text-md text-justify">
        <p>{selectedMessage.content}</p>
      </div>
    </div>
  )
}