import React, { useState } from 'react';

interface EarningsFormProps {
  onSubmit: (data: any) => void;
}

export default function EarningsForm({ onSubmit }: EarningsFormProps) {
  const [formData, setFormData] = useState({
    dailyEarnings: '',
    kmDriven: '',
    fuelPrice: '',
    kmPerLiter: '',
    tripsCount: '',
    hoursOnline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const kmDriven = parseFloat(formData.kmDriven);
    const kmPerLiter = parseFloat(formData.kmPerLiter);
    const fuelPrice = parseFloat(formData.fuelPrice);
    const dailyEarnings = parseFloat(formData.dailyEarnings);
    const tripsCount = parseInt(formData.tripsCount);
    const hoursOnline = parseFloat(formData.hoursOnline);
    
    // Calculate liters used based on km driven and km per liter
    const litersUsed = kmDriven / kmPerLiter;
    // Calculate total fuel cost
    const fuelCost = litersUsed * fuelPrice;
    // Calculate net earnings (gross earnings - fuel cost)
    const netEarnings = dailyEarnings - fuelCost;

    const data = {
      dailyEarnings,
      kmDriven,
      fuelPrice,
      fuelCost,
      netEarnings,
      kmPerLiter,
      tripsCount,
      hoursOnline
    };

    onSubmit(data);
    setFormData({
      dailyEarnings: '',
      kmDriven: '',
      fuelPrice: '',
      kmPerLiter: '',
      tripsCount: '',
      hoursOnline: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Ganhos do Dia</label>
        <input
          type="number"
          name="dailyEarnings"
          value={formData.dailyEarnings}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="R$ 0.00"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Número de Viagens</label>
        <input
          type="number"
          name="tripsCount"
          value={formData.tripsCount}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="0"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Horas Online</label>
        <input
          type="number"
          name="hoursOnline"
          value={formData.hoursOnline}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="0"
          step="0.5"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Quilômetros Rodados</label>
        <input
          type="number"
          name="kmDriven"
          value={formData.kmDriven}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="0 km"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Preço do Combustível</label>
        <input
          type="number"
          name="fuelPrice"
          value={formData.fuelPrice}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="R$ 0.00/L"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Média KM por Litro</label>
        <input
          type="number"
          name="kmPerLiter"
          value={formData.kmPerLiter}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="0 km/L"
          step="0.1"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Salvar
      </button>
    </form>
  );
}