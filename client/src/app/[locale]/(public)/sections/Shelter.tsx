import IconDoveOfPeace from "@/_components/icons/IconDoveOfPeace";
import IconHandsWithHearts from "@/_components/icons/IconHandsWithHearts";
import IconShelter from "@/_components/icons/IconShelter";
import { Card, CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import Image from "next/image";

const content = [
  {
    icon: IconDoveOfPeace,
    title: "Créé en 1952",
    text: "L'association a été reconnue d'utilité publique en 1975, le refuge a été construit en 1997",
    color: "#615fff",
    className: "shadow-custom-blue"
  },
  {
    icon: IconShelter,
    title: "45 box pour chiens",
    text: "Un local a été aménagé pour les chats. Nos animaux restent au refuge jusqu'à l'adoption, nous ne pratiquons pas l'euthanasie.",
    color: "#ff7e5f",
    className: "shadow-custom-orange"
  },
  {
    icon: IconHandsWithHearts,
    title: "12 personnes",
    text: "Le conseil d'administration est composé de 12 personnes, dont 4 pour les bureaux. L'association fonctionne grâce aux bénévoles et aux 4 salariés.",
    color: "#00bc7d",
    className: "shadow-custom-green"
  },
]

export default function Shelter() {

  return (
    <section className="px-8 pb-16 md:pb-32">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-[900] lg:text-5xl font-inter">Le refuge SPA de Verson</h2>
          <p className="mt-4">Une association reconnue d'utilité publique.</p>
        </div>
        <div className="flex items-center flex-col md:flex-row justify-center gap-2 md:gap-8 mt-8 md:h-[351px] md:max-h-[351px] lg:h-80 lg:max-h-80">
          {content.map((item, index) => (
            <div key={index} className="mb-4 md:mb-0 max-w-full lg:max-w-xs w-full h-full relative">

              {/* Card */}
              <Card
                className={`max-w-full lg:max-w-xs w-full h-full hover:translate-y-[-5px] hover:scale-[1.01] transition-all duration-300 ${item.className}`}
              >
                <CardHeader>
                  <CardTitle className="m-auto flex flex-col justify-center items-center gap-1">
                    <item.icon size={75} color={item.color} />
                    <h3 className="text-xl lg:text-2xl text-center">{item.title}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 lg:px-6">
                  <p className="text-center text-sm text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>

              {/* Mascot */}
              {index === content.length - 1 && (
                <Image
                  alt="mascot"
                  src="/assets/mascot/mascot_wall.png"
                  width={425}
                  height={1254}
                  className="hidden xl:block object-contain h-[225px] w-[75px] absolute bottom-0 -right-[75px] "
                />
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}