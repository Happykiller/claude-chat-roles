---
titre: Process — de la branche à la release
type: regle
statut: actif
maj: 2026-10-17
---

# Process — de la branche à la release

Constaté sur les versions 0.1.0 et 0.2.0, et confirmé par l'opérateur.

1. **Branche** depuis `main` à jour : `fix/…`, `feat/…`, `chore/…`. Pas de commit direct sur `main` pour du code.
2. **Commits en français**, au format de l'historique (`git log --oneline`) :
   - `fix: …`, `docs: …` pour un changement ciblé ;
   - `chat-roles X.Y.Z : <résumé>` pour le commit de version ;
   - `Closes #n` dans le corps quand le commit résout une issue.
3. **PR** vers `main` : le problème, ce qui change, ce qui est vérifié **et ce qui ne l'est pas**.
4. **Merge en rebase** (`gh pr merge <n> --rebase --delete-branch`) : l'historique de `main` reste linéaire. L'issue se ferme par le `Closes #n` au merge, pas à la main avant.
5. **Version** dans `.claude-plugin/plugin.json` seul : mineure pour un rôle ou un rendu nouveau, corrective pour un correctif. Une modification qui ne touche pas le mod (KB, seed, docs) ne change pas la version.
6. **Tag annoté** `vX.Y.Z` sur `main`, poussé, puis **release GitHub** (`gh release create vX.Y.Z --verify-tag`) avec des notes en français et la ligne `/plugin update chat-roles`. Première release taguée : `v0.2.0` (la 0.1.0 n'a pas de tag).

Merge, version, tag et release se font **sur feu vert explicite de l'opérateur** (voir [consignes.md](consignes.md)). En mode `auto`, le classifieur de Claude Code refuse d'ailleurs un `gh pr merge` qui n'a pas ce feu vert dans le message de l'opérateur (« Merge Without Review ») : ne pas le contourner, demander le feu vert et relancer.

## Compte GitHub

Push, merge et release se font avec le compte **`Happykiller`**, propriétaire du dépôt. Un autre compte connecté à `gh` peut n'avoir que la lecture (`gh api repos/Happykiller/claude-chat-roles --jq .permissions`) : vérifier avant de pousser. Le remote est en HTTPS : `gh auth login` en HTTPS, puis `gh auth setup-git`.
