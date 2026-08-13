import type { Metadata } from "next";
import SeoLanding from "../_components/SeoLanding";

export const metadata: Metadata = { title: "EVJF spa en Essonne | Mey Beauty Privé", description: "Organisez un EVJF spa privatisé en Essonne : soins, buffet, décoration, chauffeur et shooting photo à Paris. Proposition sur mesure pour 4 à 15 participantes." };
export default function Page() { return <SeoLanding kicker="EVJF spa en Essonne" title="Un EVJF beauté, intime et inoubliable en Essonne." intro="Privatisez un institut à Viry-Châtillon pour la future mariée et son cercle d’amies." locationText="À quelques kilomètres de Paris, notre institut de Viry-Châtillon devient votre cocon. Vous choisissez le rythme, les soins et l’ambiance ; nous coordonnons le reste." highlights={["Privatisation de l’institut", "Soins et mise en beauté", "Buffet, boissons et décoration", "Photobooth et cadeaux invités", "Navette avec chauffeur", "Shooting photo Paris ou studio"]} />; }
