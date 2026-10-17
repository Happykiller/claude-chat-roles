export type Role = {
  label: string
  color: string
  detail?: string
}

export type OriginLike = { kind: string; server?: string }
export type FromLike = { name: string }
export type TaskLike = { type?: string; status?: string }

export const YOU: Role = { label: 'VOUS', color: '#4ea1ff' }
export const CLAUDE: Role = { label: 'CLAUDE', color: '#3fcf8e' }
const PEER_COLOR = '#e8b94a'
const MUTED_COLOR = '#8b93a5'

const YOU_KINDS = ['composer', 'bridge', 'sdk']
const PEER_KINDS = ['peer', 'peer-send-message', 'projects-relay', 'coordinator']

// Signatures que KoA met en tête d'une remise de la Cantina (figées par un test côté KoA).
const CANTINA_MESSAGE = /^\[Cantina · (?<table>[^·\]]+?) · de @(?<auteur>[a-z0-9-]+)\]/
const CANTINA_NOTICE =
  /^\[Cantina · (?<table>[^·\]]+?) · (?<n>\d+) messages? pour @(?<dest>[a-z0-9-]+) de (?<auteurs>@[a-z0-9-]+(?:, @[a-z0-9-]+)*)\]/
const CANTINA_FOOTER = /\n+Si une réponse est attendue, donne-la sur la table avec l'outil cantina_dire[^\n]*\s*$/
const PASTED_OPEN = /^\s*<pasted_content[^>]*>\s*/
const PASTED_CLOSE = /\s*<\/pasted_content>\s*$/

const unwrapPasted = (text: string): string =>
  PASTED_OPEN.test(text) ? text.replace(PASTED_OPEN, '').replace(PASTED_CLOSE, '') : text

export const cantinaRole = (text: string): Role | null => {
  const head = unwrapPasted(text)
  const message = CANTINA_MESSAGE.exec(head)?.groups

  if (message !== undefined) {
    return { label: `@${message.auteur}`, color: PEER_COLOR, detail: `Cantina ${message.table}` }
  }

  const notice = CANTINA_NOTICE.exec(head)?.groups

  if (notice !== undefined) {
    const count = `${notice.n} message${notice.n === '1' ? '' : 's'}`

    return {
      label: `${notice.auteurs} → @${notice.dest}`,
      color: MUTED_COLOR,
      detail: `Cantina ${notice.table} · ${count}`,
    }
  }

  return null
}

// Retire l'en-tête (déjà dans l'étiquette) et la formule de fin, qui ne sert qu'à l'agent.
export const cantinaBody = (text: string): string =>
  unwrapPasted(text)
    .replace(/^[^\n]*\n?/, '')
    .replace(CANTINA_FOOTER, '')
    .trim()

export const roleOfUserMessage = (
  origin: OriginLike,
  from?: FromLike,
  task?: TaskLike,
  text?: string,
): Role => {
  if (YOU_KINDS.includes(origin.kind)) {
    return (text === undefined ? null : cantinaRole(text)) ?? YOU
  }

  if (origin.kind === 'task-notification') {
    const detail = [task?.type, task?.status].filter(Boolean).join(' · ')

    return { label: 'MONITOR', color: MUTED_COLOR, detail: detail || undefined }
  }

  if (origin.kind === 'scheduled-trigger') {
    return { label: 'PLANIFIÉ', color: MUTED_COLOR }
  }

  if (origin.kind === 'channel') {
    return { label: from?.name ?? origin.server ?? 'CANAL', color: PEER_COLOR }
  }

  if (PEER_KINDS.includes(origin.kind) || from !== undefined) {
    return { label: from?.name ?? 'AUTRE SESSION', color: PEER_COLOR }
  }

  return { label: origin.kind.toUpperCase(), color: MUTED_COLOR }
}

const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`)

export const formatTime = (ms: number): string => {
  const date = new Date(ms)

  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export const clipLines = (text: string, max: number): string => {
  const lines = text.split('\n')

  if (lines.length <= max) {
    return text
  }

  return `${lines.slice(0, max).join('\n')}\n…`
}

export const pruneSeen = (
  seen: Record<string, number>,
  keep: number,
): Record<string, number> => {
  const entries = Object.entries(seen)

  if (entries.length <= keep) {
    return seen
  }

  return Object.fromEntries(entries.sort((a, b) => a[1] - b[1]).slice(-keep))
}
