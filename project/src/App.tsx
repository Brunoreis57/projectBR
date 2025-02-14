import React from 'react';
import { Car, DollarSign, Calendar, TrendingUp, PieChart, Target } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;