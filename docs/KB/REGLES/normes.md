---
titre: Normes
type: regle
statut: actif
maj: 2026-10-17
---

# Normes

Lues dans le code existant ; il n'y a ni linter ni formateur configuré.

## TypeScript

- Pas de point-virgule, guillemets simples, indentation de 2 espaces.
- Fonctions fléchées exportées (`export const f = (…): T => …`), types explicites en retour.
- Une ligne vide avant un `return` qui suit d'autres instructions.
- Commentaires rares, en français, pour le *pourquoi* (une signature figée par KoA, une formule retirée).
- La logique pure dans `roles.ts`, le rendu dans `register.tsx` : pas de `$` ni de JSX dans `roles.ts`.

## Tests

- `test()` et `expect()` de `'claude-code/testing'`, dans `hooks/roles.test.ts`.
- Intitulés en anglais, une phrase qui dit le comportement (`a Cantina notice names senders, recipient and count`).
- Toute expression régulière nouvelle a un test qui la reconnaît **et** un test qui montre qu'un prompt ordinaire n'est pas pris pour elle.

## Textes

- Tout ce que voit l'utilisateur (étiquettes, README, notes de release) est en français.
- Le README garde son tableau des rôles à jour à chaque rôle nouveau.
