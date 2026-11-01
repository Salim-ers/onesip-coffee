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

## Pages

| Route | Contenu |
|---|---|
| `/` | Hero, rubans, l'esprit One Sip, cartes « Explorer » vers chaque page, Coffee Moments |
| `/carte` | Nos signatures, la carte complète (onglets), la carte papier |
| `/le-lieu` | Inside One Sip (séquence épinglée), « Dans le détail » (galerie horizontale) |
| `/communaute` | Événements à venir, journal, archives (re-génération horaire) |
| `/infos` | Adresse, itinéraire, horaires, règles de la maison |

Chaque page intérieure s'ouvre sur un `PageHero` et se termine par un lien géant vers la page suivante (`NextPage`). Header, footer, loader et transitions sont dans `app/layout.tsx`.

## Photos — restauration 4K

Les originaux fournis sont dans `assets/photos` (jamais modifiés). Les versions servies (`public/photos`) ont été restaurées avec l'API d'images OpenAI puis portées à 3840 px :

```bash
# .env.local (ignoré par git) : OPENAI_API_KEY=...
npm run photos:enhance            # toutes les photos (sauf la carte papier)
npm run photos:enhance -- 01 20   # seulement certaines
npm run photos:meta               # régénère photos.generated.json
```

Garde-fous, ce sont de vraies photos du lieu : les couleurs et la lumière viennent toujours de l'original (seul le détail fin vient de l'IA), et un masque détecte automatiquement les zones où l'IA aurait ajouté ou retiré un objet pour y remettre l'original. Les réponses de l'API sont gardées dans `.cache/photos-ai` (avec les masques) : relancer le script ne refait pas d'appel payant.

## Modifier les contenus — dossier `src/data/`

| Fichier | Contenu |
|---|---|
| `site.json` | adresse, Instagram, lien Google Maps, **horaires**, règles de la maison, **informations légales** |
| `menu.json` | la carte : catégories, boissons, prix, pastilles « New », laits végétaux |
| `events.json` | événements (avec dates) et journal de la communauté |
| `photos.json` | textes alternatifs des 20 photos |
| `photos.generated.json` | dimensions et flous de chargement (généré par `npm run photos:meta`, ne pas éditer à la main) |

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
  app/                 layout, accueil, carte, le-lieu, communaute, infos, pages légales, sitemap, robots, icônes, OG
  components/
    intro/             Loader (logo) + IntroProvider (synchronise rideau → entrées de page)
    transition/        LogoCurtain (rideau au logo), TransitionProvider, TransitionLink
    layout/            Header (menu mobile plein écran), Footer, nav (pages, couleurs, page suivante)
    sections/          Hero, Ribbons, Esprit, Explore, Moments, PageHero, Signatures, Carte, PaperMenu,
                       Inside, Details, Community, Visit, NextPage
    ui/                Photo, RevealWords, MaskReveal/FadeIn, Parallax, ButtonLink, OpenStatus, Sketch,
                       Shapes (étincelle, grain, vague), RotatingBadge, Marquee
    legal/ seo/
  data/                contenus éditables (JSON)
  lib/                 accès typé aux données, horaires (fuseau Paris), événements, formats, GSAP
assets/
  photos/              les 20 photographies originales fournies
scripts/               restauration 4K des photos (OpenAI) et métadonnées
public/
  brand/               logo officiel (original, version espresso, version ivoire) — non redessiné
  photos/              les 20 photographies restaurées (WebP, 3840 px max)
```

## Direction artistique

- **Motif signature : l'arche**, reprise des dossiers arrondis des chaises et des grandes baies du café. Elle sert de masque photographique du hero jusqu'au pied de page.
- **Palette relevée sur les photos** : lait `#F5EEE4`, crème `#FBF8F2`, sable `#E8DAC6`, chêne `#C49A6C`, matcha `#8A9150` / `#56623A`, espresso `#2B211A`.
- **Bruns** : cacao `#4A2E1F`, cannelle `#8C5634`, caramel `#C0834F`, latte `#E3C9A8`. Un mot préfixé par `_` dans un titre `RevealWords` passe en italique cannelle.
- **Formes** : arches (masques photo, arches de couleur décalées), étincelles, grains de café, vagues tracées, formes organiques qui respirent (`.blob`), pastille rotative.
- **Typographie** : Instrument Serif (titres), Figtree (texte). Polices auto-hébergées (`src/fonts`), aucune requête vers Google.

## Séquences animées

1. **Loader + transitions entre pages** : un rideau caramel puis cacao monte avec un bord en arche, le logo s'y « remplit » de bas en haut avec le nom de la page, la page suivante se charge dessous, puis le rideau se lève et la page joue son entrée (titre mot à mot, photo qui s'ouvre dans l'arche). Le loader d'entrée est le même rideau, une fois par session.
2. **Inside One Sip** (GSAP ScrollTrigger, desktop) : une photo plein cadre se resserre jusqu'à sa place dans une composition asymétrique pendant que les autres vues du lieu s'installent. Épinglage court (130 % de hauteur d'écran).
3. **Nos signatures** : une ligne de noms géants glisse derrière les visuels pendant le défilement.
4. **Dans le détail** (`/le-lieu`, desktop) : la section s'épingle et le défilement fait glisser la galerie à l'horizontale.
5. **Rubans** : deux bandeaux croisés qui accélèrent avec la vitesse de défilement et changent de sens quand on remonte.

`prefers-reduced-motion` : pas de loader ni de rideau (navigation directe), pas d'épinglage, transformations désactivées (Motion `reducedMotion="user"`).

## Points d'honnêteté

- Seules les photos fournies sont utilisées, restaurées sans ajout ni retrait d'objet (voir « Photos — restauration 4K »). Le duo Biscoff n'ayant pas de photo dédiée, il est présenté en typographie.
- Les collaborations (SOI, TSC / BIOGENA, Your Friendly Neighbors, Adidas Runners) sont affichées sans date ni description inventées, avec un lien vers @onesip.paris. Elles restent à faire valider par les partenaires concernés.
- Corrections orthographiques par rapport à la carte papier : « Moca » → « Moka », « Lavende » → « Lavande ». Le thé « T Revive Bio » est à vérifier (lu « T Revivie Bio » sur la photo).
