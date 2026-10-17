---
titre: Workflows outillés
type: regle
statut: actif
maj: 2026-10-17
---

# Workflows outillés

## Traiter une issue

1. Lire l'issue **et ses commentaires** : l'issue #1 a reçu une seconde signature en commentaire, absente du corps.
2. Logique dans `hooks/roles.ts` + tests dans `hooks/roles.test.ts`, puis le branchement dans `hooks/register.tsx`.
3. `claude plugin test .` puis `claude plugin validate .`.
4. README (tableau des rôles) et, si le rendu change, maquettes (`python3 docs/make_demo.py`).
5. Voir le rendu dans une vraie session si possible ([../DAT/environnements.md](../DAT/environnements.md)).
6. Commit et push sur `main`, sans PR : [process.md](process.md).

## Clore une session

`/cloture` : capitalise (`/capitalize`), committe et pousse, puis vérifie que tout est propre. Voir [../MOTEUR.md](../MOTEUR.md).

## Faire évoluer la seed KoA

Modifier `koa.profil`, le faire relire par `mcp__koa__seed_verifier` jusqu'à « valide », garder `bootstrap.sh` rejouable et exécutable (`git update-index --chmod=+x`). Voir [../DAT/seed-koa.md](../DAT/seed-koa.md).
