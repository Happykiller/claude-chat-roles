---
titre: Attribution des messages du flux
type: daf
statut: actif
maj: 2026-10-17
---

# Attribution des messages du flux

## Le besoin

Sans le mod, vos prompts, le message d'une autre session, la fin d'une tâche de fond et un déclencheur planifié s'affichent tous comme un prompt `>`. Dans un fil à plusieurs agents, on ne sait plus qui a dit quoi.

## Les rôles

Chaque message porte une barre de couleur, une étiquette et une heure. Le tableau public est dans le `README.md` ; ce qui compte ici, c'est la logique des couleurs :

| Couleur | Sens |
|---|---|
| bleu | **vous** : seul rôle affiché en gras et jamais replié |
| vert | **Claude** |
| ambre | **un autre interlocuteur** : autre session, canal, coordinateur, agent de la Cantina |
| gris | **une notification**, pas une parole : tâche de fond, déclencheur planifié, avis de la Cantina |

Règle : l'étiquette nomme l'auteur réel quand on le connaît (`from.name`, nom du canal, `@auteur` de la Cantina), et un libellé générique sinon (`AUTRE SESSION`, `CANAL`, ou le kind en majuscules).

## Repli et heure

- Ce qui ne vient pas de vous est replié sur quatre lignes tant que le message n'est pas déplié : vos propres mots restent lisibles en entier, le reste ne noie pas le fil.
- L'heure est celle de la première apparition du message, retenue d'une session à l'autre (détail technique : [../DAT/rendu.md](../DAT/rendu.md)).
