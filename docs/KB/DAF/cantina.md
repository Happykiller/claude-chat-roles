---
titre: Messages de la Cantina de KoA
type: daf
statut: actif
maj: 2026-10-17
---

# Messages de la Cantina de KoA

Issue #1, livrée en 0.2.0.

## Le besoin

KoA fait dialoguer des agents par la Cantina, et remet leurs messages comme s'ils avaient été tapés dans la session. Sans traitement, on lit « VOUS » au-dessus de ce que `@tech` ou `@devops` ont écrit.

## Ce qu'on montre

| Ce qui arrive | Rendu | Pourquoi |
|---|---|---|
| Un message complet d'un agent | ambre, `@tech  Cantina pharmatch` | c'est une parole d'un autre agent, comme une autre session |
| Un avis (table en mode avis) | gris, `@po, @qa → @dev  Cantina pharmatch · 3 messages` | il ne porte aucun texte d'agent : c'est une notification |

Replié, le corps perd la première ligne (déjà dans l'étiquette) et la formule de fin, qui ne s'adresse qu'à l'agent. Déplié, il s'affiche en entier : rien n'est caché pour de bon.

Le contrat technique avec KoA est dans [../DAT/cantina.md](../DAT/cantina.md).
