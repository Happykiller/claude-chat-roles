import { expect, test } from 'claude-code/testing'

import { clipLines, formatTime, pruneSeen, roleOfUserMessage } from './roles'

test('a composer prompt is the user', () => {
  expect(roleOfUserMessage({ kind: 'composer' }).label).toBe('VOUS')
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
