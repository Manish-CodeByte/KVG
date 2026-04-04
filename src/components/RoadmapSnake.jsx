import { useState, useEffect } from 'react'
import RoadmapNode from './RoadmapNode'
import { useToast } from '../context/ToastContext'

export default function RoadmapSnake({ modules, onModuleClick, initialProgress = 0 }) {
  const { addToast } = useToast()
  const [progress, setProgress] = useState(initialProgress)
  const [nodeStates, setNodeStates] = useState(
    modules.map((_, index) =>
      index < initialProgress ? 'completed' : index === initialProgress ? 'current' : 'locked'
    )
  )

  // Handle module completion
  const completeModule = (index) => {
    if (nodeStates[index] === 'locked') {
      addToast('Module is locked!', 'error')
      return
    }

    // Mark as completed
    const newStates = [...nodeStates]
    newStates[index] = 'completed'

    // Unlock next module
    if (index < modules.length - 1 && newStates[index + 1] === 'locked') {
      newStates[index + 1] = 'current'
      addToast('🔓 Next Module Unlocked!', 'info')
    }

    setNodeStates(newStates)
    setProgress(index + 1)
    addToast('Module Completed ✅', 'success')
    onModuleClick?.(index)
  }

  // Arrange nodes in snake pattern
  const arrangeInSnakePattern = () => {
    const nodesPerRow = 3
    const rows = Math.ceil(modules.length / nodesPerRow)
    const arrangement = []

    for (let row = 0; row < rows; row++) {
      const isEvenRow = row % 2 === 0
      const startIdx = row * nodesPerRow
      const endIdx = Math.min(startIdx + nodesPerRow, modules.length)
      const rowNodes = modules.slice(startIdx, endIdx)

      const rowConfig = {
        nodes: isEvenRow ? rowNodes : [...rowNodes].reverse(),
        originalIndices: isEvenRow 
          ? Array.from({ length: rowNodes.length }, (_, i) => startIdx + i)
          : Array.from({ length: rowNodes.length }, (_, i) => endIdx - 1 - i),
        isEvenRow,
      }

      arrangement.push(rowConfig)
    }

    return arrangement
  }

  const snakeArrangement = arrangeInSnakePattern()

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Learning Roadmap</h1>
          <p className="text-lg text-gray-600">
            {progress} of {modules.length} modules completed
          </p>

          {/* Progress Bar */}
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-md h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                style={{ width: `${(progress / modules.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Snake Path Visualization */}
        <div className="relative">
          {/* SVG for connection lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {snakeArrangement.map((row, rowIdx) => (
              <g key={`row-${rowIdx}`}>
                {/* Horizontal connections within row */}
                {row.nodes.map((_, nodeIdx) => {
                  if (nodeIdx < row.nodes.length - 1) {
                    const x1 = (nodeIdx + 0.5) * (100 / row.nodes.length) + 2
                    const y = rowIdx * 180 + 180
                    const x2 = (nodeIdx + 1.5) * (100 / row.nodes.length) - 2
                    return (
                      <line
                        key={`h-${rowIdx}-${nodeIdx}`}
                        x1={`${x1}%`}
                        y1={`${y}px`}
                        x2={`${x2}%`}
                        y2={`${y}px`}
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        opacity="0.4"
                        strokeLinecap="round"
                      />
                    )
                  }
                  return null
                })}

                {/* Vertical connections to next row */}
                {rowIdx < snakeArrangement.length - 1 && (
                  <line
                    key={`v-${rowIdx}`}
                    x1={row.isEvenRow ? `${(row.nodes.length - 0.5) * (100 / row.nodes.length)}%` : `${0.5 * (100 / row.nodes.length)}%`}
                    y1={`${rowIdx * 180 + 180}px`}
                    x2={row.isEvenRow ? `${(row.nodes.length - 0.5) * (100 / row.nodes.length)}%` : `${0.5 * (100 / row.nodes.length)}%`}
                    y2={`${(rowIdx + 1) * 180 + 180}px`}
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    opacity="0.4"
                    strokeLinecap="round"
                  />
                )}
              </g>
            ))}

            {/* Gradient for lines */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes Grid */}
          <div className="space-y-24 relative z-10">
            {snakeArrangement.map((row, rowIdx) => (
              <div
                key={`row-content-${rowIdx}`}
                className={`flex justify-center gap-16 ${
                  row.isEvenRow ? '' : 'flex-row-reverse'
                }`}
              >
                {row.nodes.map((node, localIdx) => {
                  const originalIdx = row.originalIndices[localIdx]
                  return (
                    <div
                      key={`node-${originalIdx}`}
                      onClick={() => completeModule(originalIdx)}
                      className="flex-shrink-0"
                    >
                      <RoadmapNode
                        node={node}
                        state={nodeStates[originalIdx]}
                        index={originalIdx}
                      />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20">
            <p className="text-gray-600 text-sm mb-2">Total Modules</p>
            <p className="text-3xl font-bold text-indigo-600">{modules.length}</p>
          </div>
          <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20">
            <p className="text-gray-600 text-sm mb-2">Completed</p>
            <p className="text-3xl font-bold text-green-600">{progress}</p>
          </div>
          <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20">
            <p className="text-gray-600 text-sm mb-2">Remaining</p>
            <p className="text-3xl font-bold text-purple-600">{modules.length - progress}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
