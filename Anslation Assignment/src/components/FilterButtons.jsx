const FilterButtons = ({ filter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', icon: '📋', color: 'from-slate-500 to-slate-600' },
    { key: 'active', label: 'Active', icon: '⚡', color: 'from-blue-500 to-purple-600' },
    { key: 'completed', label: 'Done', icon: '✅', color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <div className="flex gap-3 mb-6 p-1 bg-slate-100/50 rounded-2xl backdrop-blur-sm">
      {filters.map(({ key, label, icon, color }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
            filter === key
              ? `bg-gradient-to-r ${color} text-white shadow-lg`
              : 'text-slate-600 hover:bg-white/80 hover:text-slate-800'
          }`}
        >
          <span className="text-sm">{icon}</span>
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;