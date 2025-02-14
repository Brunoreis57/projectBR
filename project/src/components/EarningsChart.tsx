import React from 'react';

interface EarningsChartProps {
  data: number[];
}

export default function EarningsChart({ data }: EarningsChartProps) {
  const maxValue = Math.max(...data);
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="h-64 flex items-end gap-2">
      {data.map((value, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-blue-500 rounded-t-lg transition-all duration-300"
            style={{ height: `${(value / maxValue) * 100}%` }}
          />
          <span className="text-sm text-gray-600 mt-2">{days[index]}</span>
          <span className="text-xs text-gray-500">R${value}</span>
        </div>
      ))}
    </div>
  );
}