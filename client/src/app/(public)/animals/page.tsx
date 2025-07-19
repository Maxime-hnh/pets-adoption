import { animalsServerService } from "@/_services/animals-server.service";
import { incompatibilitiesServerService } from "@/_services/incompatibilities-server.service";
import ClientAnimalsWrapper from "./ClientAnimalsWrapper";
import { AnimalStatus } from "@/_schemas/animal.schema";

export async function generateMetadata() {
  return {
    title: "Animaux à adopter | SPA de Verson",
    description: "Découvrez tous nos animaux à adopter : chiens, chats, NACs et plus encore. Trouvez votre futur compagnon à la SPA de Verson !",
  }
}


export default async function AnimalsPage() {

  const { serverGetAllWithFilters } = animalsServerService;
  const { serverGetIncompatibilities } = incompatibilitiesServerService;
  const animals = await serverGetAllWithFilters({ where: { status: AnimalStatus.AVAILABLE }, orderBy: { createdAt: 'desc' } });
  const incompatibilities = await serverGetIncompatibilities();

  return (
    <section className="relative grid grid-cols-12 md:px-4 sm:gap-4 lg:gap-8 min-h-[100dvh] sm:pt-[90px]">
      {/* Background green */}
      <div className="hidden sm:block absolute right-0 bottom-0 not-odd:h-[128px] w-[40%]  scale-[2] rounded-[50%] bg-custom-green blur-[100px] sm:h-[256px]"></div>
      {/* Background orange */}
      <div
        className="hidden sm:block absolute top-0 left-0 not-odd:h-[210px] w-[40%] rotate-[35deg]  scale-[2] rounded-[50%] bg-custom-orange blur-[50px] sm:h-[256px]"
        style={{ transform: "translate(-35%, -40%)" }}
      />
      <div className="col-span-12 sm:sr-only py-6">
        <h2 className=" min-w-full text-center text-pretty text-3xl md:text-4xl lg:text-5xl lg:max-w-3xl animate-fade-in-down">
          Animaux à adopter
        </h2>
      </div>
      <ClientAnimalsWrapper animals={animals} incompatibilities={incompatibilities} />
    </section>
  )
}