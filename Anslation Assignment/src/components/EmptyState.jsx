const EmptyState = ({ filter }) => {
  const emptyMessages = {
    all: {
      icon: '🚀',
      title: 'Ready to be productive?',
      message: 'Add your first task and start achieving your goals!',
      gradient: 'from-blue-600 to-purple-600'
    },
    active: {
      icon: '🎉',
      title: 'All caught up!',
      message: 'Amazing work! You\'ve completed all your tasks.',
      gradient: 'from-green-600 to-emerald-600'
    },
    completed: {
      icon: '📋',
      title: 'No completed tasks yet',
      message: 'Complete some tasks to see your achievements here.',
      gradient: 'from-slate-600 to-slate-700'
    }
  };

  const { icon, title, message, gradient } = emptyMessages[filter];

  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl mb-6 shadow-lg">
        <span className="text-3xl">{icon}</span>
      </div>
      
      <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {title}
      </h3>
      
      <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
        {message}
      </p>

      {filter === 'all' && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['💻 Code review', '📚 Read book', '🏃‍♂️ Exercise', '🍳 Cook dinner'].map((suggestion, index) => (
            <div 
              key={index}
              className="px-3 py-1.5 bg-white/60 rounded-lg text-sm text-slate-600 border border-white/50"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmptyState;