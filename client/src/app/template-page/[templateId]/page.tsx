import { notFound } from "next/navigation";


type PageProps = {
  params: Promise<{ templateId: string }>
}

export const generateMetadata = async (props: PageProps) => {
  const params = await props.params;
  return {
    title: `Template ${params.templateId}`,
    description: `Description de la page avec le templateId ${params.templateId}`,
  }
}


export default async function Page(props: PageProps) {

  const params = await props.params;

  if (params.templateId === "3") throw new Error()
  if (params.templateId !== "1") return notFound()
  await new Promise(resolve => setTimeout(resolve, 3000))
  return (
    <div>
      <h1>Bienvenue sur la page avec le templateId {params.templateId}</h1>
    </div>
  )
}
