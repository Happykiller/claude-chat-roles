---
titre: Consignes de l'opérateur
type: regle
statut: actif
maj: 2026-10-17
---

# Consignes de l'opérateur

Contraignantes. Chaque consigne dit d'où elle vient.

- **Merge, version, tag et release seulement sur feu vert explicite**, donné pour cette PR ou cette version. Choix de l'opérateur en montant la seed (rôle « mainteneur + release »), et pratique suivie pour la 0.2.0.
- **Merge en rebase**, pour garder `main` linéaire. Retenu pour les PR #2 et #3.
- **Ne pas fermer une issue avant que son correctif soit sur `main`** : elle se ferme par le `Closes #n` au merge.
- **Les commits de l'opérateur sont signés `happykiller <fabrice.rosito@gmail.com>`**, comme l'historique, posé commit par commit (`git -c user.name=… -c user.email=…`) sans toucher à la config git. L'agent né de la seed signe, lui, avec l'identité que lui donne son bootstrap.
- **Un jeton ne se colle jamais dans la conversation** : il se saisit à l'invite de `gh auth login` ou dans KoA. Un jeton exposé se révoque.
