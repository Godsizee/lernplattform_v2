'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import type { WeakNode, WeakEdge } from '@/app/api/adaptive/concept-nodes/weakness/route'
import { getNodeColor } from '@/lib/adaptive/weakness-score'
import { computeLayout } from '@/lib/adaptive/graph-layout'
import WeaknessSidebar from '@/components/adaptive/graph/WeaknessSidebar'

const NODE_R = 16
const LABEL_Y_GAP = 6   // Abstand Kreis → Text
const LABEL_FONT = 11   // px


// [innerColor, outerColor] für radialen Farbverlauf
const GRAD_STOPS: Record<ReturnType<typeof getNodeColor>, [string, string]> = {
  mastered:      ['#4ade80', '#15803d'],
  'not-started': ['#94a3b8', '#475569'],
  critical:      ['#f87171', '#b91c1c'],
  warning:       ['#fbbf24', '#b45309'],
}

// Basisfarbe je Status — für Glow-Filter-Farbe und Edge-Gradienten
const STATUS_COLOR: Record<ReturnType<typeof getNodeColor>, string> = {
  mastered:      '#22c55e',
  'not-started': '#64748b',
  critical:      '#ef4444',
  warning:       '#eab308',
}

// Numerischer Index für stabile Gradient-IDs (vermeidet Probleme mit "not-started"-Bindestrich)
const STATUS_IDX: Record<ReturnType<typeof getNodeColor>, number> = {
  mastered: 0, 'not-started': 1, critical: 2, warning: 3,
}

// Kubische Bezier-Kurve mit horizontalen Tangenten (Graph fließt links → rechts)
function bezierEdge(x1: number, y1: number, x2: number, y2: number): string {
  const cx = (x2 - x1) * 0.45
  return `M ${x1},${y1} C ${x1 + cx},${y1} ${x2 - cx},${y2} ${x2},${y2}`
}

interface Props {
  nodes: WeakNode[]
  edges: WeakEdge[]
}

export default function GraphClient({ nodes, edges }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const { nodes: layout, canvasWidth, canvasHeight } = computeLayout(
    nodes.map((n) => n.id),
    edges
  )

  const posMap = new Map(layout.map((n) => [n.id, { x: n.x, y: n.y }]))

  const colorMap = new Map(nodes.map((n) => [n.id, getNodeColor(n)]))

  // Einzigartige Status-Paare für Edge-Gradienten (nur Dark Mode)
  const edgePairs = new Set(
    edges
      .filter((e) => colorMap.has(e.from) && colorMap.has(e.to))
      .map((e) => `${STATUS_IDX[colorMap.get(e.from)!]}-${STATUS_IDX[colorMap.get(e.to)!]}`)
  )

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? null

  const topWeakNodes = [...nodes]
    .filter((n) => (n.weaknessScore ?? 0) > 0)
    .sort((a, b) => {
      const diff = (b.weaknessScore ?? 0) - (a.weaknessScore ?? 0)
      return diff !== 0 ? diff : a.title.localeCompare(b.title)
    })
    .slice(0, 5)

  return (
    <div>
      {/* SVG + Sidebar: nur Desktop */}
      <div className="hidden md:flex flex-col">
        {/* Legende */}
        <div className="flex flex-wrap gap-4 px-4 py-3 text-xs text-gray-500 dark:text-slate-400 border-b border-gray-100 dark:border-slate-700">
          {([
            ['#16a34a', 'Beherrscht'],
            ['#ca8a04', 'In Arbeit'],
            ['#dc2626', 'Kritisch (≥60% Fehler)'],
            ['#64748b', 'Nicht begonnen'],
          ] as const).map(([color, label]) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
        {/* Knoten-Info + Top-Schwachstellen */}
        <div className="border-b border-gray-100 dark:border-slate-700">
          <WeaknessSidebar
            selectedNode={selectedNode}
            topWeakNodes={topWeakNodes}
            onSelectNode={(id) => setSelectedId(id)}
            horizontal
          />
        </div>

        {/* SVG scrollt horizontal wenn nötig, sonst zentriert */}
        <div className="overflow-auto dark:bg-slate-900">
          <svg width={canvasWidth} height={canvasHeight} style={{ display: 'block', margin: '0 auto' }}>
            <defs>
              {/* Radiale Farbverläufe je Status */}
              {(Object.entries(GRAD_STOPS) as [ReturnType<typeof getNodeColor>, [string, string]][]).map(
                ([status, [inner, outer]]) => (
                  <radialGradient key={status} id={`grad-${status}`} cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor={inner} />
                    <stop offset="100%" stopColor={outer} />
                  </radialGradient>
                )
              )}

              {/* Drop-Shadow (Light Mode) */}
              <filter id="node-shadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00000025" />
              </filter>

              {/* Glow-Filter (Dark Mode) */}
              <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Edge-Gradienten (immer rendern — vermeidet Hydration-Mismatch) */}
              {Array.from(edgePairs).map((pair) => {
                const [fromIdx, toIdx] = pair.split('-').map(Number)
                const fromStatus = (Object.keys(STATUS_IDX) as ReturnType<typeof getNodeColor>[])
                  .find((k) => STATUS_IDX[k] === fromIdx)!
                const toStatus = (Object.keys(STATUS_IDX) as ReturnType<typeof getNodeColor>[])
                  .find((k) => STATUS_IDX[k] === toIdx)!
                return (
                  <linearGradient key={pair} id={`edge-${pair}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={STATUS_COLOR[fromStatus]} stopOpacity="0.55" />
                    <stop offset="100%" stopColor={STATUS_COLOR[toStatus]} stopOpacity="0.55" />
                  </linearGradient>
                )
              })}
            </defs>

            {/* Kanten: Bezier-Kurven, horizontal tangential */}
            {edges.map((e) => {
              const from = posMap.get(e.from)
              const to = posMap.get(e.to)
              if (!from || !to) return null
              const fromColor = colorMap.get(e.from)
              const toColor = colorMap.get(e.to)
              const pairId = (fromColor && toColor)
                ? `${STATUS_IDX[fromColor]}-${STATUS_IDX[toColor]}`
                : null
              return (
                <path
                  key={`${e.from}-${e.to}`}
                  d={bezierEdge(from.x + NODE_R, from.y, to.x - NODE_R, to.y)}
                  stroke={isDark && pairId ? `url(#edge-${pairId})` : (isDark ? '#334155' : '#cbd5e1')}
                  strokeWidth={1.5}
                  fill="none"
                  strokeLinecap="round"
                />
              )
            })}

            {/* Knoten */}
            {nodes.map((node) => {
              const pos = posMap.get(node.id)
              if (!pos) return null
              const color = getNodeColor(node)
              const isSelected = node.id === selectedId

              // Titel auf 2 Zeilen aufteilen (~14 Zeichen pro Zeile)
              const words = node.title.split(' ')
              const lines: string[] = []
              let cur = ''
              for (const w of words) {
                const candidate = cur ? cur + ' ' + w : w
                if (candidate.length > 14 && cur) { lines.push(cur); cur = w }
                else cur = candidate
              }
              if (cur) lines.push(cur)
              const labelLines = lines.slice(0, 2)

              const labelY = pos.y + NODE_R + LABEL_Y_GAP + LABEL_FONT

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedId(node.id === selectedId ? null : node.id)}
                  className="hover:brightness-125 transition-[filter] duration-150 ease-out"
                  style={{ cursor: 'pointer' }}
                >
                  {/* Klickfläche */}
                  <rect
                    x={pos.x - 70}
                    y={pos.y - NODE_R - 2}
                    width={140}
                    height={NODE_R * 2 + LABEL_Y_GAP + LABEL_FONT * 2 + 8}
                    fill="transparent"
                  />

                  {/* Selektions-Ring */}
                  {isSelected && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={NODE_R + 7}
                      fill="none"
                      stroke={STATUS_COLOR[color]}
                      strokeWidth={3}
                      opacity={0.5}
                    />
                  )}

                  {/* Farbkreis */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={NODE_R}
                    fill={`url(#grad-${color})`}
                    filter={isDark ? 'url(#node-glow)' : 'url(#node-shadow)'}
                  />

                  {/* Label darunter */}
                  {labelLines.map((line, i) => {
                    const textY = labelY + i * (LABEL_FONT + 2)
                    const chipW = Math.max(line.length * 6.2 + 12, 40)
                    const chipH = 14
                    return (
                      <g key={i}>
                        <rect
                          x={pos.x - chipW / 2}
                          y={textY - LABEL_FONT + 1}
                          width={chipW}
                          height={chipH}
                          rx={chipH / 2}
                          fill={isSelected ? (isDark ? '#475569' : '#334155') : (isDark ? '#1e293b' : '#e2e8f0')}
                        />
                        <text
                          x={pos.x}
                          y={textY}
                          textAnchor="middle"
                          fill={
                            isSelected
                              ? '#f1f5f9'
                              : (isDark ? '#94a3b8' : '#475569')
                          }
                          fontSize={LABEL_FONT}
                          fontWeight={isSelected ? '600' : '400'}
                        >
                          {line}
                        </text>
                      </g>
                    )
                  })}
                </g>
              )
            })}
          </svg>

        </div>

      </div>

      {/* Mobile: Top-5 Schwachstellen-Liste */}
      <div className="md:hidden">
        <div className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 border-b border-gray-100 dark:border-slate-700">
          Top-5 Schwachstellen
        </div>
        {topWeakNodes.length === 0 ? (
          <p className="px-4 py-6 text-sm text-center text-gray-400 dark:text-slate-500">
            Keine Schwachstellen — alles beherrscht!
          </p>
        ) : (
          <ul>
            {topWeakNodes.map((node, i) => {
              const color = getNodeColor(node)
              const dot: Record<typeof color, string> = {
                mastered: '#16a34a',
                'not-started': '#64748b',
                critical: '#dc2626',
                warning: '#ca8a04',
              }
              return (
                <li
                  key={node.id}
                  className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-slate-700 last:border-0"
                >
                  <span className="text-xs text-gray-400 dark:text-slate-500 w-4 text-right">{i + 1}.</span>
                  <span
                    className="inline-block h-3 w-3 shrink-0 rounded-full"
                    style={{ background: dot[color] }}
                  />
                  <span className="flex-1 text-sm text-gray-800 dark:text-slate-200">{node.title}</span>
                  <span className="text-xs text-gray-400 dark:text-slate-500">
                    {Math.round((node.weaknessScore ?? 0) * 100)}%
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
