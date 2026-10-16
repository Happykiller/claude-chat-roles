import type { EngineInterface, Register } from 'claude-code'

import { CLAUDE, clipLines, formatTime, pruneSeen, roleOfUserMessage } from './roles'
import type { Role } from './roles'

const STORE_KEY = 'seen'
const KEEP = 3000
const COMPACT_LINES = 4

let seen: Record<string, number> | null = null

const stamp = async ($: EngineInterface, id: string): Promise<number> => {
  if (seen === null) {
    seen = ((await $.store.get(STORE_KEY)) as Record<string, number> | undefined) ?? {}
  }

  const known = seen[id]

  if (known !== undefined) {
    return known
  }

  const now = await $.clock.now()
  seen = pruneSeen({ ...seen, [id]: now }, KEEP)

  try {
    await $.store.set(STORE_KEY, seen)
  } catch {
    return now
  }

  return now
}

export const register: Register = on => {
  on('ui.render', { component: 'UserMessage' }, async ($, e, next) => {
    const { Box, Text } = $.ui.resolve(e)
    const role: Role = roleOfUserMessage(e.props.origin, e.props.from, e.props.task)
    const time = formatTime(await stamp($, e.requestId))
    const isYou = role.label === 'VOUS'
    const body = isYou || e.props.isExpanded ? e.props.text : clipLines(e.props.text, COMPACT_LINES)

    return (
      <Box flexDirection="row" marginBottom={1}>
        <Box width={1} backgroundColor={role.color} />
        <Box flexDirection="column" flexGrow={1} marginLeft={1}>
          <Box flexDirection="row">
            <Text bold color={role.color}>{role.label}</Text>
            {role.detail === undefined ? null : <Text dimColor>{`  ${role.detail}`}</Text>}
            <Box flexGrow={1} />
            <Text dimColor>{time}</Text>
          </Box>
          <Text bold={isYou} dimColor={!isYou}>{body}</Text>
        </Box>
      </Box>
    )
  })

  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    if (e.props.isSummary === true) {
      return next(e)
    }

    const { Box, Text, Markdown } = $.ui.resolve(e)
    const time = e.props.isFirstOfReply ? formatTime(await stamp($, e.requestId)) : null

    return (
      <Box flexDirection="row" marginBottom={1}>
        <Box width={1} backgroundColor={CLAUDE.color} />
        <Box flexDirection="column" flexGrow={1} marginLeft={1}>
          {time === null ? null : (
            <Box flexDirection="row">
              <Text bold color={CLAUDE.color}>{CLAUDE.label}</Text>
              <Box flexGrow={1} />
              <Text dimColor>{time}</Text>
            </Box>
          )}
          <Markdown text={e.props.text} />
        </Box>
      </Box>
    )
  })
}
