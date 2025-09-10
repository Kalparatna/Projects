const TodoStats = ({ stats, onClearCompleted }) => {
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="bg-slate-50/80 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">Progress</span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {completionPercentage}%
            </span>
          </div>
          
          <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-xs text-slate-600 mt-2 text-center">
            {stats.completed} of {stats.total} tasks completed
          </p>
        </div>
      )}

      {/* Statistics */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            <span className="text-slate-600 font-medium">Total: {stats.total}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-slate-600 font-medium">Active: {stats.active}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-slate-600 font-medium">Done: {stats.completed}</span>
          </div>
        </div>
        
        {stats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Clear Done
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoStats;