# ONE SIP COFFEE — site officiel

Coffee shop, 11 rue Camille Desmoulins, 75011 Paris · Instagram [@onesip.paris](https://www.instagram.com/onesip.paris/)

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · Motion · GSAP ScrollTrigger

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # typecheck + lint + build
npm run build && npm start
```

Variable d'environnement à définir en production :

```
NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr
```

(utilisée pour les balises canoniques, Open Graph, sitemap et données structurées).

## Modifier les contenus — dossier `src/data/`

| Fichier | Contenu |
|---|---|
| `site.json` | adresse, Instagram, lien Google Maps, **horaires**, règles de la maison, **informations légales** |
| `menu.json` | la carte : catégories, boissons, prix, pastilles « New », laits végétaux |
| `events.json` | événements (avec dates) et journal de la communauté |
| `photos.json` | textes alternatifs des 20 photos |
| `photos.generated.json` | dimensions et flous de chargement (généré, ne pas éditer à la main) |

Aucun composant ne lit ces fichiers directement : tout passe par `src/lib/content.ts`.

### Événements
- Un événement dont la date de **fin** est passée bascule automatiquement dans « Archives » (calcul côté serveur, re-génération horaire, puis recalcul dans le navigateur).
- `published: false` masque une entrée sans la supprimer.
- `photo` accepte un identifiant de photo (`"01"` à `"20"`).

### Horaires
Les horaires sont des horaires **de référence, à revalider**. Une fois confirmés, passer `hours.verified` à `true` : ils seront alors aussi publiés dans les données structurées Google. En développement, un bandeau rappelle qu'ils restent à valider.

### Mentions légales
Les champs à `null` dans `site.legal` ne sont **jamais affichés en production** (ils apparaissent « à confirmer » en développement), et le build affiche un avertissement tant qu'ils manquent. Voir `MENTIONS_LEGALES_BROUILLON.md`.

## Structure

```
src/
  app/                 layout, page d'accueil, mentions-legales, confidentialite, sitemap, robots, icônes, OG
  components/
    intro/             Loader (logo) + IntroProvider (synchronise loader → hero)
    layout/            Header (menu mobile plein écran), Footer
    sections/          Hero, Esprit, Signatures, Carte, Inside, Community, Moments, Visit
    ui/                Photo, RevealWords, MaskReveal/FadeIn, Parallax, ButtonLink, OpenStatus, Sketch…
    legal/ seo/
  data/                contenus éditables (JSON)
  lib/                 accès typé aux données, horaires (fuseau Paris), événements, formats, GSAP
public/
  brand/               logo officiel (original, version espresso, version ivoire) — non redessiné
  photos/              les 20 photographies réelles (WebP, 2560 px max)
```

## Direction artistique

- **Motif signature : l'arche**, reprise des dossiers arrondis des chaises et des grandes baies du café. Elle sert de masque photographique du hero jusqu'au pied de page.
- **Palette relevée sur les photos** : lait `#F5EEE4`, crème `#FBF8F2`, sable `#E8DAC6`, chêne `#C49A6C`, matcha `#8A9150` / `#56623A`, espresso `#2B211A`.
- **Typographie** : Instrument Serif (titres), Figtree (texte). Polices auto-hébergées (`src/fonts`), aucune requête vers Google.

## Séquences animées

1. **Loader + hero** : le logo se « remplit » de bas en haut, le panneau se lève avec un bord arrondi, la salle s'ouvre dans l'arche, le titre monte mot à mot, le matcha se pose au premier plan. Une fois par session.
2. **Inside One Sip** (GSAP ScrollTrigger, desktop) : une photo plein cadre se resserre jusqu'à sa place dans une composition asymétrique pendant que les autres vues du lieu s'installent. Épinglage court (130 % de hauteur d'écran).
3. **Nos signatures** : une ligne de noms géants glisse derrière les visuels pendant le défilement.

`prefers-reduced-motion` : pas de loader, pas d'épinglage, transformations désactivées (Motion `reducedMotion="user"`).

## Points d'honnêteté

- Seules les photos fournies sont utilisées. Le duo Biscoff n'ayant pas de photo dédiée, il est présenté en typographie.
- Les collaborations (SOI, TSC / BIOGENA, Your Friendly Neighbors, Adidas Runners) sont affichées sans date ni description inventées, avec un lien vers @onesip.paris. Elles restent à faire valider par les partenaires concernés.
- Corrections orthographiques par rapport à la carte papier : « Moca » → « Moka », « Lavende » → « Lavande ». Le thé « T Revive Bio » est à vérifier (lu « T Revivie Bio » sur la photo).
