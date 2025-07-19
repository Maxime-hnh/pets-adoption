import AnimalProfile from "@/_components/AnimalProfile";
import AnimalProfileMobile from "@/_components/AnimalProfileMobile";


interface AnimalIdPageProps {
  params: Promise<{ id: string }>
}

export default async function AnimalIdPage({ params }: AnimalIdPageProps) {
  await new Promise(resolve => setTimeout(resolve, 10000));

  return (
    <>
      <div className="hidden sm:block">
        <AnimalProfile params={params} />
      </div>
      <div className="block sm:hidden">
        <AnimalProfileMobile params={params} />
      </div>
    </>
  )
} 