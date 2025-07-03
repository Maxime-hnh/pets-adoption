import { animalsServerService } from "@/_services/animals-server.service";
import { incompatibilitiesServerService } from "@/_services/incompatibilities-server.service";
import ClientAnimalsWrapper from "./ClientAnimalsWrapper";

export async function generateMetadata() {
  return {
    title: "Animaux à adopter | SPA de Verson",
    description: "Découvrez tous nos animaux à adopter : chiens, chats, NACs et plus encore. Trouvez votre futur compagnon à la SPA de Verson !",
  }
}


export default async function AnimalsPage() {

  const { serverGetAll } = animalsServerService;
  const {serverGetIncompatibilities} = incompatibilitiesServerService;
  const animals = await serverGetAll();
  const incompatibilities = await serverGetIncompatibilities();

  return (
    <section className="relative grid grid-cols-12 gap-8 h-[calc(100dvh-120px)]">
    <ClientAnimalsWrapper animals={animals} incompatibilities={incompatibilities} />
    </section>
  )
}