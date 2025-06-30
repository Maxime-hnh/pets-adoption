import { animalsServerService } from "@/_services/animals-server.service";
import FiltersBar from "./filters-bar";
import { incompatibilitiesServerService } from "@/_services/incompatibilities-server.service";

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
      <div className="col-span-4">
        <div className="rounded-xl py-6 px-4 shadow-2xl border bg-white">
          <div className="flex flex-col gap-4">
            <h2 className="font-inter font-[900] text-xl">Je trouve mon compagnon</h2>
            <FiltersBar animals={animals} incompatibilities={incompatibilities} />  
          </div>
        </div>
      </div>
      <div className="col-span-8">

      </div>
    </section>
  )
}