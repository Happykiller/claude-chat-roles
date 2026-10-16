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

export const roleOfUserMessage = (
  origin: OriginLike,
  from?: FromLike,
  task?: TaskLike,
): Role => {
  if (YOU_KINDS.includes(origin.kind)) {
    return YOU
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
