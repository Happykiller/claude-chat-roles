---
titre: Environnements et commandes
type: dat
statut: actif
maj: 2026-10-17
---

# Environnements et commandes

Depuis la racine du dépôt :

| Besoin | Commande |
|---|---|
| Tests | `claude plugin test .` |
| Validation du manifeste et du module, comme le moteur les lira | `claude plugin validate .` |
| Lancer une session avec le mod chargé | `claude --plugin-dir .` |
| Régénérer les maquettes | `python3 docs/make_demo.py` |

`claude plugin validate .` avertit que `CLAUDE.md` à la racine n'est pas chargé par le plugin : c'est attendu, il s'adresse à l'agent qui travaille sur le dépôt, pas aux utilisateurs du mod.

## Voir le rendu dans une session en cours

Le skill `plugin-authoring` de Claude Code ouvre un dossier de mods par session (`~/.claude/dev-mods/<session>/`). Une copie du mod dans ce dossier se charge à la fin du tour une fois le rechargement à chaud accepté, et se recharge à chaque modification. Si chat-roles est aussi installé depuis le marketplace, désactiver cette version le temps du test, sinon les deux rendus se marchent dessus.

Pour voir le rendu Cantina sans KoA : coller comme prompt un texte qui commence par une des signatures de [cantina.md](cantina.md).

## Publier

Pas de CI, et pas de PR : le marketplace lit `main`, donc tout push sur `main` est visible des nouvelles installations. Une version se publie par le bump, un tag et une release GitHub : voir [../REGLES/process.md](../REGLES/process.md). Les utilisateurs mettent à jour avec `/plugin update chat-roles`.
