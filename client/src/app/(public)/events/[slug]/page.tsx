import { getEventById } from "@/_lib/data";

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

  return (
    <section className="min-h-[calc(100vh-90px)]">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
    </section>
  )
}