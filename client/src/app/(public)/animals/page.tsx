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
    <section className="relative flex flex-col sm:gap-4 lg:gap-8 min-h-[100dvh] px-4 xl:px-8 2xl:px-12">
      {/* Background green */}
      <div className="hidden sm:block absolute right-0 bottom-0 not-odd:h-[128px] w-[40%]  scale-[2] rounded-[50%] bg-custom-green blur-[100px] sm:h-[256px]"></div>
      {/* Background orange */}
      <div
        className="hidden sm:block absolute top-0 left-0 not-odd:h-[210px] w-[40%] rotate-[35deg]  scale-[2] rounded-[50%] bg-custom-orange blur-[50px] sm:h-[256px]"
        style={{ transform: "translate(-35%, -40%)" }}
      />
      {/* Header */}
      <div className="flex flex-col gap-6 bg-indigo-500 py-5 md:pb-10 mb-4 md:mb-0 px-4 w-full sm:pt-[110px] rounded-b-[3rem]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-[700] text-center text-white">
          <span className="sr-only">Nos animaux à adopter au refuge de Bayeux</span>
          Nos animaux à adopter
        </h1>
        <p className="text-white text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </div>
      <ClientAnimalsWrapper animals={animals} incompatibilities={incompatibilities} />
    </section>
  )
}