import { useState } from 'react';
import Button from '../components/Button';
import { generateSampleProviders } from '../utils/Backend';

export default function UploadPage({ onNavigate }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUseSampleData = () => {
    const sampleProviders = generateSampleProviders(50);
    setPreview(sampleProviders);
  };

  const handleStartValidation = () => {
    if (preview) {
      setLoading(true);
      setTimeout(() => {
        onNavigate('progress', { providers: preview });
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold text-white mb-2">Upload Provider Data</h1>
          <p className="text-slate-400">Select data source and initiate AI validation pipeline</p>
        </div>

        {/* Upload Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* CSV Upload */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 hover:border-slate-600/50 transition cursor-pointer">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20 mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Upload CSV</h3>
            <p className="text-slate-400 text-sm mb-4">Import provider data from CSV file</p>
            <input type="file" accept=".csv" className="hidden" id="csv-upload" />
            <label htmlFor="csv-upload" className="text-blue-400 text-sm hover:text-blue-300 cursor-pointer">
              Select File
            </label>
          </div>

          {/* Sample Data */}
          <div
            onClick={handleUseSampleData}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 hover:border-cyan-500/50 transition cursor-pointer"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-500/20 mb-4">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Use Sample Data</h3>
            <p className="text-slate-400 text-sm mb-4">Demo with 50 realistic provider records</p>
            <span className="text-cyan-400 text-sm font-medium">Start Demo</span>
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Data Preview</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Provider Name</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Phone</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Address</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">License #</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(0, 5).map((p, i) => (
                    <tr key={i} className="border-b border-slate-700/20 hover:bg-slate-700/20">
                      <td className="py-3 px-4 text-slate-300">{p.name}</td>
                      <td className="py-3 px-4 text-slate-400">{p.phone}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs">{p.address.substring(0, 30)}...</td>
                      <td className="py-3 px-4 text-slate-400">{p.license}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              Showing 5 of {preview.length} providers
            </p>
          </div>
        )}

        {/* Action */}
        {preview && (
          <div className="flex gap-4">
            <Button
              onClick={handleStartValidation}
              disabled={loading}
              size="lg"
              className="flex-1"
            >
              {loading ? 'Preparing validation...' : 'Start AI Validation'}
            </Button>
            <Button
              onClick={() => setPreview(null)}
              variant="secondary"
              size="lg"
            >
              Clear
            </Button>
          </div>
        )}

        {!preview && (
          <p className="text-slate-400 text-center py-8">
            Select a data source to begin
          </p>
        )}
      </div>
    </div>
  );
}
