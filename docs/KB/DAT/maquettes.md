---
titre: Les maquettes du README
type: dat
statut: actif
maj: 2026-10-17
---

# Les maquettes du README

`docs/make_demo.py` dessine `docs/chat-roles-flux.svg` (flux animé) et `docs/chat-roles-avant-apres.svg` (sans / avec le mod).

- **Une maquette, pas une capture** : le transcript tel que le mod le dessine, sur une grille de caractères (`CW`, `LH`), la barre de rôle dessinée comme une forme.
- **Animation en CSS**, parce que GitHub rend les animations CSS d'un SVG dans un README mais jamais ses scripts. Avec `prefers-reduced-motion`, tout s'affiche d'un coup.
- **Les couleurs du mod sont recopiées** de `hooks/roles.ts` (`YOU`, `CLAUDE`, `PEER`, `MUTED`). Changer une couleur dans `roles.ts` sans la changer ici fait mentir le README.
- Les maquettes ne montrent pas encore les rôles Cantina ajoutés en 0.2.0 : À COMPLÉTER si on veut les y faire figurer.
