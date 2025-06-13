import AnimalProfile from "@/_components/AnimalProfile";

interface AnimalIdPageProps {
  params: Promise<{ id: string }>
}

export default async function AnimalIdPage({ params }: AnimalIdPageProps) {

  return (
    <AnimalProfile params={params} />
  )
}