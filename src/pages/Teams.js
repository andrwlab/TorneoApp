"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Teams = function () {
    var teams = [
        { name: 'Equipo A', color: 'bg-blue-600', players: 9, logo: '🅰️' },
        { name: 'Equipo B', color: 'bg-black', players: 9, logo: '🅱️' },
        { name: 'Equipo C', color: 'bg-red-500', players: 9, logo: '🅾️' },
        { name: 'Equipo D', color: 'bg-orange-500', players: 9, logo: '🆎' },
    ];
    return (<div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {teams.map(function (team, index) { return (<div key={index} className={"rounded-xl text-white shadow-md ".concat(team.color, " p-4 flex flex-col items-center")}>
          <div className="text-5xl mb-2">{team.logo}</div>
          <h2 className="text-xl font-bold mb-1">{team.name}</h2>
          <p>{team.players} jugadores</p>
        </div>); })}
    </div>);
};
exports.default = Teams;
