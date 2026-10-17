---
titre: Stack technique
type: dat
statut: actif
maj: 2026-10-17
---

# Stack technique

- **Un mod Claude Code**, c'est-à-dire un plugin dont le manifeste `.claude-plugin/plugin.json` déclare un module de hooks (`hooks/hooks.json` → `./register.tsx`).
- **TypeScript + JSX**. Le module tourne dans l'environnement propre au moteur de mods : ni DOM, ni Node. Tout ce qui sort du module passe par `$` (`$.ui`, `$.store`, `$.clock`…). Le JSX compile contre le `h` global, et les éléments (`Box`, `Text`, `Markdown`) viennent de `$.ui.resolve(e)`.
- **Aucune dépendance** : pas de `package.json`, pas de `node_modules`. Les types (`'claude-code'`, `'claude-code/testing'`) sont fournis par le moteur.
- **`tsconfig.json`** étend `./.claude-plugin/types/tsconfig.json`, que le moteur écrit lui-même quand il charge le mod. Ce dossier n'est pas versionné : sur un clone neuf, il n'existe pas tant que le mod n'a pas été chargé.
- **Python 3**, bibliothèque standard seule, pour le générateur de maquettes ([maquettes.md](maquettes.md)).
- **Version** : portée par `.claude-plugin/plugin.json` seul. Distribution par le marketplace du dépôt (`.claude-plugin/marketplace.json`, `source: "./"`).
- Version de Claude Code sur laquelle le mod a été écrit et testé : À COMPLÉTER.
