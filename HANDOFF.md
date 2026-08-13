# Mey Beauty Privé — transmission développeur

## Résultat livré

- Mini-site commercial Next.js/Vinext, responsive et déployable sur OpenAI Sites.
- Deux parcours : **L’Institut Privé** et **L’Escapade Signature**.
- Configurateur en quatre étapes avec enregistrement D1, attribution UTM et relais WhatsApp.
- Quatre pages SEO locales et contenus uniques.
- Images optimisées en WebP dans `public/assets/`.

## Démarrage

```bash
npm install
npm run dev
```

Qualité et schéma :

```bash
npm run lint
npm run db:generate
npm run build
```

## Fichiers à modifier en priorité

- `app/page.tsx` : textes, options, soins, téléphone/WhatsApp et logique du configurateur.
- `app/globals.css` : identité visuelle et responsive.
- `public/assets/` : photos et logo.
- `app/*/page.tsx` : contenus et métadonnées des pages SEO.
- `db/schema.ts` : structure des prospects.
- `app/api/private-events/route.ts` : validation et enregistrement.

## Routes

| Route | Rôle |
|---|---|
| `/` | Tunnel principal et configurateur |
| `/evjf-spa-essonne` | SEO : EVJF spa Essonne |
| `/evjf-viry-chatillon` | SEO : EVJF Viry-Châtillon |
| `/privatisation-institut-beaute-91` | SEO : privatisation institut beauté 91 |
| `/anniversaire-spa-essonne` | SEO : anniversaire spa entre filles Essonne |
| `POST /api/private-events` | Création d’un prospect |

## Parcours de conversion

1. Une publicité Instagram, TikTok ou Google arrive sur une page adaptée.
2. Le visiteur choisit son occasion, sa date et la taille du groupe (4 à 15).
3. Il sélectionne une expérience, ses soins et ses options.
4. Il laisse ses coordonnées et son consentement.
5. Le prospect est enregistré dans D1 puis reçoit un CTA WhatsApp prérempli.
6. L’équipe qualifie le projet et prépare le devis par téléphone/WhatsApp.

## Données prospects

Table D1 : `private_event_leads`. Les listes de soins et options sont stockées en JSON. Les champs `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `referrer` et `landing_url` permettent d’attribuer chaque demande. Le champ `status` vaut `new` par défaut et peut évoluer vers `contacted`, `qualified`, `won` ou `lost` dans un futur back-office.

## Intégrations recommandées

- Google Tag Manager + GA4 : `view_landing`, `start_configurator`, `configurator_step`, `generate_lead`, `click_whatsapp`, `click_phone`.
- Meta Pixel / TikTok Pixel : mapper `generate_lead` vers l’événement Lead.
- CRM : connecter la table D1 à Airtable, HubSpot ou un webhook Make/n8n pour prévenir l’équipe.
- E-mail : envoyer une notification interne et un accusé de réception au prospect après création.
- Protection : ajouter rate limiting/Turnstile si le volume publicitaire augmente.

## Convention publicitaire

Exemple : `?utm_source=instagram&utm_medium=paid_social&utm_campaign=evjf_essonne&utm_content=video_diagnostic`. Conserver une campagne par intention et une valeur `utm_content` par création publicitaire.

## À confirmer avant lancement payant

- Prix d’appel ou absence volontaire de tarif.
- Délais minimums de réservation et jours disponibles.
- Capacité exacte du salon et composition définitive des soins.
- Zone de prise en charge chauffeur, partenaires et conditions d’annulation.
- Mentions légales, politique de confidentialité et droits définitifs sur les visuels.
