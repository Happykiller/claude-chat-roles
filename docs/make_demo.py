#!/usr/bin/env python3
"""Draws the README's mockups: docs/chat-roles-flux.svg and docs/chat-roles-avant-apres.svg.

A mockup, not a capture: the transcript as the mod draws it, on a character
grid, with the role bar drawn as a shape. In the animated one, the messages
arrive one after another by CSS (GitHub renders an SVG's CSS animations in a
README, scripts never); with reduced motion, everything shows at once.

    python3 docs/make_demo.py
"""

from __future__ import annotations

from pathlib import Path
from xml.sax.saxutils import escape

HERE = Path(__file__).resolve().parent

# ── The grid and the palette ────────────────────────────────────────────────
CW = 8.4  # one cell across, at 14 px: monospace advance is 0.6 em
LH = 19.0  # one row down
FS = 14
FONT = "'JetBrains Mono','Cascadia Mono','SF Mono',Menlo,Consolas,'DejaVu Sans Mono',monospace"

BG = '#0F1117'
BAR = '#1A1D25'
EDGE = '#262A33'
TX = '#D7DEE9'
DM = '#7D8799'
FA = '#3A4356'
OK = '#8FC7A8'
WARN = '#F6B12A'
PROMPT_BG = '#1C2029'

# The mod's own colors, from hooks/roles.ts.
YOU = '#4ea1ff'
CLAUDE = '#3fcf8e'
PEER = '#e8b94a'
MUTED = '#8b93a5'

LOOP = 18.0  # seconds, one pass of the animated transcript


class Svg:
    def __init__(self, ox: float, oy: float):
        self.ox, self.oy = ox, oy
        self.out: list[str] = []
        self.styles: list[str] = []

    def x(self, col: float) -> float:
        return round(self.ox + col * CW, 2)

    def y(self, row: float) -> float:
        return round(self.oy + row * LH, 2)

    def text(self, col: float, row: float, s: str, color: str = TX, bold: bool = False, anchor: str = 'start', size: int = FS):
        weight = ' font-weight="700"' if bold else ''
        a = '' if anchor == 'start' else f' text-anchor="{anchor}"'
        fs = '' if size == FS else f' font-size="{size}"'
        self.out.append(f'<text x="{self.x(col)}" y="{self.y(row) + 14}" fill="{color}"{weight}{a}{fs}>{escape(s)}</text>')

    def runs(self, col: float, row: float, parts: list):
        c = col
        for p in parts:
            s, color = p[0], p[1]
            bold = len(p) > 2 and p[2]
            if s.strip():
                self.text(c, row, s, color, bold)
            c += len(s)

    def rect(self, col: float, row: float, w: float, h: float, fill: str, rx: float = 0, extra: str = ''):
        self.out.append(f'<rect x="{self.x(col)}" y="{self.y(row)}" width="{round(w * CW, 2)}" height="{round(h * LH, 2)}" rx="{rx}" fill="{fill}"{extra}/>')

    def open_group(self, cls: str = ''):
        self.out.append(f'<g class="{cls}">' if cls else '<g>')

    def close_group(self):
        self.out.append('</g>')

    def svg(self, w: float, h: float, title: str) -> str:
        return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{round(w)}" height="{round(h)}" viewBox="0 0 {round(w)} {round(h)}" font-family="{FONT}" font-size="{FS}" role="img" aria-label="{escape(title)}">
<title>{escape(title)}</title>
<style>
  text {{ white-space: pre; }}
  .cursor {{ animation: blink 1s steps(1, end) infinite; }}
  @keyframes blink {{ 0% {{ opacity: 1; }} 50% {{ opacity: 0.25; }} }}
{chr(10).join(self.styles)}
  @media (prefers-reduced-motion: reduce) {{ .cursor, .arrive {{ animation: none; }} }}
</style>
<rect width="100%" height="100%" rx="12" fill="{BG}"/>
{chr(10).join(self.out)}
</svg>
'''


def chrome(s: Svg, w: float, title: str):
    """The window's title bar: three lights and the tab's name."""
    s.out.append(f'<rect x="0" y="0" width="{round(w)}" height="34" rx="12" fill="{BAR}"/>')
    s.out.append(f'<rect x="0" y="22" width="{round(w)}" height="12" fill="{BAR}"/>')
    s.out.append(f'<line x1="0" y1="34" x2="{round(w)}" y2="34" stroke="{EDGE}"/>')
    for i, c in enumerate(['#F5837C', '#F6B12A', '#8FC7A8']):
        s.out.append(f'<circle cx="{20 + i * 18}" cy="17" r="5.5" fill="{c}" opacity="0.85"/>')
    s.out.append(f'<text x="{round(w / 2)}" y="22" fill="{DM}" text-anchor="middle" font-size="12">{escape(title)}</text>')


# ── The conversation ────────────────────────────────────────────────────────
# Each entry: (kind, label, color, detail, time, lines). `kind` is `you`,
# `claude`, `other` (a user-turn message that is not you) or `tool` (an
# engine-drawn tool row, which the mod leaves as it is).

CONVERSATION = [
    ('you', 'VOUS', YOU, None, '10:02', [
        'Lance les tests e2e en fond et préviens-moi quand ils passent.',
    ]),
    ('claude', 'CLAUDE', CLAUDE, None, '10:02', [
        'Je les lance en tâche de fond ; je reprends le routeur des',
        'webhooks en attendant.',
    ]),
    ('tool', None, None, None, None, [
        [('● ', OK), ('Bash', TX, True), ('(npm run test:e2e)', DM)],
        [('  └ ', FA), ('Running in the background', DM)],
    ]),
    ('other', 'session-b', PEER, None, '10:05', [
        "J'ai poussé le correctif de signature sur lot-2, tu peux rebaser.",
    ]),
    ('other', 'MONITOR', MUTED, 'local_bash · completed', '10:07', [
        'Background command "npm run test:e2e" completed (exit code 0)',
        '  128 passed, 0 failed',
        '  webhooks.spec.ts ........ 24 passed',
        '  billing.spec.ts ......... 61 passed',
        '  invoices.spec.ts ........ 43 passed',
    ]),
    ('claude', 'CLAUDE', CLAUDE, None, '10:07', [
        'Les e2e passent (128/128). Je rebase sur lot-2 pour récupérer',
        'le correctif de session-b.',
    ]),
    ('other', 'PLANIFIÉ', MUTED, None, '10:30', [
        'Vérifie la CI du lot 2 et résume les échecs.',
    ]),
]

COMPACT_LINES = 4  # the mod's clipLines for anyone but you


def body_of(kind: str, lines: list[str]) -> list[str]:
    if kind == 'other' and len(lines) > COMPACT_LINES:
        return lines[:COMPACT_LINES] + ['…']
    return lines


def with_roles(s: Svg, col: float, row: float, width: int, animate: bool) -> float:
    """The transcript as the mod draws it; returns the next free row."""
    r = row
    for i, (kind, label, color, detail, time, lines) in enumerate(CONVERSATION):
        if animate:
            # One message every 1.5 s, then the whole pass holds and fades.
            start = round(100 * (0.6 + i * 1.5) / LOOP, 2)
            fade = round(start + 2, 2)
            name = f'm{i}'
            s.styles.append(
                f'  .{name} {{ animation: {name} {LOOP}s ease-out infinite; }}\n'
                f'  @keyframes {name} {{ 0%, {start}% {{ opacity: 0; transform: translateY(8px); }} '
                f'{fade}%, 92% {{ opacity: 1; transform: translateY(0); }} 97%, 100% {{ opacity: 0; }} }}'
            )
            s.open_group(f'arrive {name}')
        if kind == 'tool':
            for line in lines:
                s.runs(col, r, line)
                r += 1
            r += 1
            if animate:
                s.close_group()
            continue
        body = body_of(kind, lines)
        height = 1 + len(body)
        s.rect(col, r, 0.95, height, color, rx=1.5)
        c = col + 2
        s.text(c, r, label, color, True)
        if detail:
            s.text(c + len(label) + 2, r, detail, DM)
        s.text(col + width, r, time, DM, anchor='end')
        for k, line in enumerate(body):
            if kind == 'you':
                s.text(c, r + 1 + k, line, TX, True)
            elif kind == 'claude':
                s.text(c, r + 1 + k, line, TX)
            else:
                s.text(c, r + 1 + k, line, DM)
        r += height + 1
        if animate:
            s.close_group()
    return r


def without_roles(s: Svg, col: float, row: float, width: int) -> float:
    """The same conversation as Claude Code draws it alone: every user-turn
    message is a `>` prompt, whoever sent it, with no time."""
    r = row
    for kind, _label, _color, _detail, _time, lines in CONVERSATION:
        if kind == 'tool':
            for line in lines:
                s.runs(col, r, line)
                r += 1
        elif kind == 'claude':
            for k, line in enumerate(lines):
                s.runs(col, r + k, [('● ' if k == 0 else '  ', TX), (line, TX)])
            r += len(lines)
        else:
            s.rect(col - 0.5, r - 0.1, width + 1, len(lines) + 0.2, PROMPT_BG, rx=3)
            for k, line in enumerate(lines):
                s.runs(col, r + k, [('> ' if k == 0 else '  ', DM), (line, TX)])
            r += len(lines)
        r += 1
    return r


def prompt(s: Svg, col: float, row: float, width: int):
    s.rect(col - 0.5, row + 0.4, width + 1, 0.06, EDGE)
    s.runs(col, row + 1, [('> ', TX)])
    s.rect(col + 2, row + 1.12, 0.9, 0.78, TX, extra=' class="cursor"')


def make_flux():
    cols = 84
    top = 34 + 12
    s = Svg(0, top)
    w = (cols + 4) * CW
    end = with_roles(s, 2, 0, cols - 2, animate=True)
    prompt(s, 2, end - 1, cols - 2)
    h = top + (end + 2) * LH + 6
    chrome(s, w, 'claude — ~/billing · chat-roles')
    (HERE / 'chat-roles-flux.svg').write_text(s.svg(w, h, 'Le flux Claude Code avec chat-roles : vous, Claude, une autre session, un monitor et un déclencheur planifié'), encoding='utf-8')


def make_avant_apres():
    pane = 74
    top = 34 + 12
    s = Svg(0, top)
    w = (2 * pane + 6) * CW
    s.text(2, 0, 'SANS chat-roles', DM, True, size=12)
    s.text(pane + 5, 0, 'AVEC chat-roles', CLAUDE, True, size=12)
    left = without_roles(s, 2.5, 2, pane - 3)
    right = with_roles(s, pane + 5, 2, pane - 4, animate=False)
    end = max(left, right)
    sep = (pane + 2.5) * CW
    h = top + (end + 0.5) * LH
    s.out.append(f'<line x1="{sep}" y1="34" x2="{sep}" y2="{round(h)}" stroke="{EDGE}"/>')
    chrome(s, w, 'claude — ~/billing')
    (HERE / 'chat-roles-avant-apres.svg').write_text(s.svg(w, h, 'Le même échange sans et avec chat-roles'), encoding='utf-8')


if __name__ == '__main__':
    make_flux()
    make_avant_apres()
