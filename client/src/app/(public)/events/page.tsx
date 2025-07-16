import { Blog, Post } from "@/_components/blog";
import { eventsServerService } from "@/_services/events-server.service";


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
      <Blog events={events} />
    </section>
  )
}