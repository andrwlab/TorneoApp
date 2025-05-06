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
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/Leaderboard.tsx
var react_1 = require("react");
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../firebase");
var react_router_dom_1 = require("react-router-dom");
var Leaderboard = function () {
    var _a = (0, react_1.useState)([]), matches = _a[0], setMatches = _a[1];
    (0, react_1.useEffect)(function () {
        var unsub = (0, firestore_1.onSnapshot)((0, firestore_1.collection)(firebase_1.db, 'matches'), function (snap) {
            var data = snap.docs.map(function (d) { return (__assign({ id: d.id }, d.data())); });
            setMatches(data);
        });
        return function () { return unsub(); };
    }, []);
    // 1) Filtrar solo fase de grupos
    var groupMatches = matches.filter(function (m) { return m.phase === 'group'; });
    // 2) Calcular standings usando solo esos partidos
    var standingsMap = {};
    groupMatches.forEach(function (_a) {
        var teamA = _a.teamA, teamB = _a.teamB, scoreA = _a.scoreA, scoreB = _a.scoreB;
        if (!standingsMap[teamA])
            standingsMap[teamA] = { team: teamA, w: 0, l: 0, pf: 0, pc: 0 };
        if (!standingsMap[teamB])
            standingsMap[teamB] = { team: teamB, w: 0, l: 0, pf: 0, pc: 0 };
        // Acumular puntos a favor/en contra
        standingsMap[teamA].pf += scoreA;
        standingsMap[teamA].pc += scoreB;
        standingsMap[teamB].pf += scoreB;
        standingsMap[teamB].pc += scoreA;
        // Asignar victoria/derrota
        if (scoreA > scoreB) {
            standingsMap[teamA].w++;
            standingsMap[teamB].l++; // <–– aquí incrementas derrotas a B
        }
        else if (scoreB > scoreA) {
            standingsMap[teamB].w++;
            standingsMap[teamA].l++; // <–– y aquí derrotas a A
        }
    });
    // 3) Pasar a array y ordenar: G desc, diff desc, PF desc
    var standings = Object.values(standingsMap).sort(function (a, b) {
        if (b.w !== a.w)
            return b.w - a.w;
        var diffA = a.pf - a.pc;
        var diffB = b.pf - b.pc;
        if (diffB !== diffA)
            return diffB - diffA;
        return b.pf - a.pf;
    });
    // 4) Fase eliminatoria
    var semiFinals = matches
        .filter(function (m) { return m.phase === 'semifinal'; })
        .sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime(); });
    var thirdPlace = matches
        .filter(function (m) { return m.phase === 'third'; })
        .sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime(); });
    var finalMatch = matches
        .filter(function (m) { return m.phase === 'final'; })
        .sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime(); });
    return (<div className="p-6 max-w-5xl mx-auto space-y-10">

      {/* Tabla de Posiciones */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Tabla de Posiciones</h2>
        <table className="table-auto w-full border text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Equipo</th>
              <th className="px-3 py-2">G</th>
              <th className="px-3 py-2">P</th>
              <th className="px-3 py-2">PF</th>
              <th className="px-3 py-2">PC</th>
              <th className="px-3 py-2">+/-</th>
            </tr>
          </thead>
          <tbody>
            {standings.map(function (s, i) { return (<tr key={s.team} className="border-t">
                <td className="px-3 py-2">{i + 1}</td>
                <td className="px-3 py-2">{s.team}</td>
                <td className="px-3 py-2">{s.w}</td>
                <td className="px-3 py-2">{s.l}</td>
                <td className="px-3 py-2">{s.pf}</td>
                <td className="px-3 py-2">{s.pc}</td>
                <td className="px-3 py-2">{s.pf - s.pc}</td>
              </tr>); })}
          </tbody>
        </table>
      </section>

      {/* Fase Eliminatoria */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Fase Eliminatoria</h2>

        <div className="space-y-6">

          {/* Semifinales */}
          <div>
            <h3 className="font-semibold mb-2">Semifinales</h3>
            <ul className="space-y-2">
              {semiFinals.map(function (m) {
            var d = new Date(m.date);
            return (<li key={m.id} className="border p-3 rounded-md flex justify-between">
                    <span>{m.teamA} vs {m.teamB}</span>
                    <span className="text-sm text-gray-500">
                      {d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} •{' '}
                      {d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </li>);
        })}
            </ul>
          </div>

          {/* Tercer Puesto */}
          <div>
            <h3 className="font-semibold mb-2">Tercer Puesto</h3>
            {thirdPlace.map(function (m) {
            var d = new Date(m.date);
            return (<div key={m.id} className="border p-3 rounded-md flex justify-between">
                  <span>Perdedor SF1 vs Perdedor SF2</span>
                  <span className="text-sm text-gray-500">
                    {d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} •{' '}
                    {d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>);
        })}
          </div>

          {/* Final */}
          <div>
            <h3 className="font-semibold mb-2">Final</h3>
            {finalMatch.map(function (m) {
            var d = new Date(m.date);
            return (<div key={m.id} className="border p-3 rounded-md flex justify-between">
                  <span>Ganador SF1 vs Ganador SF2</span>
                  <span className="text-sm text-gray-500">
                    {d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} •{' '}
                    {d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>);
        })}
          </div>

        </div>
      </section>

      {/* Enlace al calendario */}
      <div className="text-center">
        <react_router_dom_1.Link to="/schedule" className="text-primary underline">
          Ver calendario completo
        </react_router_dom_1.Link>
      </div>
    </div>);
};
exports.default = Leaderboard;
