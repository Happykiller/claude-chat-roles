---
titre: Le dépôt comme seed KoA
type: dat
statut: actif
maj: 2026-10-17
---

# Le dépôt comme seed KoA

Le dépôt est aussi une **seed** : KoA peut en faire naître un agent mainteneur dans une distro WSL dédiée. La méthode vient du livre `koa/seed` de la bibliothèque KoA.

- `koa.profil` : distro `chat-roles`, répertoire `~/projet`, agent Claude en mode `auto` sur `opus`, cloisonnement fermé (ni interop ni `/mnt/c`), aucun paquet hors socle dev. À faire relire par `mcp__koa__seed_verifier` après toute modification.
- Secrets saisis dans KoA, jamais dans le dépôt : `GH_TOKEN` (requis, *fine-grained* limité à `Happykiller/claude-chat-roles`, Contents / Pull requests / Issues en écriture), `GIT_USER_NAME` et `GIT_USER_EMAIL` (facultatifs).
- `bootstrap.sh` : rejouable (KoA le relance à chaque reprovisionnement). Il charge `~/.agent-env` depuis `~/.bashrc`, pose l'identité git du dépôt (`chat-roles-agent` par défaut) et branche `git push` sur gh. Il ne doit jamais afficher un secret.
- `CLAUDE.md` : le rôle de l'agent, son périmètre (ce seul dépôt), sa première consigne (état des issues) et ses limites (commits poussés directement sur `main`, version et release sur feu vert seulement).
- `.gitattributes` force les fins de ligne LF : un `bootstrap.sh` en CRLF échoue dans la distro sans le dire.

Non vérifié à ce jour : le bootstrap n'a pas encore tourné dans une distro créée par KoA (À COMPLÉTER après la première création).
