import { notFound } from "next/navigation";
import EventsForm from "../../EventsForm";
import { eventsServerService } from "@/_services/events-server.service";


interface UpdateEventPageProps {
  params: Promise<{ id: string }>
}

export default async function UpdateEventPage({ params }: UpdateEventPageProps) {

  const { serverGetById } = eventsServerService;
  const { id } = await params;
  const event = await serverGetById(Number(id), 0);

  if (!event) return notFound()

  return (
    <div className=" w-full py-8 pr-4 pl-8 overflow-x-hidden bg-[#f1f3f4]">
      <EventsForm
        mode="edit"
        values={event}
      />
    </div>
  )
}