'use client'

import { useRouter } from 'next/navigation'
import type { WeakNode } from '@/app/api/adaptive/concept-nodes/weakness/route'
import { getNodeColor } from '@/lib/adaptive/weakness-score'

const COLOR_STYLES = {
  mastered:      { bg: 'bg-green-500',  text: 'text-green-700' },
  'not-started': { bg: 'bg-slate-400',  text: 'text-slate-500' },
  critical:      { bg: 'bg-red-600',    text: 'text-red-700 dark:text-red-400'   },
  warning:       { bg: 'bg-amber-500',  text: 'text-amber-700 dark:text-amber-400' },
}

interface Props {
  selectedNode: WeakNode | null
  topWeakNodes: WeakNode[]
  onSelectNode: (id: string) => void
  horizontal?: boolean
}

export default function WeaknessSidebar({ selectedNode, topWeakNodes, onSelectNode, horizontal }: Props) {
  const router = useRouter()

  function practiceNode(id: string) {
    router.push(`/adaptive/learn?nodeId=${id}`)
  }

  if (horizontal) {
    return (
      <div className="flex flex-wrap gap-4 p-4">
        {/* Selektierter Knoten */}
        {selectedNode ? (
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 shadow-sm">
            <div>
              <p className="text-xs text-gray-400 dark:text-slate-500">Ausgewählt</p>
              <p className="font-semibold text-gray-900 dark:text-slate-100 text-sm">{selectedNode.title}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-slate-100">
                {selectedNode.stats.totalAttempts === 0 ? '—' : `${selectedNode.weaknessScore ?? 0}%`}
              </p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Fehlerrate</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-slate-100">{selectedNode.stats.totalAttempts}</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Versuche</p>
            </div>
            <button
              onClick={() => practiceNode(selectedNode.id)}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
            >
              Jetzt üben →
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 dark:border-slate-700 px-4 py-2 text-xs text-gray-400 dark:text-slate-500 flex items-center">
            Knoten anklicken für Details
          </div>
        )}

        {/* Top-Schwachstellen */}
        {topWeakNodes.length > 0 && (
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 shrink-0">Top Schwachstellen:</p>
            {topWeakNodes.map((node, i) => {
              const color = COLOR_STYLES[getNodeColor(node)]
              return (
                <button
                  key={node.id}
                  onClick={() => onSelectNode(node.id)}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-slate-700 px-2 py-1 text-xs hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${color.bg}`}>
                    {i + 1}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-slate-200">{node.title}</span>
                  <span className={`font-semibold ${color.text}`}>{node.weaknessScore}%</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // Vertikale Variante (nicht mehr aktiv genutzt, bleibt als Fallback)
  return (
    <div className="w-56 shrink-0 flex flex-col gap-4 p-4 border-l border-gray-100 dark:border-slate-700">
      {selectedNode ? (
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-sm">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500">Ausgewählt</p>
          <p className="mb-3 font-semibold text-gray-900 dark:text-slate-100 text-sm leading-snug">{selectedNode.title}</p>
          <div className="mb-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-gray-50 dark:bg-slate-800 p-2 text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-slate-100">
                {selectedNode.stats.totalAttempts === 0 ? '—' : `${selectedNode.weaknessScore ?? 0}%`}
              </p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Fehlerrate</p>
            </div>
            <div className="rounded-lg bg-gray-50 dark:bg-slate-800 p-2 text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-slate-100">{selectedNode.stats.totalAttempts}</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Versuche</p>
            </div>
          </div>
          <button
            onClick={() => practiceNode(selectedNode.id)}
            className="w-full rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
          >
            Jetzt üben →
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 dark:border-slate-700 p-3 text-center text-xs text-gray-400 dark:text-slate-500">
          Knoten anklicken für Details
        </div>
      )}
      {topWeakNodes.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500">Top Schwachstellen</p>
          <div className="space-y-2">
            {topWeakNodes.map((node, i) => {
              const color = COLOR_STYLES[getNodeColor(node)]
              return (
                <button
                  key={node.id}
                  onClick={() => onSelectNode(node.id)}
                  className="flex w-full items-center gap-2 rounded-lg p-2 text-left hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${color.bg}`}>
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-gray-800 dark:text-slate-200">{node.title}</p>
                    <div className="mt-0.5 h-1 rounded-full bg-gray-100 dark:bg-slate-700">
                      <div className={`h-full rounded-full ${color.bg}`} style={{ width: `${node.weaknessScore ?? 0}%` }} />
                    </div>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold ${color.text}`}>{node.weaknessScore}%</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
