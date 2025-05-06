"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("react");
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../firebase");
var react_router_dom_1 = require("react-router-dom");
var data_1 = require("../data");
var usePlayers_1 = require("../hooks/usePlayers");
var upcomingMatches = data_1.schedule
    .filter(function (item) { return new Date(item.date) > new Date(); }) // solo futuros
    .sort(function (a, b) { return new Date(a.date) - new Date(b.date); })
    .slice(0, 2);
var Home = function () {
    var players = (0, usePlayers_1.usePlayers)();
    var _a = (0, react_2.useState)([]), games = _a[0], setGames = _a[1];
    var _b = (0, react_2.useState)([]), standings = _b[0], setStandings = _b[1];
    (0, react_2.useEffect)(function () {
        var unsubscribe = (0, firestore_1.onSnapshot)((0, firestore_1.collection)(firebase_1.db, 'matches'), function (snapshot) {
            var matchData = snapshot.docs.map(function (doc) { return doc.data(); });
            setGames(matchData);
        });
        return function () { return unsubscribe(); };
    }, []);
    (0, react_2.useEffect)(function () {
        var results = {};
        games.forEach(function (_a) {
            var teamA = _a.teamA, teamB = _a.teamB, scoreA = _a.scoreA, scoreB = _a.scoreB;
            if (!results[teamA])
                results[teamA] = { team: teamA, w: 0, l: 0 };
            if (!results[teamB])
                results[teamB] = { team: teamB, w: 0, l: 0 };
            if (scoreA > scoreB) {
                results[teamA].w++;
                results[teamB].l++;
            }
            else if (scoreB > scoreA) {
                results[teamB].w++;
                results[teamA].l++;
            }
        });
        setStandings(Object.values(results).sort(function (a, b) { return b.w - a.w; }));
    }, [games]);
    { /*
   
   
   */
    }
    var statsByTeam = players.length > 0
        ? players.reduce(function (acc, player) {
            var team = player.team;
            if (!acc[team]) {
                acc[team] = { attack: 0, blocks: 0, service: 0 };
            }
            acc[team].attack += player.attack || 0;
            acc[team].blocks += player.blocks || 0;
            acc[team].service += player.service || 0;
            return acc;
        }, {})
        : {};
    var bestAttackTeam = Object.entries(statsByTeam).length > 0
        ? Object.entries(statsByTeam).reduce(function (a, b) { return b[1].attack > a[1].attack ? b : a; })
        : ["", { attack: 0 }];
    var bestBlockTeam = Object.entries(statsByTeam).length > 0
        ? Object.entries(statsByTeam).reduce(function (a, b) { return b[1].blocks > a[1].blocks ? b : a; })
        : ["", { blocks: 0 }];
    var bestServiceTeam = Object.entries(statsByTeam).length > 0
        ? Object.entries(statsByTeam).reduce(function (a, b) { return b[1].service > a[1].service ? b : a; })
        : ["", { service: 0 }];
    var _c = (0, react_2.useState)(null), teamSortKey = _c[0], setTeamSortKey = _c[1];
    return (<div className="p-6 space-y-10">
      {/* Bloque 1: título de bienvenida */}
        <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-2">
            ¡Bienvenido al Torneo!
        </h1>
        <p className="text-lg text-gray-600">
            Sigue las estadísticas, el calendario y el avance en tiempo real.
        </p>
        </section>
         {/* 🔽 Bloque 2: Calendario */}
         <section>
        <react_router_dom_1.Link to="/schedule">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 hover:underline hover:text-primary transition-colors">
            Próximos Partidos
            </h2>
        </react_router_dom_1.Link>
        {upcomingMatches.length === 0 ? (<p className="text-gray-500 text-sm">No hay partidos programados.</p>) : (<ul className="space-y-2 text-sm text-gray-800">
                {upcomingMatches.map(function (match, idx) {
                var dateObj = new Date(match.date);
                var dateStr = dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
                var timeStr = dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                return (<li key={idx} className="border p-3 rounded-md shadow-sm bg-white flex justify-between items-center">
                    <div>
                        <div className="font-medium">{match.match}</div>
                        <div className="text-xs text-gray-500">{dateStr} • {timeStr}</div>
                    </div>
                    <div className="text-xs text-gray-400 italic">{match.format}</div>
                    </li>);
            })}
            </ul>)}

        </section>
        {/* 🔽 Bloque 3: tarjetas de equipos */}
        <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Equipos Participantes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data_1.teams.map(function (team, idx) { return (<react_router_dom_1.Link to="/teams" key={idx}>
                <div className={"rounded-xl ".concat(team.color, " text-white p-4 shadow hover:scale-[1.02] transition-transform")}>
                <div className="text-4xl mb-2 text-center">{team.logo}</div>
                <h3 className="text-center font-bold text-lg">{team.name}</h3>
                <p className="text-center text-sm">{team.players} jugadores</p>
                </div>
            </react_router_dom_1.Link>); })}

        </div>
        </section>  
        {/* 🔽 Bloque 4: Líderes */}
        <section>
        <react_router_dom_1.Link to="/leaderboard">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 hover:underline hover:text-primary transition-colors">
            Tabla de Posiciones
            </h2>
        </react_router_dom_1.Link>
        <div className="overflow-x-auto">
            <table className="table-auto w-full border text-sm text-left">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Equipo</th>
                <th className="px-4 py-2">G</th>
                <th className="px-4 py-2">P</th>
                </tr>
            </thead>
            <tbody>
                {standings.slice(0, 4).map(function (team, idx) { return (<tr key={idx} className="border-t">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2 font-medium">{team.team}</td>
                    <td className="px-4 py-2">{team.w}</td>
                    <td className="px-4 py-2">{team.l}</td>
                </tr>); })}
            </tbody>
            </table>
        </div>
        </section>
       
        {/* 🔽 Bloque 5: Statpadders */}
        <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">StatPadders MVP Race</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
            { stat: 'Ataques', icon: '🏐', key: 'attack' },
            { stat: 'Bloqueos', icon: '🛡️', key: 'blocks' },
            { stat: 'Servicios', icon: '🎯', key: 'service' },
        ].map(function (_a) {
            var stat = _a.stat, icon = _a.icon, key = _a.key;
            var leader = players.length > 0
                ? players.reduce(function (top, player) { return player[key] > top[key] ? player : top; })
                : null;
            return (<div key={stat} className="bg-white rounded-xl shadow p-4">
                <div className="text-center text-3xl mb-2">{icon}</div>
                <div className="text-center font-bold">{stat}</div>
                {leader ? (<>
                    <div className="text-center text-sm text-gray-500 mt-1">{leader.name}</div>
                    <div className="text-center text-lg font-semibold">{leader[key]} pts</div>
                    </>) : (<div className="text-center text-sm text-gray-400 italic">Sin datos</div>)}
                </div>);
        })}

        </div>
        </section>
        {/* 🔽 Bloque 6: Team Stats */}
        <section>
        <h3 className="text-xl font-bold mt-10 mb-4 ">Equipos Destacados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <div className="text-3xl">🏐</div>
                <h4 className="font-bold text-center text-blue-900 mt-1">Ataques</h4>
                <p className="text-gray-700">{bestAttackTeam[0]}</p>
                <p className="font-bold text-blue-900 text-lg">{bestAttackTeam[1].attack} pts</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <div className="text-3xl">🛡️</div>
                <h4 className="font-bold text-center text-blue-900 mt-1">Bloqueos</h4>
                <p className="text-gray-700">{bestBlockTeam[0]}</p>
                <p className="font-bold text-blue-900 text-lg">{bestBlockTeam[1].blocks} pts</p>
            </div>
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <div className="text-3xl">🎯</div>
                <h4 className="font-bold text-center text-blue-900 mt-1">Servicios</h4>
                <p className="text-gray-700">{bestServiceTeam[0]}</p>
                <p className="font-bold text-blue-900 text-lg">{bestServiceTeam[1].service} pts</p>
            </div>
            </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Estadísticas por Equipo</h2>
        <div className="overflow-x-auto">
        

            <table className="table-auto w-full border text-sm text-left">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2">Equipo</th>
                    <th className="px-4 py-2 cursor-pointer" onClick={function () { return setTeamSortKey('attack'); }}>
                    Ataques ⇅
                    </th>
                    <th className="px-4 py-2 cursor-pointer" onClick={function () { return setTeamSortKey('blocks'); }}>
                    Bloqueos ⇅
                    </th>
                    <th className="px-4 py-2 cursor-pointer" onClick={function () { return setTeamSortKey('service'); }}>
                    Servicios ⇅
                    </th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(statsByTeam)
            .sort(function (_a, _b) {
            var a = _a[1];
            var b = _b[1];
            if (!teamSortKey)
                return 0;
            return b[teamSortKey] - a[teamSortKey];
        })
            .map(function (_a) {
            var team = _a[0], stats = _a[1];
            return (<tr key={team} className="border-t">
                    <td className="px-4 py-2 font-medium">{team}</td>
                    <td className="px-4 py-2">{stats.attack}</td>
                    <td className="px-4 py-2">{stats.blocks}</td>
                    <td className="px-4 py-2">{stats.service}</td>
                </tr>);
        })}
            </tbody>
            </table>
        </div>
        </section>


    </div>);
};
exports.default = Home;
