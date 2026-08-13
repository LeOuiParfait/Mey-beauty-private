import Image from "next/image";
import Link from "next/link";

type SeoLandingProps = {
  kicker: string;
  title: string;
  intro: string;
  highlights: string[];
  locationText: string;
};

export default function SeoLanding({ kicker, title, intro, highlights, locationText }: SeoLandingProps) {
  return <main className="seo-landing">
    <header className="seo-header"><Link href="/" className="brand"><Image src="/assets/mey-beauty-logo.png" alt="Mey Beauty Paris" width={196} height={73} unoptimized /><span>Privé</span></Link><Link href="/#configurateur" className="button primary">Recevoir ma proposition <span>→</span></Link></header>
    <section className="seo-hero"><Image src="/assets/mey-prive-institut.webp" alt={title} fill sizes="100vw" priority unoptimized /><div className="seo-hero-shade" /><div><span className="kicker light">{kicker}</span><h1>{title}</h1><p>{intro}</p><Link href="/#configurateur" className="button primary">Imaginer mon événement <span>→</span></Link></div></section>
    <section className="seo-content"><div><span className="kicker">Une expérience entièrement privée</span><h2>Le salon pour vous.<br /><em>La journée à votre image.</em></h2><p>{locationText}</p><p>De 4 à 15 participantes, Mey Beauty construit avec vous un programme sur mesure : soins et mise en beauté, buffet, décoration, photobooth, transport privé, shooting photo à Paris et prolongation de soirée.</p><Link href="/#experiences" className="text-link">Découvrir les deux expériences <span>↗</span></Link></div><aside><span className="kicker">Votre formule peut inclure</span><ul>{highlights.map(item => <li key={item}>{item}</li>)}</ul></aside></section>
    <section className="seo-cta"><span className="kicker light">Une date en tête ?</span><h2>Recevez votre proposition personnalisée.</h2><p>Parlez-nous de votre groupe, de votre occasion et de vos envies. Nous revenons vers vous avec une première proposition.</p><Link href="/#configurateur" className="button primary light-button">Configurer mon événement <span>→</span></Link><a href="https://wa.me/33749226801" target="_blank" rel="noreferrer">Ou échanger sur WhatsApp</a></section>
    <footer><div className="footer-brand"><Image src="/assets/mey-beauty-logo.png" alt="Mey Beauty Paris" width={196} height={73} unoptimized /><span>Privé</span></div><div><span className="footer-label">Institut</span><p>6 place des Martyrs de Châteaubriant<br />91170 Viry-Châtillon</p></div><div><span className="footer-label">Contact</span><a href="tel:+33749226801">07 49 22 68 01</a></div><small>© 2026 Mey Beauty · Expériences privées sur devis.</small></footer>
  </main>;
}
