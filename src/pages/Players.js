"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/Players.tsx
var react_1 = require("react");
var usePlayerStats_1 = require("../hooks/usePlayerStats");
var Players = function () {
    var stats = (0, usePlayerStats_1.usePlayerStats)();
    var _a = (0, react_1.useState)('all'), filter = _a[0], setFilter = _a[1];
    var _b = (0, react_1.useState)('total'), sortKey = _b[0], setSortKey = _b[1];
    // 🔥 COMBINAR EN UN SOLO OBJETO (último registro de cada jugador)
    var combinedStats = stats.reduce(function (acc, curr) {
        acc[curr.name] = __assign({}, curr);
        return acc;
    }, {});
    // 🔥 FILTRAR POR TIPO
    var filtered = Object.values(combinedStats).filter(function (p) {
        if (filter === 'student')
            return p.type === 'estudiante';
        if (filter === 'teacher')
            return p.type === 'profesor';
        return true;
    });
    // 🔥 FUNCIÓN DE COMPARACIÓN DESCENDENTE
    var compareDesc = function (a, b) {
        var valA = sortKey === 'total'
            ? a.attack + a.blocks + a.service
            : a[sortKey];
        var valB = sortKey === 'total'
            ? b.attack + b.blocks + b.service
            : b[sortKey];
        return valB - valA;
    };
    // 🔥 ORDENAR
    var sorted = __spreadArray([], filtered, true).sort(compareDesc);
    // 🔥 FLECHITA SIMPLE
    var Arrow = function (_a) {
        var field = _a.field;
        return sortKey === field ? ' ↓' : '';
    };
    return (<div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Estadísticas de Jugadores
      </h2>

      {/* ▶️ FILTROS */}
      <div className="flex gap-4 justify-center mb-6">
        {['all', 'student', 'teacher'].map(function (f) { return (<button key={f} className={"px-4 py-2 rounded ".concat(filter === f ? 'bg-primary text-white' : 'bg-gray-200')} onClick={function () { return setFilter(f); }}>
            {f === 'all' ? 'Todos' : f === 'student' ? 'Estudiantes' : 'Profesores'}
          </button>); })}
      </div>

      {/* ▶️ TABLA */}
      <table className="table-auto w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Jugador</th>
            <th className="px-4 py-2">Equipo</th>
            <th className="px-4 py-2 cursor-pointer" onClick={function () { return setSortKey('attack'); }}>
              Ataques{Arrow({ field: 'attack' })}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={function () { return setSortKey('blocks'); }}>
              Bloqueos{Arrow({ field: 'blocks' })}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={function () { return setSortKey('service'); }}>
              Servicios{Arrow({ field: 'service' })}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={function () { return setSortKey('total'); }}>
              Total{Arrow({ field: 'total' })}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(function (player) {
            var total = player.attack + player.blocks + player.service;
            return (<tr key={player.name} className="border-t">
                <td className="px-4 py-2">{player.name}</td>
                <td className="px-4 py-2">{player.team}</td>
                <td className="px-4 py-2">{player.attack}</td>
                <td className="px-4 py-2">{player.blocks}</td>
                <td className="px-4 py-2">{player.service}</td>
                <td className="px-4 py-2 font-bold">{total}</td>
              </tr>);
        })}
        </tbody>
      </table>
    </div>);
};
exports.default = Players;
