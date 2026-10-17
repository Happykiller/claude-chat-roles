#!/usr/bin/env bash
# Rejouable : KoA le relance à chaque reprovisionnement. Ne journalise jamais la valeur d'un secret.
set -euo pipefail
LOG="$HOME/bootstrap.log"
: > "$LOG"
log() { echo "bootstrap : $*" | tee -a "$LOG"; }

[ -f "$HOME/.agent-env" ] && source "$HOME/.agent-env"

# Les shells de l'agent (et donc gh) voient les secrets.
LINE='[ -f "$HOME/.agent-env" ] && source "$HOME/.agent-env"'
grep -qxF "$LINE" "$HOME/.bashrc" 2>/dev/null || echo "$LINE" >> "$HOME/.bashrc"
log "secrets chargés par ~/.bashrc"

# Identité des commits, propre au dépôt.
git config user.name "${GIT_USER_NAME:-chat-roles-agent}"
git config user.email "${GIT_USER_EMAIL:-chat-roles-agent@users.noreply.github.com}"
log "identité git : $(git config user.name)"

# git push en HTTPS passe par gh, qui lit GH_TOKEN.
if [ -n "${GH_TOKEN:-}" ]; then
  gh auth setup-git
  log "gh : jeton présent, git configuré pour l'utiliser"
else
  log "gh : GH_TOKEN absent, ni push ni PR possibles"
fi

log "terminé, distro=${WSL_DISTRO_NAME:-?} utilisateur=$(whoami)"
