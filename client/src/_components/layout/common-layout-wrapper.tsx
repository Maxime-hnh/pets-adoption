import { Poppins, Sora, IBM_Plex_Sans, Inter, Fredoka, Nunito } from "next/font/google";

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

const fredoka = Fredoka({
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  subsets: ['latin']
});

const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  subsets: ['latin']
});

export function CommonLayoutWrapper({ children }: { children: React.ReactNode }) {

  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${sora.variable} ${ibmPlexSans.variable} ${inter.variable} ${fredoka.variable} ${nunito.variable} light`}
      >
        {children}
      </body>
    </html>
  );
}
