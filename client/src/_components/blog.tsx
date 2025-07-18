import { ArrowRight } from "lucide-react";

import { Card } from "@/_components/ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { EventEntity, EventTypeLabelMap } from "@/_schemas/events.schema";
import { formatDate, slugify } from "@/_lib/utils";
import { ROUTES } from "@/_lib/constants";


interface BlogProps {
  events: EventEntity[];
}

const Blog = ({ events }: BlogProps) => {
  return (
    <div className="grid gap-y-4 md:grid-cols-2 md:gap-x-4 lg:gap-x-8 2xl:grid-cols-3 2xl:gap-y-8 3xl:gap-x-12">
      {events.map((event) => (
        <Card
          key={event.id}
          className="group order-last border-0 bg-transparent shadow-none"
        >
          <div className="grid gap-y-6 sm:gap-x-5 lg:gap-x-12">
            <div className="animate-fade-in-down">
              <Link href={`${ROUTES.EVENTS}/${slugify(event.title)}-${event.id}`} className="block">
                <div className="aspect-[16/9] overflow-clip rounded-xl">
                  <figure className="bg-black overflow-hidden h-full w-full rounded-2xl">
                    <Image
                      src={event.photos?.[0] ?? '/assets/bg-event.png'}
                      alt={event.title}
                      className="h-full w-full object-fill scale-105 group-hover:scale-100 group-hover:opacity-75 transition-all duration-750"
                      width={500}
                      height={500}
                    />
                  </figure>
                </div>
              </Link>
            </div>
            <div className="2xl:col-span-1 animate-fade-in-up">
              <div className="mb-4 flex justify-between items-center">
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground lg:gap-6">
                  <Badge variant="outline" key={event.type}>{EventTypeLabelMap[event.type]}</Badge>
                </div>
                <div className=" flex items-center space-x-4 text-sm">
                  <span className="text-muted-foreground">{event.city}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {formatDate(event.createdAt!)}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold 2xl:text-2xl lg:text-3xl">
                <Link
                  href={`${ROUTES.EVENTS}/${slugify(event.title)}-${event.id}`}
                  className="hover:underline"
                >
                  {event.title}
                </Link>
              </h3>

              <p className="mt-4 text-muted-foreground 2xl:min-h-[96px]">
                {event.description?.slice(0, 200)}...
              </p>
              <div className="flex justify-start items-center ">
                <Link
                  href={`${ROUTES.EVENTS}/${slugify(event.title)}-${event.id}`}
                  className="mt-4 inline-flex items-center font-semibold hover:underline !text-amber-500 "
                >
                  En savoir plus
                  <ArrowRight className="ml-2 size-4 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </Card>
      ))}
    </div>
  );
};

export { Blog };