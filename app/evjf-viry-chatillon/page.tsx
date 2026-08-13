import type { Metadata } from "next";
import SeoLanding from "../_components/SeoLanding";

export const metadata: Metadata = { title: "EVJF à Viry-Châtillon | Institut privatisé", description: "Un EVJF à Viry-Châtillon dans un institut privatisé : soins, mise en beauté, buffet et options photo ou chauffeur. Groupe de 4 à 15 personnes." };
export default function Page() { return <SeoLanding kicker="EVJF à Viry-Châtillon" title="Votre EVJF à Viry-Châtillon, rien que pour vous." intro="Un lieu privatisé, une équipe beauté et un programme construit autour de la future mariée." locationText="Mey Beauty vous accueille au cœur de Viry-Châtillon pour un EVJF facile à organiser et entièrement personnalisé. Restez à l’institut ou poursuivez l’expérience jusqu’à Paris." highlights={["Accueil de 4 à 15 participantes", "Institut entièrement privatisé", "Rituels visage, regard et mains", "Mise en beauté professionnelle", "Buffet et décoration personnalisés", "Programme Paris en option"]} />; }
