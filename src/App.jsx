import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import ValidationProgressPage from './pages/ValidationProgressPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [validationResults, setValidationResults] = useState(null);
  const [providers, setProviders] = useState([]);

  const handleNavigate = (page, data = null) => {
    if (data) {
      if (data.providers) setProviders(data.providers);
      if (data.results) setValidationResults(data.results);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} validationResults={validationResults} />;
      case 'upload':
        return <UploadPage onNavigate={handleNavigate} />;
      case 'progress':
        return <ValidationProgressPage onNavigate={handleNavigate} providers={providers} setResults={setValidationResults} />;
      case 'results':
        return <ResultsPage onNavigate={handleNavigate} results={validationResults} />;
      default:
        return <LoginPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {renderPage()}
    </div>
  );
}
