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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/AdminMatch.tsx
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../firebase");
var usePlayers_1 = require("../hooks/usePlayers");
var useUserRole_1 = require("../hooks/useUserRole");
var AdminMatch = function () {
    var id = (0, react_router_dom_1.useParams)().id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(null), match = _a[0], setMatch = _a[1];
    var _b = (0, react_1.useState)({}), formData = _b[0], setFormData = _b[1];
    var _c = (0, react_1.useState)(''), scoreA = _c[0], setScoreA = _c[1];
    var _d = (0, react_1.useState)(''), scoreB = _d[0], setScoreB = _d[1];
    var _e = (0, react_1.useState)(''), error = _e[0], setError = _e[1];
    var role = (0, useUserRole_1.default)();
    var players = (0, usePlayers_1.usePlayers)();
    (0, react_1.useEffect)(function () {
        var fetchMatch = function () { return __awaiter(void 0, void 0, void 0, function () {
            var ref, snap, data;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/];
                        ref = (0, firestore_1.doc)(firebase_1.db, 'matches', id);
                        return [4 /*yield*/, (0, firestore_1.getDoc)(ref)];
                    case 1:
                        snap = _c.sent();
                        if (snap.exists()) {
                            data = snap.data();
                            setMatch(data);
                            setScoreA((_a = data.scoreA) !== null && _a !== void 0 ? _a : '');
                            setScoreB((_b = data.scoreB) !== null && _b !== void 0 ? _b : '');
                            setFormData(data.playersStats || {});
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        fetchMatch();
    }, [id]);
    var handleStatChange = function (playerName, stat, value) {
        setFormData(function (prev) {
            var _a, _b;
            return (__assign(__assign({}, prev), (_a = {}, _a[playerName] = __assign(__assign({}, prev[playerName]), (_b = {}, _b[stat] = parseInt(value) || 0, _b)), _a)));
        });
    };
    var validateForm = function () {
        var scoreAVal = parseInt(scoreA);
        var scoreBVal = parseInt(scoreB);
        if (isNaN(scoreAVal) || isNaN(scoreBVal)) {
            return 'Debes ingresar un marcador válido para ambos equipos.';
        }
        if (!Object.keys(formData).some(function (name) { var _a, _b, _c; return ((_a = formData[name]) === null || _a === void 0 ? void 0 : _a.attack) || ((_b = formData[name]) === null || _b === void 0 ? void 0 : _b.blocks) || ((_c = formData[name]) === null || _c === void 0 ? void 0 : _c.service); })) {
            return 'Debes ingresar al menos una estadística para algún jugador.';
        }
        return null;
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var validationError, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    validationError = validateForm();
                    if (validationError) {
                        setError(validationError);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.db, 'matches', id), {
                            scoreA: parseInt(scoreA),
                            scoreB: parseInt(scoreB),
                            playersStats: formData,
                        })];
                case 2:
                    _a.sent();
                    navigate("/matches/".concat(id));
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    setError('Ocurrió un error al guardar. Intenta nuevamente.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (!match || role !== 'admin')
        return <p className="text-center mt-10">Cargando o sin permiso...</p>;
    var uniquePlayers = players.reduce(function (acc, player) {
        if (!acc.find(function (p) { return p.name === player.name; }))
            acc.push(player);
        return acc;
    }, []);
    var teamAPlayers = uniquePlayers.filter(function (p) { return p.team === match.teamA; });
    var teamBPlayers = uniquePlayers.filter(function (p) { return p.team === match.teamB; });
    return (<div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-primary mb-4">Registrar Resultado</h2>
      <div className="bg-white p-4 shadow rounded">
        <p className="text-center font-medium mb-2">{match.teamA} vs {match.teamB}</p>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 justify-center mb-6">
            <input type="number" className="border px-3 py-2 rounded w-24 text-center" placeholder={match.teamA} value={scoreA} onChange={function (e) { return setScoreA(e.target.value); }} required/>
            <span className="text-xl font-bold">-</span>
            <input type="number" className="border px-3 py-2 rounded w-24 text-center" placeholder={match.teamB} value={scoreB} onChange={function (e) { return setScoreB(e.target.value); }} required/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ team: match.teamA, players: teamAPlayers }, { team: match.teamB, players: teamBPlayers }].map(function (_a) {
            var team = _a.team, players = _a.players;
            return (<div key={team}>
                <h3 className="text-lg font-semibold mb-2">{team}</h3>
                {players.map(function (player) {
                    var _a, _b, _c;
                    return (<div key={player.name} className="mb-2">
                    <p className="font-medium">{player.name}</p>
                    <div className="flex gap-2">
                      <input type="number" placeholder="🏐" className="border px-2 py-1 w-1/3" value={((_a = formData[player.name]) === null || _a === void 0 ? void 0 : _a.attack) || ''} onChange={function (e) { return handleStatChange(player.name, 'attack', e.target.value); }}/>
                      <input type="number" placeholder="🛡️" className="border px-2 py-1 w-1/3" value={((_b = formData[player.name]) === null || _b === void 0 ? void 0 : _b.blocks) || ''} onChange={function (e) { return handleStatChange(player.name, 'blocks', e.target.value); }}/>
                      <input type="number" placeholder="🎯" className="border px-2 py-1 w-1/3" value={((_c = formData[player.name]) === null || _c === void 0 ? void 0 : _c.service) || ''} onChange={function (e) { return handleStatChange(player.name, 'service', e.target.value); }}/>
                    </div>
                  </div>);
                })}
              </div>);
        })}
          </div>

          <button type="submit" className="mt-6 bg-primary text-white px-6 py-2 rounded hover:bg-blue-700">
            Guardar Resultado
          </button>
        </form>
      </div>
    </div>);
};
exports.default = AdminMatch;
