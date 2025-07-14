import dynamic from "next/dynamic";

export default function EventsPage() {

  const EventsTable = dynamic(() => import("./EventsTable"))

  return (
    <div className=" w-full p-4 overflow-x-hidden">
      <EventsTable />
    </div>
  )
}
