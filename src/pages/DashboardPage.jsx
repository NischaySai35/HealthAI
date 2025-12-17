import Button from '../components/Button';
import StatCard from '../components/StatCard';

export default function DashboardPage({ onNavigate, validationResults }) {
  // Fake metrics - in real app, these come from backend
  const stats = {
    totalProviders: 2847,
    validated: validationResults ? validationResults.length : 0,
    flagged: validationResults ? validationResults.filter(p => p.action === 'review').length : 0,
    accuracy: validationResults ? Math.round((validationResults.filter(p => p.action === 'approved').length / validationResults.length) * 100) : 0,
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Provider Directory Dashboard</h1>
          <p className="text-slate-400">Real-time AI-powered validation and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            label="Total Providers"
            value={stats.totalProviders.toLocaleString()}
            icon="users"
            trend="+2.5%"
          />
          <StatCard
            label="Validated"
            value={stats.validated.toLocaleString()}
            icon="check"
            trend="This session"
          />
          <StatCard
            label="Flagged for Review"
            value={stats.flagged.toLocaleString()}
            icon="alert"
            trend={validationResults ? `${Math.round((stats.flagged / stats.validated) * 100)}%` : '-'}
          />
          <StatCard
            label="Overall Accuracy"
            value={`${stats.accuracy}%`}
            icon="chart"
            trend="Auto-approved"
          />
        </div>

        {/* Primary CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Start Validation</h2>
              <p className="text-slate-400 mb-6">Upload provider data and trigger the AI validation pipeline</p>
              <Button onClick={() => onNavigate('upload')} size="lg">
                Upload & Validate Providers
              </Button>
            </div>
            <svg className="w-24 h-24 text-blue-500/20 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        </div>

        {/* Recent Activity */}
        {validationResults && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-white mb-6">Last Validation Results</h3>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
              <p className="text-slate-400 text-sm">
                Processed {validationResults.length} providers | {stats.flagged} require human review
              </p>
              <Button variant="secondary" onClick={() => onNavigate('results')} className="mt-4">
                View Full Results
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
