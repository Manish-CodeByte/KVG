export default function InsightCard({ insights }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="text-2xl">✨</span> Smart Insights
      </h3>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-md transition"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0 mt-1">{insight.icon}</span>
              <div>
                <p className="text-gray-900 font-medium mb-1">{insight.title}</p>
                <p className="text-gray-600 text-sm">{insight.description}</p>
                {insight.metric && (
                  <div className="mt-2 text-xs font-semibold text-blue-600 bg-blue-100/50 inline-block px-2 py-1 rounded">
                    {insight.metric}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
