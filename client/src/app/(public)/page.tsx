import Hero from "./sections/Hero";
import Shelter from "./sections/Shelter";
import Cta from "./sections/Cta";
import Preview from "./sections/Preview";
import { AuthProvider } from "@/_core/auth-provider";

export default function HomePage() {
  return (
    <AuthProvider>
      <Hero />
      <Cta />
      <Shelter />
      <Preview />
    </AuthProvider>
  )
}
