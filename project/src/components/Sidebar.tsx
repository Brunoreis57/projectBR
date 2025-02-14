import React from 'react';
import { Car, DollarSign, Calendar, TrendingUp, PieChart, Target } from 'lucide-react';

const menuItems = [
  { icon: DollarSign, label: 'Ganhos' },
  { icon: Calendar, label: 'Histórico' },
  { icon: TrendingUp, label: 'Análises' },
  { icon: PieChart, label: 'Relatórios' },
  { icon: Target, label: 'Metas' },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-6">
      <div className="flex items-center gap-3 mb-8">
        <Car className="w-8 h-8" />
        <h1 className="text-xl font-bold">UberTracker</h1>
      </div>
      <nav>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-3 w-full p-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}