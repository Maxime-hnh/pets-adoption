import dynamic from "next/dynamic";

export default function EventsPage() {

  const EventsTable = dynamic(() => import("./EventsTable"))

  return (
    <section className="w-full px-4 overflow-x-hidden h-[calc(100dvh-60px)]">
      <EventsTable />
    </section>
  )
}
