import EventsForm from "../EventsForm";
import { EventType } from "@/_schemas/events.schema";

export default async function NewAnimalPage() {

  const defaultValues = {
    title: "",
    type: EventType.FUNDRAISING,
    startDate: new Date(),
    endDate: new Date(),
    description: "",
    price: 0,
    address: "",
    city: "",
    zipCode: "",
    photos: []
  }

  return (
    <div className=" w-full py-8 pr-4 pl-8 overflow-x-hidden bg-[#f1f3f4]">

      <EventsForm
        mode="create"
        values={defaultValues}
      />
    </div>
  )
}