import { ArrowRight } from "lucide-react";

import { Card } from "@/_components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";

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
interface Blog8Props {
  posts: Post[];
}

const Blog = ({ posts }: Blog8Props) => {
  return (
    <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
        >
          <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
            <div className="sm:col-span-5 animate-fade-in-left">
              <div className="mb-4 md:mb-6">
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                  {post.tags?.map((tag) => <Badge variant="outline" key={tag}>{tag}</Badge>)}
                </div>
              </div>
              <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                <a
                  href={post.url}
                  target="_blank"
                  className="hover:underline"
                >
                  {post.title}
                </a>
              </h3>
              <p className="mt-4 text-muted-foreground md:mt-5">
                {post.summary}
              </p>
              <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                <span className="text-muted-foreground">{post.location}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {post.published}
                </span>
              </div>
              <div className="mt-6 flex items-center space-x-2 md:mt-8">
                <Button className="!text-white" size="lg" asChild>
                  <Link
                    href={post.url}
                    target="_blank"
                    className="inline-flex items-center font-semibold hover:underline md:text-base"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 size-4 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="order-first sm:order-last sm:col-span-5 animate-fade-in-right">
              <a href={post.url} target="_blank" className="block">
                <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                  />
                </div>
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export { Blog };