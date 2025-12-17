import { useState } from 'react';
import Button from '../components/Button';
import Badge from '../components/Badge';

export default function ResultsPage({ onNavigate, results }) {
  const [filter, setFilter] = useState('all');
  const [reviewDecisions, setReviewDecisions] = useState({});

  if (!results) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">No validation results available</p>
          <Button onClick={() => onNavigate('dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const filtered = results.filter(p => {
    if (filter === 'approved') return p.action === 'approved';
    if (filter === 'review') return p.action === 'review';
    return true;
  });

  const stats = {
    total: results.length,
    approved: results.filter(p => p.action === 'approved').length,
    review: results.filter(p => p.action === 'review').length,
  };

  const handleReviewDecision = (providerId, decision) => {
    setReviewDecisions({
      ...reviewDecisions,
      [providerId]: decision,
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-slate-400 hover:text-slate-300 text-sm mb-4 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Validation Results</h1>
          <p className="text-slate-400">Review and approve provider records</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">Total Processed</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-400 text-sm mb-1">Auto-Approved</p>
            <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-400 text-sm mb-1">Needs Review</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.review}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          {['all', 'approved', 'review'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-300'
              }`}
            >
              {f === 'all' ? 'All' : f === 'approved' ? 'Approved' : 'Review'}
            </button>
          ))}
        </div>

        {/* Results Table */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/50">
                  <th className="text-left py-4 px-6 text-slate-300 font-medium">Provider Name</th>
                  <th className="text-left py-4 px-6 text-slate-300 font-medium">Phone</th>
                  <th className="text-left py-4 px-6 text-slate-300 font-medium">Address</th>
                  <th className="text-left py-4 px-6 text-slate-300 font-medium">License</th>
                  <th className="text-center py-4 px-6 text-slate-300 font-medium">Confidence</th>
                  <th className="text-center py-4 px-6 text-slate-300 font-medium">Status</th>
                  <th className="text-center py-4 px-6 text-slate-300 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((provider, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-slate-700/20 hover:bg-slate-700/20 transition ${
                      reviewDecisions[provider.name] ? 'bg-slate-700/10' : ''
                    }`}
                  >
                    <td className="py-4 px-6 text-slate-300 font-medium">{provider.name}</td>
                    <td className="py-4 px-6">
                      <Badge
                        label={provider.phoneValid ? 'Valid' : 'Invalid'}
                        variant={provider.phoneValid ? 'success' : 'warning'}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        label={provider.addressValid ? 'Valid' : 'Invalid'}
                        variant={provider.addressValid ? 'success' : 'warning'}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        label={provider.licenseValid ? 'Valid' : 'Expired'}
                        variant={provider.licenseValid ? 'success' : 'error'}
                      />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`font-bold ${
                        provider.confidence >= 85 ? 'text-green-400' :
                        provider.confidence >= 70 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {provider.confidence}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {reviewDecisions[provider.name] && (
                        <Badge
                          label={reviewDecisions[provider.name] === 'approved' ? 'Approved' : 'Rejected'}
                          variant={reviewDecisions[provider.name] === 'approved' ? 'success' : 'error'}
                        />
                      )}
                      {!reviewDecisions[provider.name] && (
                        <Badge
                          label={provider.action === 'approved' ? 'Auto-Approved' : 'Pending'}
                          variant={provider.action === 'approved' ? 'success' : 'warning'}
                        />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {provider.action === 'review' && !reviewDecisions[provider.name] && (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleReviewDecision(provider.name, 'approved')}
                            className="px-3 py-1 text-xs rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReviewDecision(provider.name, 'rejected')}
                            className="px-3 py-1 text-xs rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {(provider.action === 'approved' || reviewDecisions[provider.name]) && (
                        <span className="text-slate-500 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              No providers found for this filter
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4 justify-between">
          <Button variant="secondary" onClick={() => onNavigate('dashboard')}>
            Return to Dashboard
          </Button>
          <div className="flex gap-4">
            <Button variant="secondary">
              Export Results
            </Button>
            <Button>
              Publish to Directory
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
