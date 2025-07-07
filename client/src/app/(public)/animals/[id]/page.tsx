import AnimalProfile from "@/_components/AnimalProfile";
import AnimalProfileMobile from "@/_components/AnimalProfileMobile";


interface AnimalIdPageProps {
  params: Promise<{ id: string }>
}

export default async function AnimalIdPage({ params }: AnimalIdPageProps) {

  return (
    // <AnimalProfile params={params} />
    <AnimalProfileMobile params={params} />
  )
} 