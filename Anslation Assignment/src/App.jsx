import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import FilterButtons from './components/FilterButtons';
import TodoStats from './components/TodoStats';
import EmptyState from './components/EmptyState';

function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    stats,
  } = useTodos();

  return (
    <div className="h-screen flex flex-col p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-2xl mx-auto w-full flex flex-col h-full relative z-10">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">✨</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <p className="text-slate-600 font-medium">Modern task management made simple</p>
        </header>

        {/* Main Content */}
        <main className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 flex-1 flex flex-col min-h-0">
          {/* Add Todo Input */}
          <TodoInput onAddTodo={addTodo} />

          {/* Filter Buttons */}
          <FilterButtons filter={filter} onFilterChange={setFilter} />

          {/* Todo List - Scrollable */}
          <div className="flex-1 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {todos.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              <div className="space-y-3">
                {todos.map((todo, index) => (
                  <div
                    key={todo.id}
                    className="animate-slideIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TodoItem
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Statistics - Fixed at bottom */}
          <TodoStats stats={stats} onClearCompleted={clearCompleted} />
        </main>
      </div>
    </div>
  );
}

export default App;