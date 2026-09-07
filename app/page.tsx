"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

const WHATSAPP_URL = "https://wa.me/33749226801";
const PHONE_DISPLAY = "07 49 22 68 01";

type EventForm = {
  occasion: string;
  date: string;
  participants: number;
  experience: string;
  treatments: string[];
  options: string[];
  firstName: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  website: string;
};

const OCCASIONS = ["EVJF", "Anniversaire", "Moment entre amies", "Autre célébration"];
const TREATMENTS = ["Soin du visage", "Massage", "Beauté du regard", "Manucure", "Mise en beauté", "Conseil beauté"];
const OPTIONS = [
  "Buffet & boissons",
  "Photobooth",
  "Décoration personnalisée",
  "Navette avec chauffeur",
  "Berline de luxe",
  "Shooting extérieur Paris",
  "Shooting en studio",
  "Photographe professionnel",
  "Maquilleuse professionnelle",
  "Teaser vidéo souvenir",
  "Restaurant ou rooftop",
  "Retour sécurisé",
];

function toggleItem(items: string[], item: string) {
  return items.includes(item) ? items.filter((value) => value !== item) : [...items, item];
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<EventForm>({
    occasion: "",
    date: "",
    participants: 8,
    experience: "",
    treatments: [],
    options: [],
    firstName: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    website: "",
  });

  const whatsappMessage = useMemo(() => {
    const details = [
      "Bonjour Mey Beauty, je souhaite recevoir une proposition pour Mey Beauty Private.",
      `Occasion : ${form.occasion || "à préciser"}`,
      `Date : ${form.date || "à préciser"}`,
      `Groupe : ${form.participants} participantes`,
      `Expérience : ${form.experience || "à définir"}`,
      form.treatments.length ? `Soins : ${form.treatments.join(", ")}` : "",
      form.options.length ? `Options : ${form.options.join(", ")}` : "",
      form.firstName ? `Prénom : ${form.firstName}` : "",
    ].filter(Boolean);
    return `${WHATSAPP_URL}?text=${encodeURIComponent(details.join("\n"))}`;
  }, [form]);

  function canContinue() {
    if (step === 1) return Boolean(form.occasion && form.date && form.participants >= 4);
    if (step === 2) return Boolean(form.experience && form.treatments.length);
    if (step === 3) return true;
    return Boolean(form.firstName.length >= 2 && /^\S+@\S+\.\S+$/.test(form.email) && form.phone.replace(/\D/g, "").length >= 10 && form.consent);
  }

  async function submitProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!canContinue()) return setError("Merci de vérifier vos coordonnées et votre accord.");
    setSubmitting(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch("/api/private-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
          utmContent: params.get("utm_content") || "",
          referrer: document.referrer,
          landingUrl: window.location.href,
        }),
      });
      if (!response.ok) throw new Error("save_failed");
      setSubmitted(true);
    } catch {
      setError("La demande n’a pas pu être enregistrée. Vous pouvez nous envoyer votre projet directement sur WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <div className="announcement">Une célébration sur mesure à Viry-Châtillon · De 4 à 15 participantes · Sur devis</div>

      <header className="site-header">
        <a href="#accueil" className="brand" aria-label="Mey Beauty Private — accueil">
          <Image src="/assets/mey-beauty-logo.png" alt="Mey Beauty Paris" width={196} height={73} priority unoptimized />
          <span>Privé</span>
        </a>
        <button className="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigation principale">
          <a href="#experiences" onClick={() => setMenuOpen(false)}>Les expériences</a>
          <a href="#programme" onClick={() => setMenuOpen(false)}>Votre journée</a>
          <a href="#galerie" onClick={() => setMenuOpen(false)}>Galerie</a>
          <a href="#configurateur" className="nav-cta" onClick={() => setMenuOpen(false)}>Créer mon événement</a>
        </nav>
      </header>

      <section className="hero" id="accueil">
        <Image
          src="/assets/mey-prive-institut.webp"
          alt="Privatisation de l’institut Mey Beauty pour un EVJF entre amies"
          fill
          sizes="100vw"
          className="hero-image"
          priority
          unoptimized
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="kicker light">Mey Beauty Privé · Viry-Châtillon</span>
          <h1>Votre institut.<br /><em>Rien que pour vous.</em></h1>
          <p>EVJF · Anniversaire · Moment entre amies · Parenthèse bien-être</p>
          <div className="hero-actions">
            <a href="#configurateur" className="button primary">Imaginer mon événement <span>→</span></a>
            <a href="#experiences" className="button ghost">Découvrir les expériences</a>
          </div>
        </div>
        <div className="hero-note"><span>01</span><p>Un lieu privatisé,<br />une expérience orchestrée.</p></div>
        <a href="#experiences" className="scroll-cue" aria-label="Découvrir la suite"><span>↓</span> Découvrir</a>
      </section>

      <section className="intro-section">
        <div>
          <span className="kicker">Une célébration qui vous ressemble</span>
          <h2>Votre journée, entièrement imaginée<br /><em>pour vous.</em></h2>
        </div>
        <div className="intro-copy">
          <p>Réunissez vos proches dans un institut entièrement privatisé, où beauté, détente et gourmandise s’accordent à votre rythme.</p>
          <p>Pour aller plus loin, confiez-nous le fil de votre journée : chauffeur privé, mise en beauté, shooting photo, dîner et retour sécurisé.</p>
        </div>
      </section>

      <section className="experiences" id="experiences">
        <div className="section-heading centered">
          <span className="kicker">Deux manières de vivre Mey Beauty Privé</span>
          <h2>Choisissez votre <em>expérience</em></h2>
          <p>Chaque proposition est ajustée à votre groupe, vos envies et votre budget.</p>
        </div>

        <div className="experience-grid">
          <article className="experience-card light-card">
            <div className="experience-number">01</div>
            <div className="experience-topline"><span>À l’institut</span><span>4 à 15 personnes</span></div>
            <h3>L’Institut <em>Privé</em></h3>
            <p className="experience-lead">Votre cocon beauté entièrement réservé pour célébrer, vous détendre et profiter ensemble.</p>
            <ul>
              <li>Privatisation de l’espace Mey Beauty</li>
              <li>Soins et rituels beauté au choix</li>
              <li>Mise en beauté et ambiance musicale</li>
              <li>Buffet, boissons et douceurs sur mesure</li>
              <li>Photobooth, décoration et cadeaux invités en option</li>
            </ul>
            <a href="#configurateur" className="text-link">Configurer cette expérience <span>↗</span></a>
          </article>

          <article className="experience-card dark-card">
            <div className="signature-label">Expérience complète</div>
            <div className="experience-number">02</div>
            <div className="experience-topline"><span>Institut + Paris</span><span>Journée & soirée</span></div>
            <h3>L’Escapade <em>Signature</em></h3>
            <p className="experience-lead">Une journée scénarisée de A à Z, de votre prise en charge jusqu’au retour de soirée.</p>
            <ul>
              <li>Navette avec chauffeur ou berline de luxe</li>
              <li>Privatisation, soins et mise en beauté</li>
              <li>Shooting photo studio ou extérieur à Paris</li>
              <li>Photographe, photos HD et teaser vidéo</li>
              <li>Restaurant, rooftop ou lieu privé sur devis</li>
              <li>Retour sécurisé avec chauffeur en option</li>
            </ul>
            <a href="#configurateur" className="text-link">Imaginer mon Grand Tour <span>↗</span></a>
          </article>
        </div>
      </section>

      <section className="journey" id="programme">
        <div className="journey-photo">
          <Image src="/assets/mey-prive-navette.webp" alt="Groupe d’amies accueilli par un chauffeur privé" fill sizes="(max-width: 900px) 100vw, 48vw" unoptimized />
          <div className="photo-caption"><span>De 4 à 15 participantes</span><strong>Tout commence à votre porte.</strong></div>
        </div>
        <div className="journey-content">
          <span className="kicker">L’Escapade Signature</span>
          <h2>Une expérience imaginée<br /><em>dans les moindres détails.</em></h2>
          <div className="journey-steps">
            {[
              ["01", "On vient vous chercher", "Navette avec chauffeur jusqu’à 8 places, berline de luxe 4 places ou dispositif adapté à votre groupe."],
              ["02", "L’institut devient le vôtre", "Privatisation, soins, mise en beauté, petit buffet, boissons, photobooth et décoration selon vos envies."],
              ["03", "Paris pour décor", "Shooting Rive Gauche, Rive Droite, Grand Tour ou studio, accompagné d’un photographe professionnel."],
              ["04", "Prolongez la nuit", "Restaurant, rooftop ou lieu privé partenaire, puis retour sécurisé avec chauffeur si vous le souhaitez."],
            ].map(([number, title, copy]) => (
              <article className="journey-step" key={number}>
                <span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
          <a href="#configurateur" className="button primary">Composer ma journée <span>→</span></a>
        </div>
      </section>

      <section className="memories-section">
        <div className="section-heading centered">
          <span className="kicker">Mey Beauty s’occupe de tout</span>
          <h2>Tout est prévu pour créer<br /><em>des souvenirs inoubliables</em></h2>
        </div>
        <div className="benefit-grid">
          {[
            ["Chauffeur privé", "Navette jusqu’à 8 places, berline de luxe 4 places et solution coordonnée jusqu’à 15 participantes."],
            ["Beauté & bien-être", "Soins au choix, mise en beauté et maquilleuse professionnelle selon votre programme."],
            ["Shooting photo", "Mode, fun, élégant ou décalé, en extérieur à Paris et/ou dans un studio professionnel."],
            ["Souvenirs HD", "Photographe professionnel, sélection de photos retouchées et teaser vidéo de votre journée ou soirée."],
            ["Paris sur mesure", "Circuits Rive Gauche, Rive Droite ou Grand Tour imaginés selon l’ambiance de votre groupe."],
            ["La suite du programme", "Restaurants, villas, lofts, appartements ou bateau sur devis, avec accompagnement de A à Z."],
          ].map(([title, copy], index) => (
            <article className="benefit" key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="galerie">
        <div className="gallery-heading">
          <span className="kicker light">Un aperçu de votre journée</span>
          <h2>Quatre temps.<br /><em>Une histoire à vous.</em></h2>
        </div>
        <div className="gallery-grid">
          <figure className="gallery-main"><Image src="/assets/mey-prive-institut.webp" alt="Buffet, décoration et soins lors d’un EVJF privatisé" fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized /><figcaption>L’institut privé</figcaption></figure>
          <figure><Image src="/assets/mey-prive-navette.webp" alt="Départ en navette avec chauffeur privé" fill sizes="(max-width: 800px) 100vw, 25vw" unoptimized /><figcaption>Le départ</figcaption></figure>
          <figure><Image src="/assets/mey-prive-paris-shooting.webp" alt="Shooting photo d’un groupe d’amies à Paris" fill sizes="(max-width: 800px) 100vw, 25vw" unoptimized /><figcaption>Le shooting Paris</figcaption></figure>
          <figure className="gallery-wide"><Image src="/assets/mey-prive-soiree-paris.webp" alt="Dîner élégant entre amies à Paris" fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized /><figcaption>La soirée</figcaption></figure>
        </div>
      </section>

      <section id="configurateur" className="configurator-section">
        <div className="configurator-intro">
          <span className="kicker light">Votre projet en quelques minutes</span>
          <h2>Recevez votre proposition<br /><em>personnalisée.</em></h2>
          <p>Parlez-nous de l’occasion. Notre équipe revient vers vous pour construire le programme, vérifier les disponibilités et établir votre devis.</p>
          <div className="direct-contact">
            <span>Vous préférez échanger directement ?</span>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="tel:+33749226801">{PHONE_DISPLAY}</a>
          </div>
        </div>

        <div className="configurator-card">
          {submitted ? (
            <div className="success-panel" aria-live="polite">
              <div className="success-mark">✓</div>
              <span className="kicker">Demande bien reçue</span>
              <h3>Merci {form.firstName},<br />votre projet est lancé.</h3>
              <p>L’équipe Mey Beauty vous recontactera pour affiner votre expérience. Vous pouvez aussi poursuivre immédiatement sur WhatsApp.</p>
              <a className="button primary" href={whatsappMessage} target="_blank" rel="noreferrer">Continuer sur WhatsApp <span>→</span></a>
              <a className="phone-link" href="tel:+33749226801">Ou appeler le {PHONE_DISPLAY}</a>
            </div>
          ) : (
            <form onSubmit={submitProject}>
              <div className="step-header"><span>Étape {step} sur 4</span><strong>{["L’occasion", "Votre expérience", "Les petits plus", "Vos coordonnées"][step - 1]}</strong></div>
              <div className="progress" aria-hidden="true"><span style={{ width: `${step * 25}%` }} /></div>

              {step === 1 && <div className="form-step">
                <fieldset><legend>Quelle occasion célébrez-vous ?</legend><div className="choice-grid two-columns">
                  {OCCASIONS.map((item) => <button type="button" className={form.occasion === item ? "choice selected" : "choice"} aria-pressed={form.occasion === item} onClick={() => setForm({ ...form, occasion: item })} key={item}><span>{item}</span><b>✓</b></button>)}
                </div></fieldset>
                <div className="field-row"><label>Quelle date ?<input type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
                  <label>Combien de participantes ?<div className="range-wrap"><input type="range" min="4" max="15" value={form.participants} onChange={(e) => setForm({ ...form, participants: Number(e.target.value) })} /><strong>{form.participants}</strong></div><small>De 4 à 15 personnes</small></label></div>
              </div>}

              {step === 2 && <div className="form-step">
                <fieldset><legend>Quelle expérience vous attire ?</legend><div className="experience-choices">
                  {["L’Institut Privé", "L’Escapade Signature", "Une formule sur mesure"].map((item, index) => <button type="button" className={form.experience === item ? "choice experience-choice selected" : "choice experience-choice"} aria-pressed={form.experience === item} onClick={() => setForm({ ...form, experience: item })} key={item}><small>0{index + 1}</small><span>{item}</span><b>✓</b></button>)}
                </div></fieldset>
                <fieldset><legend>Quels soins souhaitez-vous ? <small>Plusieurs choix possibles</small></legend><div className="choice-grid two-columns compact">
                  {TREATMENTS.map((item) => <button type="button" className={form.treatments.includes(item) ? "choice selected" : "choice"} aria-pressed={form.treatments.includes(item)} onClick={() => setForm({ ...form, treatments: toggleItem(form.treatments, item) })} key={item}><span>{item}</span><b>✓</b></button>)}
                </div></fieldset>
              </div>}

              {step === 3 && <div className="form-step">
                <fieldset><legend>Quels détails rendraient cette journée parfaite ? <small>Tout reste facultatif</small></legend><div className="choice-grid two-columns compact">
                  {OPTIONS.map((item) => <button type="button" className={form.options.includes(item) ? "choice selected" : "choice"} aria-pressed={form.options.includes(item)} onClick={() => setForm({ ...form, options: toggleItem(form.options, item) })} key={item}><span>{item}</span><b>✓</b></button>)}
                </div></fieldset>
              </div>}

              {step === 4 && <div className="form-step contact-step">
                <p className="form-note">Dernière étape : indiquez-nous comment vous joindre pour recevoir votre proposition.</p>
                <div className="field-row"><label>Votre prénom<input type="text" autoComplete="given-name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Mélanie" required /></label><label>Votre téléphone<input type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="06 00 00 00 00" required /></label></div>
                <label>Votre adresse e-mail<input type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vous@exemple.fr" required /></label>
                <label>Un détail à nous partager ? <small>Facultatif</small><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Ambiance, horaires, surprise pour la future mariée…" rows={3} /></label>
                <input className="honeypot" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} aria-hidden="true" />
                <label className="consent"><input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} /><span>J’accepte que Mey Beauty utilise ces informations pour me recontacter au sujet de mon projet.</span></label>
              </div>}

              {error && <p className="form-error" role="alert">{error} {error.includes("WhatsApp") && <a href={whatsappMessage} target="_blank" rel="noreferrer">Ouvrir WhatsApp</a>}</p>}
              <div className="form-actions">
                {step > 1 ? <button type="button" className="back-button" onClick={() => { setError(""); setStep(step - 1); }}>← Retour</button> : <span />}
                {step < 4 ? <button type="button" className="button primary" disabled={!canContinue()} onClick={() => { setError(""); setStep(step + 1); }}>Continuer <span>→</span></button> : <button type="submit" className="button primary" disabled={!canContinue() || submitting}>{submitting ? "Envoi…" : "Recevoir ma proposition"} <span>→</span></button>}
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="faq-section">
        <div className="section-heading"><span className="kicker">Questions fréquentes</span><h2>Avant de nous confier<br /><em>votre événement</em></h2></div>
        <div className="faq-list">
          {[
            ["Combien de personnes pouvez-vous accueillir ?", "Nos expériences sont pensées pour des groupes de 4 à 15 participantes. Le transport est adapté au nombre de personnes et au programme choisi."],
            ["Combien de temps à l’avance faut-il réserver ?", "Le plus tôt possible, particulièrement pour un samedi ou une formule avec chauffeur et shooting. Envoyez-nous votre date : nous vérifions les disponibilités avant tout engagement."],
            ["Peut-on modifier les soins et les options ?", "Oui. Le configurateur ouvre la conversation : chaque proposition est ensuite personnalisée selon le groupe, le budget, les contraintes alimentaires et l’ambiance souhaitée."],
            ["Le restaurant et le retour sont-ils obligatoires ?", "Non. L’Institut Privé peut être réservé seul. Chaque étape de l’Escapade Signature — shooting, dîner, lieu privé, chauffeur retour — reste optionnelle."],
          ].map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="local-links">
        <span className="kicker">Mey Beauty Private en Essonne</span>
        <h2>Votre célébration commence<br /><em>à Viry-Châtillon.</em></h2>
        <div>
          <a href="/evjf-spa-essonne">EVJF spa en Essonne <span>↗</span></a>
          <a href="/evjf-viry-chatillon">EVJF à Viry-Châtillon <span>↗</span></a>
          <a href="/privatisation-institut-beaute-91">Privatisation institut beauté 91 <span>↗</span></a>
          <a href="/anniversaire-spa-essonne">Anniversaire spa entre filles <span>↗</span></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><Image src="/assets/mey-beauty-logo.png" alt="Mey Beauty Paris" width={196} height={73} unoptimized /><span>Private</span><p>Des moments de beauté qui deviennent des souvenirs.</p></div>
        <div><span className="footer-label">Nous trouver</span><p>6 place des Martyrs de Châteaubriant<br />91170 Viry-Châtillon</p></div>
        <div><span className="footer-label">Votre projet</span><a href="tel:+33749226801">{PHONE_DISPLAY}</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Nous écrire sur WhatsApp</a></div>
        <div><span className="footer-label">Navigation</span><a href="#experiences">Les expériences</a><a href="#configurateur">Créer mon événement</a></div>
        <small>© 2026 Mey Beauty · Expériences sur devis · Données utilisées uniquement pour vous recontacter.</small>
      </footer>

      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Contacter Mey Beauty sur WhatsApp"><span>Discuter de mon projet</span><b>↗</b></a>
    </main>
  );
}
