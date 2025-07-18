import { Blog } from "@/_components/blog";
import { eventsServerService } from "@/_services/events-server.service";
import { Chip } from "@/_components/ui/chip";
import { Input } from "@/_components/ui/input";
import { Search } from "lucide-react";
import HandleChipEvent from "./HandleChipEvent";
import { EventTypeLabelMap } from "@/_schemas/events.schema";


export async function generateMetadata() {
  return {
    title: "Evènements | SPA de Verson",
    description: "Découvrez tous nos évènements : formations, ateliers, sorties et plus encore. Trouvez votre futur compagnon à la SPA de Verson !",
  }
}

export default async function EventsPage() {

  const { serverGetAll } = eventsServerService;
  const events = await serverGetAll();
  if (!events || events.length === 0) return <section className="container flex flex-col items-center pb-16 gap-16 w-full min-w-full">
    <div className="text-center">
      <h2 className="mx-auto mb-6 text-pretty text-3xl md:text-4xl lg:text-5xl lg:max-w-3xl animate-fade-in-down">
        Evènements
      </h2>
      <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg animate-fade-in-up">
        Découvrez tous nos évènements : formations, ateliers, sorties et plus encore.
      </p>
    </div>
    <p className="text-muted-foreground md:text-lg animate-fade-in-up">Aucun évènement trouvé</p>
  </section>

  const uniqueTypes = [...new Set(events.map(e => e.type))];

  const chips = uniqueTypes.map(type => ({
    label: EventTypeLabelMap[type],
    value: type
  }));



  return (
    <section className="container flex flex-col items-center pb-16 gap-16 w-full min-w-full">

      <div className="flex flex-col gap-6 bg-[#5f2858] py-5 md:py-10 px-4 w-full">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-[700] text-center text-white">
          Evènements
        </h1>
        <p className="text-white text-center">
          Découvrez tous nos évènements : formations, ateliers, sorties et plus encore.
        </p>
      </div>
      <div className="w-full px-4 sm:px-10 md:px-4 lg:px-10 xl:px-30 2xl:px-20 3xl:px-35">
        <h2 className="text-3xl">Tous les évènements</h2>
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher un évènement..."
              className="min-w-[300px] pl-10"
            />
          </div>
          {chips.map((chip) => (
            <Chip key={chip.value} className="bg-white text-black">
              {chip.label}
            </Chip>
          ))}
          {/* <HandleChipEvent events={events} /> */}
        </div>
        <Blog events={events} />
      </div>
    </section>
  )
}