import { ArrowRight } from "lucide-react";

import { Card } from "@/_components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { EventEntity, EventTypeLabelMap } from "@/_schemas/events.schema";
import { formatDate } from "@/_lib/utils";

export interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  location: string;
  published: string;
  url: string;
  image: string;
  tags?: string[];
}
interface BlogProps {
  events: EventEntity[];
}

const Blog = ({ events }: BlogProps) => {
  return (
    <div className="grid px-4 gap-y-5 md:grid-cols-1 3xl:grid-cols-2 md:gap-y-10 sm:px-10 md:px-4 lg:px-10 xl:px-30 2xl:px-40 3xl:px-35 3xl:gap-x-15">
      {events.map((event) => (
        <Card
          key={event.id}
          className="group order-last border-0 bg-transparent shadow-none md:order-first md:col-span-1 lg:col-span-1"
        >
          <div className="grid gap-y-6 md:grid-cols-2 sm:gap-x-5 md:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
            <div className="md:col-span-1 animate-fade-in-left">
              <div className="mb-4 md:mb-6 flex justify-between items-center">
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                  <Badge variant="outline" key={event.type}>{EventTypeLabelMap[event.type]}</Badge>
                </div>
                <div className=" flex items-center space-x-4 text-sm sm:hidden">
                  <span className="text-muted-foreground">{event.city}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {formatDate(event.createdAt!)}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                <Link
                  href={`/events/${event.id}`}
                  className="hover:underline"
                >
                  {event.title}
                </Link>
              </h3>

              <p className="mt-4 text-muted-foreground md:mt-5">
                {event.description?.slice(0, 250)}...
              </p>
              <div className="flex justify-end items-center md:justify-start">
                <div className="mt-6 items-center space-x-4 text-sm md:mt-8 hidden md:flex">
                  <span className="text-muted-foreground">{event.city}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {formatDate(event.createdAt!)}
                  </span>
                </div>
                <Button className="!text-white bg-amber-500 hover:bg-amber-600 mt-2 md:hidden" size="lg" asChild>
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center font-semibold hover:underline md:text-base"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 size-4 transition-transform" />
                  </Link>
                </Button>
              </div>
              <div className="mt-6  items-center space-x-2 md:mt-8 hidden md:flex">
                <Button className="!text-white bg-amber-500 hover:bg-amber-600" size="lg" asChild>
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center font-semibold hover:underline md:text-base"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 size-4 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="order-first md:order-last md:col-span-1 animate-fade-in-right">
              <Link href={`/events/${event.id}`} className="block">
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
          </div>
        </Card>
      ))}
    </div>
  );
};

export { Blog };

{/* <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
{post.tags?.map((tag) => <Badge variant="outline" key={tag}>{tag}</Badge>)}
</div> */}

