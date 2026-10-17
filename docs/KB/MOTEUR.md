---
titre: Cerveau moteur — .claude/
type: dat
statut: actif
maj: 2026-10-17
---

# Cerveau moteur

Ce que Claude sait *faire* sur ce projet, et quand s'en servir. On n'y ajoute que ce que l'usage a prouvé nécessaire (seuil : trois fois).

## Skills

| Skill | Quand l'utiliser | Fichier |
|---|---|---|
| `/capitalize` | En fin de session, ou après une décision ou une correction qui mérite de durer : propose ce qui rejoint la KB et ce qui devient un outil | [`.claude/skills/capitalize/SKILL.md`](../../.claude/skills/capitalize/SKILL.md) |
| `/cloture` | Pour refermer une session de travail : capitalise, committe, pousse, vérifie | [`.claude/skills/cloture/SKILL.md`](../../.claude/skills/cloture/SKILL.md) |

## Sous-agents

| Agent | Pourquoi il est isolé du contexte principal | Fichier |
|---|---|---|
| — | aucun à ce jour | — |

## Hooks

| Événement | Ce qu'il automatise | Fichier |
|---|---|---|
| — | aucun hook Claude Code pour travailler sur le projet (les hooks de `hooks/` sont le produit, pas l'outillage) | — |

## MCP

| Serveur | Ce qu'il donne accès | Config |
|---|---|---|
| `koa` | Bibliothèque KoA (livres `koa/seed`, `koa/ghost`), `seed_verifier`, Cantina, ouverture d'agents | fourni par KoA à la session, pas de `.mcp.json` dans le dépôt |
| `cockpit` | Plan d'exécution affiché à l'opérateur | plugin `cockpit` installé par l'opérateur, hors dépôt |

## Remarques sur les skills

- La détection des skills de sync data (`grep … 'description: .*(sync|synchro)'`, dans `/cloture`) **trouve `/cloture` lui-même**, dont la description parle de « synchronisation ». Ce n'est pas un skill de sync : l'ignorer. Un vrai skill de sync se reconnaît à ce qu'il pousse des données vers un remote.
- `/cloture` renvoie vers `factory-accueil-session.md`, absent du dépôt : le lien fait partie du contenu de référence du livre `koa/ghost`, il est laissé tel quel.
