import AnimalCard from "./AnimalCard";
import { animalsServerService } from "@/_services/animals-server.service";


export default async function SuggestCard() {
  /**
   * SuggestCard displays a selection of the 3 most recent dogs.
   * Data is fetched server-side using animalsService.
   */

  const { serverGetAllWithFilters } = animalsServerService;
  const animals = await serverGetAllWithFilters({
    where: { species: 'DOG' },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {animals.map(animal => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  )
}