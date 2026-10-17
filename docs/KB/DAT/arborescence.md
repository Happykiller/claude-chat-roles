---
titre: Arborescence
type: dat
statut: actif
maj: 2026-10-17
---

# Arborescence

| Chemin | Rôle |
|---|---|
| `.claude-plugin/plugin.json` | Manifeste du mod : nom, **version**, description |
| `.claude-plugin/marketplace.json` | Le dépôt comme marketplace, pour `/plugin install chat-roles --marketplace Happykiller/claude-chat-roles` |
| `hooks/hooks.json` | Déclare le module de hooks |
| `hooks/register.tsx` | Le rendu : hooks `ui.render` sur `UserMessage` et `AssistantMessage` ([rendu.md](rendu.md)) |
| `hooks/roles.ts` | La logique pure : rôle d'un message, Cantina, heure, repli, purge |
| `hooks/roles.test.ts` | Les tests, lancés par `claude plugin test .` |
| `docs/make_demo.py` | Générateur des maquettes SVG du README ([maquettes.md](maquettes.md)) |
| `docs/*.svg` | Les maquettes générées |
| `docs/KB/` | Cette base de connaissance |
| `.claude/skills/` | Les skills projet `/capitalize` et `/cloture` ([../MOTEUR.md](../MOTEUR.md)) |
| `koa.profil`, `bootstrap.sh` | Le dépôt comme seed KoA ([seed-koa.md](seed-koa.md)) |
| `CLAUDE.md` | Le rôle de l'agent mainteneur, et le branchement de cette KB |
| `README.md` | La page publique du mod |

Tout ce qui est à la racine est aussi copié chez ceux qui installent le plugin (`source: "./"`) : la KB, la seed et les skills voyagent avec le mod, sans effet sur lui.
