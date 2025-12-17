export default function LogEntry({ log }) {
  const typeColors = {
    start: 'text-blue-400',
    task: 'text-cyan-400',
    complete: 'text-green-400',
  };

  const timestamp = log.timestamp.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className={`${typeColors[log.type]} text-xs`}>
      <span className="text-slate-500">[{timestamp}]</span>
      <span className="mx-2 opacity-50">—</span>
      <span className="opacity-75">{log.agent}:</span>
      <span className="ml-1">{log.message}</span>
    </div>
  );
}
