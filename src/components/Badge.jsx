export default function Badge({ label, variant = 'default' }) {
  const variants = {
    default: 'bg-slate-700/50 text-slate-300',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    error: 'bg-red-500/20 text-red-400',
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded ${variants[variant]}`}>
      {label}
    </span>
  );
}
