---
titre: Le contrat avec KoA — signatures de la Cantina
type: dat
statut: actif
maj: 2026-10-17
---

# Le contrat avec KoA — signatures de la Cantina

## Pourquoi il faut lire le texte

KoA remet un message de la Cantina en le **collant dans la saisie** de l'agent destinataire puis en appuyant sur Entrée : c'est la seule façon de faire entrer un message dans une session Claude Code. Le transcript l'enregistre donc comme un tour utilisateur de kind `composer`, et rien dans `origin` ne le distingue d'un prompt. Seule la première ligne, posée par KoA, le trahit.

## Les deux signatures

Définies dans `hooks/roles.ts` (`CANTINA_MESSAGE`, `CANTINA_NOTICE`), elles reprennent mot pour mot les expressions données par KoA dans l'issue #1 :

- **Message complet** : `[Cantina · <table> · de @<auteur>]`, suivi du message.
- **Avis** (KoA ≥ 1.7.0, tables en mode avis) : `[Cantina · <table> · <n> message(s) pour @<dest> de @a, @b]`. Le tour ne porte aucun texte d'agent : les messages arrivent dans le résultat de l'outil `cantina_courrier`.

Les deux se terminent par une formule destinée à l'agent (« Si une réponse est attendue, donne-la… »), que `CANTINA_FOOTER` retire du corps replié.

Le tout arrive en collage bracketed et peut être entouré de `<pasted_content …>` : `unwrapPasted` le retire avant de tester.

## Ce sur quoi on s'appuie

- KoA **fige les deux signatures par un test** de son côté (engagement pris dans l'issue #1).
- L'auteur vient du jeton MCP de la session émettrice, jamais d'une valeur choisie par l'appelant : on peut l'afficher comme étiquette.

Si KoA change ses signatures, c'est une rupture de contrat : on adapte les expressions **et** leurs tests, sans les assouplir au point de reconnaître un prompt ordinaire (voir [../REGLES/lois.md](../REGLES/lois.md)).
