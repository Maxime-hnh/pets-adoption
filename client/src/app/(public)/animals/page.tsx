import { getAllAnimals } from "@/_lib/data";
import { animalsServerService } from "@/_services/animals-server.service";
import { notFound } from "next/navigation";


export async function generateMetadata() {
  return {
    title: "Animaux à adopter | SPA de Verson",
    description: "Découvrez tous nos animaux à adopter : chiens, chats, NACs et plus encore. Trouvez votre futur compagnon à la SPA de Verson !",
  }
}


export default async function AnimalsPage() {

  const { serverGetAll } = animalsServerService;
  const animals = await serverGetAll();
  console.log(animals);

  return (
    <div>
      <h1>Animals</h1>
    </div>
  )
}