import type { Metadata } from "next";
import SeoLanding from "../_components/SeoLanding";

export const metadata: Metadata = { title: "Anniversaire spa entre filles en Essonne", description: "Célébrez un anniversaire spa entre filles en Essonne : institut privatisé, soins, buffet, photobooth et expérience sur mesure à Viry-Châtillon." };
export default function Page() { return <SeoLanding kicker="Anniversaire spa en Essonne" title="Un anniversaire spa entre filles qui ne ressemble qu’à vous." intro="Du soin cocooning à la soirée parisienne, composez une célébration dont on reparlera longtemps." locationText="Pour un anniversaire élégant, joyeux ou complètement décalé, Mey Beauty privatise l’institut de Viry-Châtillon et coordonne chaque détail avec vous." highlights={["Parenthèse bien-être privée", "Soins adaptés au groupe", "Gâteau, buffet et boissons", "Décoration dans votre thème", "Shooting photo fun ou mode", "Dîner et retour chauffeur en option"]} />; }
