import { useState, useEffect } from 'react';
import ProgressStep from '../components/ProgressStep';
import LogEntry from '../components/LogEntry';
import Button from '../components/Button';
import { validateProviders } from '../utils/fakeBackend';

const AGENTS = [
  {
    id: 'data-validation',
    name: 'Data Validation Agent',
    description: 'Verifying data format and completeness',
    tasks: [
      'Parsing provider records',
      'Validating required fields',
      'Detecting duplicates',
      'Format normalization',
    ],
  },
  {
    id: 'enrichment',
    name: 'Information Enrichment Agent',
    description: 'Cross-referencing external databases',
    tasks: [
      'Fetching NPI registry data',
      'Checking state medical boards',
      'Verifying licensure status',
      'Retrieving geocoded addresses',
    ],
  },
  {
    id: 'qa',
    name: 'Quality Assurance Agent',
    description: 'Performing comprehensive validation checks',
    tasks: [
      'Phone number validation (E.164)',
      'Address geocoding verification',
      'License expiry checking',
      'Specialty cross-validation',
    ],
  },
  {
    id: 'directory',
    name: 'Directory Management Agent',
    description: 'Finalizing and scoring provider records',
    tasks: [
      'Calculating confidence scores',
      'Determining action flags',
      'Generating recommendation',
      'Preparing for directory update',
    ],
  },
];

export default function ValidationProgressPage({ onNavigate, providers, setResults }) {
  const [activeAgent, setActiveAgent] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setLocalResults] = useState(null);

  useEffect(() => {
    if (!providers || providers.length === 0) return;

    const runValidation = async () => {
      let allLogs = [];

      // Simulate each agent running sequentially
      for (let i = 0; i < AGENTS.length; i++) {
        setActiveAgent(i);
        const agent = AGENTS[i];

        // Log agent start
        allLogs = [...allLogs, {
          id: Date.now() + Math.random(),
          timestamp: new Date(),
          agent: agent.name,
          message: `${agent.name} started`,
          type: 'start',
        }];
        setLogs([...allLogs]);

        // Simulate tasks
        for (const task of agent.tasks) {
          await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));

          allLogs = [...allLogs, {
            id: Date.now() + Math.random(),
            timestamp: new Date(),
            agent: agent.name,
            message: task,
            type: 'task',
          }];
          setLogs([...allLogs]);
        }

        // Log agent completion
        await new Promise(resolve => setTimeout(resolve, 600));
        allLogs = [...allLogs, {
          id: Date.now() + Math.random(),
          timestamp: new Date(),
          agent: agent.name,
          message: `${agent.name} completed successfully`,
          type: 'complete',
        }];
        setLogs([...allLogs]);
      }

      // Run validation on all providers
      const validationResults = validateProviders(providers);
      setLocalResults(validationResults);
      setResults(validationResults);

      // Final log
      allLogs = [...allLogs, {
        id: Date.now(),
        timestamp: new Date(),
        agent: 'System',
        message: `Validation complete. ${validationResults.filter(p => p.action === 'approved').length} auto-approved, ${validationResults.filter(p => p.action === 'review').length} flagged for review`,
        type: 'complete',
      }];
      setLogs([...allLogs]);

      setIsComplete(true);
    };

    runValidation();
  }, [providers, setResults]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Validation Pipeline</h1>
          <p className="text-slate-400">
            {isComplete
              ? 'Validation pipeline completed'
              : `Processing ${providers?.length || 0} providers...`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Steps */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {AGENTS.map((agent, idx) => (
                <ProgressStep
                  key={agent.id}
                  label={agent.name}
                  status={
                    idx < activeAgent ? 'complete' :
                    idx === activeAgent ? 'active' :
                    'pending'
                  }
                  description={agent.description}
                />
              ))}
            </div>
          </div>

          {/* Logs Console */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Agent Logs</h3>
                <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                  {logs.length} events
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 font-mono text-sm">
                {logs.map(log => (
                  <LogEntry key={log.id} log={log} />
                ))}
                {logs.length === 0 && (
                  <div className="text-slate-500 text-center py-8">
                    Initializing agents...
                  </div>
                )}
              </div>

              {/* Scrolling indicator */}
              {logs.length > 10 && (
                <div className="mt-4 text-center text-xs text-slate-500">
                  ↓ Showing latest events
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Completion Actions */}
        {isComplete && (
          <div className="mt-8 flex gap-4 justify-end">
            <Button
              variant="secondary"
              onClick={() => onNavigate('dashboard')}
            >
              Return to Dashboard
            </Button>
            <Button
              onClick={() => onNavigate('results')}
            >
              View Results
            </Button>
          </div>
        )}

        {/* Progress Summary */}
        {isComplete && results && (
          <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-green-400 mb-2">Validation Complete</h3>
                <p className="text-slate-300 text-sm">
                  Successfully processed {results.length} providers:
                  <span className="text-green-400 font-medium ml-1">
                    {results.filter(p => p.action === 'approved').length} auto-approved
                  </span>
                  {' '} |{' '}
                  <span className="text-yellow-400 font-medium">
                    {results.filter(p => p.action === 'review').length} need review
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
