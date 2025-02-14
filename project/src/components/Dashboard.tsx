import React, { useState, useEffect } from 'react';
import { DollarSign, Droplets, Car, Navigation, Clock } from 'lucide-react';
import EarningsChart from './EarningsChart';
import EarningsForm from './EarningsForm';
import StatsCard from './StatsCard';

interface DailyEntry {
  date: string;
  dailyEarnings: number;
  kmDriven: number;
  fuelPrice: number;
  fuelCost: number;
  netEarnings: number;
  kmPerLiter: number;
  tripsCount: number;
  hoursOnline: number;
}

export default function Dashboard() {
  const [entries, setEntries] = useState<DailyEntry[]>(() => {
    const saved = localStorage.getItem('uberTrackerEntries');
    return saved ? JSON.parse(saved) : [];
  });

  const [earnings, setEarnings] = useState<number[]>(() => {
    return entries.slice(-7).map(entry => entry.dailyEarnings) || [150, 180, 210, 160, 190, 220, 200];
  });

  const [stats, setStats] = useState({
    dailyEarnings: 0,
    fuelCost: 0,
    kmDriven: 0,
    netEarnings: 0,
    tripsCount: 0,
    hoursOnline: 0,
  });

  useEffect(() => {
    localStorage.setItem('uberTrackerEntries', JSON.stringify(entries));
  }, [entries]);

  const handleNewEntry = (data: any) => {
    const newEntry: DailyEntry = {
      date: new Date().toISOString(),
      ...data
    };

    setEntries(prevEntries => [...prevEntries, newEntry]);
    setStats(data);
    setEarnings(prev => [...prev.slice(1), data.dailyEarnings]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        <StatsCard
          title="Ganhos Brutos"
          value={`R$ ${stats.dailyEarnings.toFixed(2)}`}
          icon={DollarSign}
          trend="+12.5%"
        />
        <StatsCard
          title="Gasto Combustível"
          value={`R$ ${stats.fuelCost.toFixed(2)}`}
          icon={Droplets}
          trend="-2.3%"
        />
        <StatsCard
          title="Quilômetros Rodados"
          value={`${stats.kmDriven} km`}
          icon={Car}
          trend="+5.2%"
        />
        <StatsCard
          title="Ganho Líquido"
          value={`R$ ${stats.netEarnings.toFixed(2)}`}
          icon={DollarSign}
          trend="+8.7%"
        />
        <StatsCard
          title="Viagens"
          value={stats.tripsCount.toString()}
          icon={Navigation}
          trend="+3.2%"
        />
        <StatsCard
          title="Horas Online"
          value={`${stats.hoursOnline}h`}
          icon={Clock}
          trend="+4.1%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Ganhos dos Últimos 7 Dias</h3>
          <EarningsChart data={earnings} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Nova Entrada</h3>
          <EarningsForm onSubmit={handleNewEntry} />
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Histórico de Entradas</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ganhos Brutos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ganhos Líquidos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KM Rodados</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Viagens</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horas Online</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gasto Combustível</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.slice().reverse().map((entry, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {entry.dailyEarnings.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {entry.netEarnings.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.kmDriven} km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.tripsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.hoursOnline}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {entry.fuelCost.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}