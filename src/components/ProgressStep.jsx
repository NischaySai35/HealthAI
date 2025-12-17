const STATUS_ICONS = {
  complete: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  active: (
    <div className="animate-spin">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </div>
  ),
  pending: (
    <div className="w-5 h-5 rounded-full border-2 border-slate-600 border-t-slate-400" />
  ),
};

export default function ProgressStep({ label, status, description }) {
  const statusColor = {
    complete: 'bg-green-500/20 border-green-500/30 text-green-400',
    active: 'bg-blue-500/20 border-blue-500/30 text-blue-400 animate-pulse',
    pending: 'bg-slate-700/20 border-slate-600/30 text-slate-500',
  };

  return (
    <div className={`border rounded-lg p-4 transition ${statusColor[status]}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {STATUS_ICONS[status]}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm">{label}</h4>
          {description && (
            <p className="text-xs opacity-75 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
