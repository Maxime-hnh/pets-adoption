import { Blog } from "@/_components/blog";
import { eventsServerService } from "@/_services/events-server.service";
import { EventTypeLabelMap, EventType } from "@/_schemas/events.schema";
import ChipFilterBar from "./ChipFilterBar";

type EventsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const type = params.type;
  const label = type ? EventTypeLabelMap[type as EventType] : null;

  return {
    title: `Evènements${label ? ` - ${label}` : ''} | SPA de Verson`,
    description: label
      ? `Découvrez nos évènements de type ${label}.`
      : "Découvrez tous nos évènements : formations, ateliers, sorties et plus encore.",
  };
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const type = params.type;
  const title = params.title;
  const { serverGetAllFiltered } = eventsServerService

  const events = await serverGetAllFiltered({
    type: type as EventType,
    title: title as string,
  });
  
  return (
    <section className="min-h-[100dvh] px-4 xl:px-8 2xl:px-12  container flex flex-col items-center pb-16 gap-8 w-full min-w-full">
      <div className="flex flex-col gap-6 bg-[#5f2858] py-5 md:pb-10 px-4 w-full sm:pt-[110px] rounded-b-[3rem]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-[700] text-center text-white">
          Evènements
        </h1>
        <p className="text-white text-center">
          Découvrez tous nos évènements : formations, ateliers, sorties et plus encore.
        </p>
      </div>

      <div className="w-full sm:px-6 md:px-0 lg:px-6 xl:px-20 2xl:px-16 3xl:px-30">
        <h2 className="text-3xl mb-4">Tous les évènements</h2>
        <ChipFilterBar />

        {events.length === 0 ? (
          <p className="text-muted-foreground md:text-lg animate-fade-in-up">
            Aucun évènement ne correspond à vos critères de recherche.
          </p>
        ) : (
          <Blog events={events} />
        )}
      </div>
    </section>
  );
}
