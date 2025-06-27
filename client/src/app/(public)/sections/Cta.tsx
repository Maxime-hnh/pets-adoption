import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ArrowRight, BadgeEuro, Ham, HandHelping, HeartHandshake, House, PiggyBank } from "lucide-react";

import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface TabContent {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  backgroundColorActive: string;
  backgroundColor: string;
  link: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

export default function Cta() {

  //bg-muted/70 ou #fff6e8 pour le tab content ?

  const tabs: Tab[] = [
    {
      value: "tab-1",
      icon: <PiggyBank className="h-auto w-4 shrink-0" />,
      label: "Donner",
      content: {
        title: "Appel aux dons",
        description:
          "Notre refuge accueille chaque jour des animaux abandonnés ou maltraités. Nous leurs offrons des soins, nourriture et amour en attendant une famille… Mais pour continuer notre mission, nous avons besoin de votre aide ! ",
        buttonText: "Dons financiers",
        imageSrc:
          "/assets/cta/donation.jpg",
        imageAlt: "donation",
        backgroundColorActive: "data-[state=active]:bg-indigo-500/80",
        backgroundColor: "bg-indigo-500/80",
        link: "/donations"
      },
    },
    {
      value: "tab-2",
      icon: <HandHelping className="h-auto w-4 shrink-0" />,
      label: "Devenir Bénévole",
      content: {
        title: "Leur détresse vous révolte et vous aimeriez la soulager ?",
        description:
          "Tout nouveau bénévole motivé est le bienvenue ! Doté d’une grande faculté d’adaptation et d’une bonne constitution physique, vous envisagez de consacrer une partie de votre temps de loisirs au bénévolat dans notre refuge ? Nous vous félicitons pour ce choix et nous vous en remercions !",
        buttonText: "Devenir bénévole",
        imageSrc:
          "/assets/cta/volunteer.jpg",
        imageAlt: "Bénévole et chien",
        backgroundColorActive: "data-[state=active]:bg-emerald-500/80",
        backgroundColor: "bg-emerald-500/80",
        link: "/volunteer"
      },
    },
    {
      value: "tab-3",
      icon: <House className="h-auto w-4 shrink-0" />,
      label: "Devenir famille d'accueil",
      content: {
        title: "Nous recherchons des Familles d'Accueil ! ",
        description:
          "Les familles d'accueil prennent en charge temporairement des chats/chatons en provenance de fourrière ou de demandes d'abandons directs qui arrivent quotidiennement. Sans famille d'accueil, nous ne pourrons pas tous les sauver !… Nous cherchons donc de nouvelles FA !",
        buttonText: "Devenir famille d'accueil",
        imageSrc:
          "/assets/cta/family-dog.jpg",
        imageAlt: "family and dog",
        backgroundColorActive: "data-[state=active]:bg-orange-500/80",
        backgroundColor: "bg-orange-500/80",
        link: "/family"
      },
    },
    {
      value: "tab-4",
      icon: <HeartHandshake className="h-auto w-4 shrink-0" />,
      label: "Adhérer",
      content: {
        title: "Soutenez-nous, devenez adhérent !",
        description:
          "Notre association est indépendante, et autonome financièrement : elle vit essentiellement grâce aux dons et aux adhésions.",
        buttonText: "Adhérer",
        imageSrc:
          "/assets/cta/adherent.jpg",
        imageAlt: "adherent",
        backgroundColorActive: "data-[state=active]:bg-purple-500/80",
        backgroundColor: "bg-purple-500/80",
        link: "/adherent"
      },
    },
  ];

  return (
    <section className="py-20 sm:py-32">
      <div className="min-w-full sm:container sm:min-w-0 sm:mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">SPA de Verson</Badge>
          <h2 className="max-w-2xl text-3xl font-[900] font-inter md:text-4xl lg:text-5xl">
            J'agis pour les animaux
          </h2>
          <p className="text-muted-foreground">
            Chaque geste compte. Que ce soit par un don, un parrainage ou du temps, vous pouvez changer leur vie.
          </p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="min-w-full sm:container sm:min-w-0 flex flex-row items-center justify-center gap-4 md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`cursor-pointer flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground ${tab.content.backgroundColorActive} data-[state=active]:text-white`}
              >
                {tab.icon} <span className="sr-only sm:not-sr-only">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl sm:rounded-2xl bg-[#fff6e8] p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10 animate-fade-in-up"
              >
                <div className="flex flex-col gap-5">
                  <h3 className="text-3xl font-semibold lg:text-4xl 2xl:text-5xl">
                    {tab.content.title}
                  </h3>
                  <Image
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    width={500}
                    height={500}
                    className="rounded-xl mx-auto block lg:hidden"
                  />
                  <p className="text-muted-foreground lg:text-lg">
                    {tab.content.description}
                  </p>
                  {tab.value === "tab-1" ? (
                    <div className="flex flex-wrap gap-4">
                      <Button asChild className="mt-2.5 w-fit gap-2 bg-indigo-500 hover:bg-indigo-600" size="lg">
                        <Link href={tab.content.link} className="!text-white">
                          <BadgeEuro />
                          {tab.content.buttonText}
                        </Link>
                      </Button>
                      <Button asChild className="mt-2.5 w-fit gap-2 bg-amber-500" size="lg">
                        <Link href={tab.content.link} className="!text-white">
                          Dons matériels
                          <Ham />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="mt-2.5 w-fit gap-2 bg-amber-500" size="lg">
                      <Link href={tab.content.link} className="!text-white">
                        {tab.content.buttonText}
                        <ArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
                <Image
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  width={500}
                  height={500}
                  className="rounded-xl hidden lg:block"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};
