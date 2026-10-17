---
titre: Process — de la branche à la release
type: regle
statut: actif
maj: 2026-10-17
---

# Process — de la branche à la release

Constaté sur les versions 0.1.0 et 0.2.0, et confirmé par l'opérateur.

1. **Directement sur `main`**, à jour (`git pull`) : **pas de branche ni de PR**. L'opérateur les a jugées inutiles sur ce projet (2026-10-17, après les PR #2 à #5). L'historique reste linéaire.
2. **Commits en français**, au format de l'historique (`git log --oneline`) :
   - `fix: …`, `docs: …` pour un changement ciblé ;
   - `chat-roles X.Y.Z : <résumé>` pour le commit de version ;
   - `Closes #n` dans le corps quand le commit résout une issue : l'issue se ferme au push sur `main`.
3. **Tests et validation au vert avant de pousser** (`claude plugin test .`, `claude plugin validate .`) : sans PR, c'est le seul filet avant `main`, que le marketplace lit.
4. **Push** sur `main`, jamais forcé. Le compte rendu à l'opérateur tient lieu de description de PR : le problème, ce qui change, ce qui est vérifié **et ce qui ne l'est pas**.
5. **Version** dans `.claude-plugin/plugin.json` seul : mineure pour un rôle ou un rendu nouveau, corrective pour un correctif. Une modification qui ne touche pas le mod (KB, seed, docs) ne change pas la version.
6. **Tag annoté** `vX.Y.Z` sur `main`, poussé, puis **release GitHub** (`gh release create vX.Y.Z --verify-tag`) avec des notes en français et la ligne `/plugin update chat-roles`. Première release taguée : `v0.2.0` (la 0.1.0 n'a pas de tag).

Version, tag et release se font **sur feu vert explicite de l'opérateur** (voir [consignes.md](consignes.md)). En mode `auto`, le classifieur de Claude Code peut refuser un geste de publication (« Merge Without Review ») qui n'a pas ce feu vert dans le message de l'opérateur : ne pas le contourner, demander le feu vert et relancer.

## Compte GitHub

Push et release se font avec le compte **`Happykiller`**, propriétaire du dépôt. Un autre compte connecté à `gh` peut n'avoir que la lecture (`gh api repos/Happykiller/claude-chat-roles --jq .permissions`) : vérifier avant de pousser. Le remote est en HTTPS : `gh auth login` en HTTPS, puis `gh auth setup-git`.
