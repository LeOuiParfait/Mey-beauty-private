import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Mey Beauty Privé",
  description: "Privatisez Mey Beauty à Viry-Châtillon pour un EVJF, un anniversaire ou un moment entre amies. Institut privé, chauffeur, shooting photo et soirée sur mesure.",
  openGraph: {
    title: "Mey Beauty Privé — Votre institut, rien que pour vous",
    description: "EVJF, anniversaire et parenthèse bien-être sur mesure en Essonne.",
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/assets/mey-prive-institut.webp", width: 1448, height: 1086 }],
  },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body className={`${cormorant.variable} ${lato.variable}`}>{children}</body></html>;
}
