# Mentions légales — brouillon de travail

Source des données affichées : `src/data/site.json` (clé `legal`).
La page publiée est `/mentions-legales` (`src/app/mentions-legales/page.tsx`).

## Informations confirmées (Pappers / registre)

| Champ | Valeur |
|---|---|
| Dénomination | ONE SIP COFFEE |
| Forme juridique | EURL |
| Capital social | 1 000 € |
| SIREN | 941 607 830 |
| SIRET (siège) | 941 607 830 00010 |
| RCS | Paris |
| Siège social | 11 rue Camille Desmoulins, 75011 Paris |
| Gérant | Vu Nguyen Hoang Long |
| Date de création | 24/01/2025 |
| Activité | Coffee shop, débit de boissons |
| Instagram | @onesip.paris |

## À confirmer avant publication (champs `null` dans site.json)

Tant qu'un champ vaut `null`, la ligne n'est **pas affichée en production**
(elle apparaît en surbrillance « à confirmer » en développement).

- [ ] Directeur ou directrice de la publication (`legal.publicationDirector`)
- [ ] Adresse e-mail de contact (`legal.contactEmail`)
- [ ] Téléphone (`legal.contactPhone`, facultatif)
- [ ] Numéro de TVA intracommunautaire (`legal.vatNumber`)
- [ ] Hébergeur : raison sociale, adresse, téléphone (`legal.host`, objet `{ "name", "address", "phone" }`)
- [ ] Horaires d'ouverture (`hours.verified` à passer à `true`)
- [ ] Autorisation de publication des contenus et noms des collaborations (SOI, TSC / BIOGENA, Your Friendly Neighbors, Adidas Runners)
- [ ] Crédits photographiques, si les auteurs souhaitent être cités

Rappel : l'hébergeur et le directeur de la publication sont des mentions
obligatoires (article 6 de la loi n° 2004-575 du 21 juin 2004, LCEN).
