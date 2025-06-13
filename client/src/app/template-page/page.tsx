import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Title template",
  description: "Description",
};

export default function Page() {

  // throw new Error()
  return (
    <div>
      <h1>Test</h1>
      <Link href="/template-page/1">Link</Link>
    </div>
  )
}