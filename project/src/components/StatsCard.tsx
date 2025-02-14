import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

export default function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  const isPositive = trend.startsWith('+');

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
        <span className="text-sm text-gray-500 ml-2">vs. última semana</span>
      </div>
    </div>
  );
}