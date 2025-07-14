import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link href="/admin/events">Retour à la liste des évènements</Link>
    </div>
  )
};
