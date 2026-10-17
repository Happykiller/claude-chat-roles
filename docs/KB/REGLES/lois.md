---
titre: Lois du projet
type: regle
statut: actif
maj: 2026-10-17
---

# Lois du projet

Non négociables.

1. **Jamais de secret dans le dépôt**, une PR, une note de release ou une sortie de commande. Les secrets de la seed se saisissent dans KoA ; `bootstrap.sh` ne les affiche pas.
2. **Jamais de force-push sur `main`, ni de réécriture d'un tag publié.** Le marketplace lit `main` : le réécrire casse les installations et les mises à jour.
3. **Jamais un tour de l'utilisateur attribué à quelqu'un d'autre.** Une signature (Cantina ou autre) n'est reconnue que si elle est un contrat stable de son émetteur et qu'elle ne peut pas apparaître dans un prompt ordinaire. Mieux vaut un « VOUS » de trop qu'une parole de l'utilisateur mise dans la bouche d'un agent.
4. **Les signatures de la Cantina suivent KoA**, pas l'inverse : on les reprend telles que KoA les fige, sans les assouplir.
5. **Les couleurs de `hooks/roles.ts` et celles de `docs/make_demo.py` changent ensemble**, sinon le README montre un rendu qui n'existe pas.
