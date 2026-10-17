import { expect, test } from 'claude-code/testing'

import { cantinaBody, clipLines, formatTime, pruneSeen, roleOfUserMessage } from './roles'

const FOOTER =
  "Si une réponse est attendue, donne-la sur la table avec l'outil cantina_dire (table « pharmatch », a « @tech ») ; un simple accusé de réception n'en est pas une."
const CANTINA_MESSAGE = `[Cantina · pharmatch · de @tech]\nLe build est vert.\n\n${FOOTER}`
const CANTINA_NOTICE = `[Cantina · pharmatch · 3 messages pour @dev de @po, @qa]\nLis-les avec l'outil cantina_courrier (table « pharmatch »).\n\n${FOOTER}`

test('a composer prompt is the user', () => {
  expect(roleOfUserMessage({ kind: 'composer' }).label).toBe('VOUS')
  expect(roleOfUserMessage({ kind: 'composer' }, undefined, undefined, 'Salut [Cantina]').label).toBe('VOUS')
})

test('a Cantina message is labelled with its author and table', () => {
  const role = roleOfUserMessage({ kind: 'composer' }, undefined, undefined, CANTINA_MESSAGE)

  expect(role.label).toBe('@tech')
  expect(role.detail).toBe('Cantina pharmatch')
})

test('a Cantina message wrapped in pasted_content is still recognised', () => {
  const text = `<pasted_content id="x1">\n${CANTINA_MESSAGE}\n</pasted_content>`

  expect(roleOfUserMessage({ kind: 'composer' }, undefined, undefined, text).label).toBe('@tech')
  expect(cantinaBody(text)).toBe('Le build est vert.')
})

test('a Cantina notice names senders, recipient and count', () => {
  const role = roleOfUserMessage({ kind: 'composer' }, undefined, undefined, CANTINA_NOTICE)

  expect(role.label).toBe('@po, @qa → @dev')
  expect(role.detail).toBe('Cantina pharmatch · 3 messages')
})

test('a single-message Cantina notice is singular', () => {
  const text = '[Cantina · pharmatch · 1 message pour @dev de @po]\nLis-le avec l\'outil cantina_courrier (table « pharmatch »).'

  expect(roleOfUserMessage({ kind: 'composer' }, undefined, undefined, text).detail).toBe('Cantina pharmatch · 1 message')
})

test('cantinaBody drops the header and the closing formula', () => {
  expect(cantinaBody(CANTINA_MESSAGE)).toBe('Le build est vert.')
  expect(cantinaBody(CANTINA_NOTICE)).toBe("Lis-les avec l'outil cantina_courrier (table « pharmatch »).")
})

test('a task notification is a monitor with its status', () => {
  const role = roleOfUserMessage({ kind: 'task-notification' }, undefined, { type: 'monitor', status: 'completed' })

  expect(role.label).toBe('MONITOR')
  expect(role.detail).toBe('monitor · completed')
})

test('a peer message carries the sender name', () => {
  expect(roleOfUserMessage({ kind: 'peer' }, { name: 'session-b' }).label).toBe('session-b')
})

test('clipLines keeps short text and cuts long text', () => {
  expect(clipLines('a\nb', 4)).toBe('a\nb')
  expect(clipLines('1\n2\n3\n4\n5\n6', 4)).toBe('1\n2\n3\n4\n…')
})

test('formatTime pads hours and minutes', () => {
  expect(formatTime(new Date(2026, 9, 16, 9, 5).getTime())).toBe('09:05')
})

test('pruneSeen keeps the newest entries', () => {
  expect(Object.keys(pruneSeen({ a: 1, b: 2, c: 3 }, 2))).toEqual(['b', 'c'])
})
