import PageBreadcrumbs from "@/_components/PageBreadcrumbs";
import { Badge } from "@/_components/ui/badge";
import { ROUTES } from "@/_lib/constants";
import { getEventById } from "@/_lib/data";
import { formatDate, slugify } from "@/_lib/utils";
import { EventTypeLabelMap } from "@/_schemas/events.schema";
import Image from "next/image";
import { eventsServerService } from "@/_services/events-server.service";
import { Separator } from "@/_components/ui/separator";
import Link from "next/link";

interface EventIdPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EventIdPageProps) {
  const { slug } = await params;
  const id = slug.split('-').at(-1);
  const event = await getEventById(Number(id));

  return {
    title: `${event.title} – Évènement | SPA de Verson`,
    description: event.description || "Découvrez l'évènement",
  }
}

export default async function EventIdPage({ params }: EventIdPageProps) {
  const { slug } = await params;
  const id = slug.split('-').at(-1);
  const event = await getEventById(Number(id));
  const { serverGetAllFiltered } = eventsServerService
  const events = await serverGetAllFiltered({ take: 3 });

  const pathNameLabelMap: Record<string, string> = {
    [ROUTES.EVENTS.replace('/', '')]: 'Nos évènements',
    [slug]: event.title,
  };

  return (
    <section className="min-h-[100dvh] grid grid-cols-12 px-4 gap-4 lg:px-8 lg:gap-8 xl:px-16 2xl:px-26 xl:gap-12 2xl:gap-16 py-8 sm:pt-[110px]">
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <PageBreadcrumbs pathNameLabelMap={pathNameLabelMap} classNameText="text-xs" />

            <h1 className="text-4xl">{event.title}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi perferendis fuga, quo distinctio earum molestias sint esse quae repellendus vero, amet iusto nesciunt soluta accusamus ducimus corrupti expedita ratione?</p>
            <div className="flex justify-between">
              <div className=" flex items-center space-x-4 text-sm">
                <span className="text-muted-foreground">{event.city}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {formatDate(event.createdAt!)}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground lg:gap-6">
                <Badge variant="outline" key={event.type}>{EventTypeLabelMap[event.type]}</Badge>
              </div>
            </div>
          </div>
          {/* <div className="aspect-[16/9]"> */}
          <figure className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] 2xl:h-[550px] overflow-clip rounded-xl">
            <Image
              src={event.photos?.[0] ?? '/assets/bg-event.png'}
              width={1280}
              height={720}
              alt="Image de l'évènement"
              className="h-full w-full object-fill"
            />
          </figure>
          {/* </div> */}
          <div>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
      <aside className="col-span-12 lg:col-span-4 xl:col-span-3">
        <Separator className="my-4 w-full lg:hidden" />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl xl:text-xl">Autres évènements</h2>
          <div className="flex flex-col gap-8">
            {events.map(event => (
              <Link href={`${ROUTES.EVENTS}/${slugify(event.title)}-${event.id}`} key={event.id}>
                <div className="group flex flex-col gap-1">
                  <figure className="bg-black h-[200px] overflow-clip rounded-xl">
                    <Image
                      src={event.photos?.[0] ?? '/assets/bg-event.png'}
                      width={285}
                      height={200}
                      alt="Image de l'évènement"
                      className="h-[200px] w-full object-fill scale-105 group-hover:scale-100 group-hover:opacity-75 transition-all duration-750"
                    />
                  </figure>
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  {/* <Separator className="my-2" /> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </section>
  )
}