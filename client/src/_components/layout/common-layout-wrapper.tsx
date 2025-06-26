import { Geist, Geist_Mono, Poppins, Sora, IBM_Plex_Sans, Inter } from "next/font/google";
import { AuthenticatedUser } from "@/_types/authenticated-user.interface.ts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ['latin']
});

const sora = Sora({
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sora',
  subsets: ["latin"]
});
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  subsets: ["latin"]
});
const inter = Inter({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  subsets: ['latin']
});

export function CommonLayoutWrapper({ children, user }: { children: React.ReactNode, user?: AuthenticatedUser | null }) {

  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${sora.variable} ${ibmPlexSans.variable} ${inter.variable} light`}
      >
        {children}
      </body>
    </html>
  );
}
