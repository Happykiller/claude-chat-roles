# Chat roles pour Claude Code

Un mod pour [Claude Code](https://claude.com/claude-code) qui marque chaque message du flux d'une barre de couleur, d'une étiquette et de l'heure, pour voir d'un coup d'œil qui parle :

| Étiquette | Couleur | Qui |
| --- | --- | --- |
| `VOUS` | bleu | vos prompts (terminal, bridge, SDK) |
| `CLAUDE` | vert | les réponses de Claude |
| nom de l'expéditeur, ou `AUTRE SESSION` | ambre | les messages d'autres sessions, de canaux ou d'un coordinateur |
| `MONITOR`, `PLANIFIÉ` | gris | notifications de tâches de fond et déclencheurs planifiés |

Les messages qui ne viennent pas de vous sont repliés sur quatre lignes tant qu'ils ne sont pas dépliés. L'heure d'arrivée de chaque message est retenue d'une session à l'autre.

## Installation

Dans une session Claude Code, au terminal :

```
/plugin install chat-roles --marketplace Happykiller/claude-chat-roles
```

Répondez `y` à `Add marketplace?`, puis choisissez une portée (la portée user, proposée en premier, l'active dans toutes vos sessions).

Depuis un shell :

```
claude plugin install chat-roles --marketplace Happykiller/claude-chat-roles
```

Dans l'application desktop, où `/plugin` ne s'exécute pas : cliquez sur + à côté de la zone de prompt, puis Plugins, Add marketplace avec `Happykiller/claude-chat-roles`, puis Add plugin.

## Développement

```
claude plugin validate .
claude plugin test .
claude --plugin-dir .
```
