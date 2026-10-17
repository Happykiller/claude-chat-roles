---
titre: Consignes de l'opérateur
type: regle
statut: actif
maj: 2026-10-17
---

# Consignes de l'opérateur

Contraignantes. Chaque consigne dit d'où elle vient.

- **Pas de branche ni de PR : commit et push directement sur `main`.** Correction de l'opérateur le 2026-10-17 (« arrêt de faire des PR c'est inutile »), après quatre PR ouvertes puis mergées dans la même session. Les PR #2 à #5 restent dans l'historique, mais ne sont plus le process.
- **Version, tag et release seulement sur feu vert explicite**, donné pour cette version. Choix de l'opérateur en montant la seed (rôle « mainteneur + release »), et pratique suivie pour la 0.2.0.
- **Ne pas fermer une issue à la main avant que son correctif soit sur `main`** : elle se ferme par le `Closes #n` du commit poussé.
- **Les commits de l'opérateur sont signés `happykiller <fabrice.rosito@gmail.com>`**, comme l'historique, posé commit par commit (`git -c user.name=… -c user.email=…`) sans toucher à la config git. L'agent né de la seed signe, lui, avec l'identité que lui donne son bootstrap.
- **Un jeton ne se colle jamais dans la conversation** : il se saisit à l'invite de `gh auth login` ou dans KoA. Un jeton exposé se révoque.
