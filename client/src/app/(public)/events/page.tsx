import { Blog, Post } from "@/_components/blog";

export default function EventsPage() {

  const posts: Post[] = [
    {
      id: "post-1",
      title:
        "Formation d'aptitudes chiens catégorisés",
      summary: "Venez passer la journée en compagnie d'Educ-canis dans le cadre d'une formation pour la délivrance de l'Attestation de chiens de 1ère et 2ème catégorie !",
      label: "Web Design",
      location: "Caen",
      published: "15 Mai 2025",
      url: "",
      image: "/assets/bg-landscape.png",
      tags: ["Formation"],
    },
    {
      id: "post-2",
      title: "Marché de Noël",
      summary:
        "Nous vous attendons nombreux à notre stand ou des créations faites par nos bénévoles seront en vente au profit du refuge ! 🐾 L'occasion de faire plaisir à votre entourage ou de vous faire plaisir pour Noël ! 🎁🎄",
      label: "Web Design",
      location: "Hermanville",
      published: "22 Dec 2025",
      url: "https://shadcnblocks.com",
      image: "/assets/bg-landscape.png",
      tags: ["Marché", "Noël"],
    },
  ]


  return (
    <section className="container flex flex-col items-center pb-16 gap-16 w-full min-w-full">
      <div className="text-center">
        <h2 className="mx-auto mb-6 text-pretty text-3xl md:text-4xl lg:text-5xl lg:max-w-3xl animate-fade-in-down">
          Evènements
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg animate-fade-in-up">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, doloremque.
        </p>
      </div>
      <Blog posts={posts} />
    </section>
  )
}