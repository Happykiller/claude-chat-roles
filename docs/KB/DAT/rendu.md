---
titre: Le rendu — hooks ui.render et logique pure
type: dat
statut: actif
maj: 2026-10-17
---

# Le rendu

## Découpage

- `hooks/roles.ts` : **logique pure**, sans `$` ni JSX, donc testable directement (`roleOfUserMessage`, `cantinaRole`, `cantinaBody`, `formatTime`, `clipLines`, `pruneSeen`). Toute règle nouvelle y va d'abord, avec son test.
- `hooks/register.tsx` : **le rendu seul**. Deux hooks `ui.render` qui remplacent le dessin du moteur sans appeler `next` :
  - `UserMessage` : barre de couleur, étiquette, détail éventuel, heure, corps ;
  - `AssistantMessage` : barre et étiquette `CLAUDE` sur le premier bloc d'une réponse seulement (`isFirstOfReply`) ; les résumés (`isSummary`) sont rendus à la main du moteur (`next(e)`).

## Attribution d'un tour utilisateur

`roleOfUserMessage(origin, from, task, text)` décide d'après `origin.kind` (`composer`, `bridge`, `sdk`, `task-notification`, `scheduled-trigger`, `channel`, `peer`…). Un tour de kind « vous » est d'abord confronté aux signatures de la Cantina ([cantina.md](cantina.md)) : c'est le seul cas où le **texte** d'un message change son rôle.

`register.tsx` reconnaît un tour « vous » par identité (`role === YOU`), pas par son libellé.

## L'heure retenue

Le moteur ne donne pas l'heure d'un message. `stamp` la fixe à la première fois que le mod voit un `requestId`, et la garde dans `$.store` (clé `seen`, d'une session à l'autre). Pour borner le stockage, `pruneSeen` ne garde que les 3 000 plus récentes. Conséquence : un message vu pour la première fois après coup (reprise d'une vieille conversation) porte l'heure de son premier affichage, pas celle de son envoi.

## Repli

Hors « vous », un corps est replié sur 4 lignes (`clipLines`) tant que le message n'est pas déplié (`isExpanded`). Un message Cantina replié perd aussi son en-tête et sa formule de fin (`cantinaBody`) ; déplié, il est montré tel quel.
