import { getEventById } from "@/_lib/data";

interface EventIdPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: EventIdPageProps) {
  const { id } = await params;
  const event = await getEventById(Number(id));

  return {
    title: `${event.title} – Évènement | SPA de Verson`,
    description: event.description || "Découvrez l'évènement",
  }
}

export default async function EventIdPage({ params }: EventIdPageProps) {
  const { id } = await params;
  const event = await getEventById(Number(id));

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
    </div>
  )
}