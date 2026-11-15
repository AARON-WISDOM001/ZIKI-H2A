import React from 'react';
import { LocalAgentDashboard } from './components/localAgent/LocalAgentDashboard';

export function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-4">
      <LocalAgentDashboard />
    </div>
  );
}

export default App;
