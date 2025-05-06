// src/pages/Players.tsx
import React, { useState } from 'react';
import { usePlayerStats } from '../hooks/usePlayerStats';

type Player = {
  name: string;
  team: string;
  attack: number;
  blocks: number;
  service: number;
  type: string;
};

const Players = () => {
  const stats = usePlayerStats() as Player[];
  const [filter, setFilter] = useState<'all' | 'student' | 'teacher'>('all');
  const [sortKey, setSortKey] = useState<'total' | 'attack' | 'blocks' | 'service'>('total');

  // 🔥 COMBINAR EN UN SOLO OBJETO (último registro de cada jugador)
  const combinedStats = stats.reduce((acc, curr) => {
    acc[curr.name] = { ...curr };
    return acc;
  }, {} as Record<string, Player>);

  // 🔥 FILTRAR POR TIPO
  const filtered = Object.values(combinedStats).filter(p => {
    if (filter === 'student') return p.type === 'estudiante';
    if (filter === 'teacher') return p.type === 'profesor';
    return true;
  });

  // 🔥 FUNCIÓN DE COMPARACIÓN DESCENDENTE
  const compareDesc = (a: Player, b: Player) => {
    const valA = sortKey === 'total'
      ? a.attack + a.blocks + a.service
      : a[sortKey];
    const valB = sortKey === 'total'
      ? b.attack + b.blocks + b.service
      : b[sortKey];
    return valB - valA;
  };

  // 🔥 ORDENAR
  const sorted = [...filtered].sort(compareDesc);

  // 🔥 FLECHITA SIMPLE
  const Arrow = ({ field }: { field: typeof sortKey }) =>
    sortKey === field ? ' ↓' : '';

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Estadísticas de Jugadores
      </h2>

      {/* ▶️ FILTROS */}
      <div className="flex gap-4 justify-center mb-6">
        {(['all','student','teacher'] as const).map(f => (
          <button
            key={f}
            className={`px-4 py-2 rounded ${
              filter === f ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Todos' : f === 'student' ? 'Estudiantes' : 'Profesores'}
          </button>
        ))}
      </div>

      {/* ▶️ TABLA */}
      <table className="table-auto w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Jugador</th>
            <th className="px-4 py-2">Equipo</th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => setSortKey('attack')}
            >
              Ataques{Arrow({ field: 'attack' })}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => setSortKey('blocks')}
            >
              Bloqueos{Arrow({ field: 'blocks' })}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => setSortKey('service')}
            >
              Servicios{Arrow({ field: 'service' })}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => setSortKey('total')}
            >
              Total{Arrow({ field: 'total' })}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(player => {
            const total = player.attack + player.blocks + player.service;
            return (
              <tr key={player.name} className="border-t">
                <td className="px-4 py-2">{player.name}</td>
                <td className="px-4 py-2">{player.team}</td>
                <td className="px-4 py-2">{player.attack}</td>
                <td className="px-4 py-2">{player.blocks}</td>
                <td className="px-4 py-2">{player.service}</td>
                <td className="px-4 py-2 font-bold">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Players;
