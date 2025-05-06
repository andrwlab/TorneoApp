"use strict";
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
// src/pages/MatchDetail.tsx
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../firebase");
var useUserRole_1 = require("../hooks/useUserRole");
var MatchDetail = function () {
    var id = (0, react_router_dom_1.useParams)().id;
    var _a = (0, react_1.useState)(null), match = _a[0], setMatch = _a[1];
    var role = (0, useUserRole_1.default)();
    (0, react_1.useEffect)(function () {
        var fetchMatch = function () { return __awaiter(void 0, void 0, void 0, function () {
            var ref, snap, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            return [2 /*return*/];
                        ref = (0, firestore_1.doc)(firebase_1.db, 'matches', id);
                        return [4 /*yield*/, (0, firestore_1.getDoc)(ref)];
                    case 1:
                        snap = _a.sent();
                        if (snap.exists()) {
                            data = snap.data();
                            setMatch(data);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        fetchMatch();
    }, [id]);
    if (!match)
        return <p className="text-center mt-10">Cargando partido...</p>;
    var date = new Date(match.date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
    });
    return (<div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-primary mb-4">Detalles del Partido</h2>
      <div className="bg-white p-4 shadow rounded">
        <div className="text-center font-semibold text-lg mb-1">
          {match.teamA} vs {match.teamB}
        </div>
        <div className="text-center text-gray-500 text-sm mb-4">{date} • {match.format}</div>

        {match.scoreA != null && match.scoreB != null ? (<div className="text-center text-xl font-bold text-green-700 mb-4">
            Resultado: {match.scoreA} - {match.scoreB}
          </div>) : (<div className="text-center text-sm text-gray-400 italic mb-4">Aún sin resultado</div>)}

        {role === 'admin' || role === 'scorekeeper' ? (<div className="text-center mb-4">
            <react_router_dom_1.Link to={"/admin-match/".concat(id)}>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Editar Partido
              </button>
            </react_router_dom_1.Link>
          </div>) : null}

        <h3 className="text-md font-bold mb-2">Estadísticas por jugador:</h3>
        {match.playersStats && Object.keys(match.playersStats).length > 0 ? (<table className="table-auto w-full border text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Jugador</th>
                <th className="px-4 py-2">Ataques</th>
                <th className="px-4 py-2">Bloqueos</th>
                <th className="px-4 py-2">Servicios</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(match.playersStats).map(function (_a) {
                var _b, _c, _d;
                var name = _a[0], stats = _a[1];
                return (<tr key={name} className="border-t">
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2">{(_b = stats === null || stats === void 0 ? void 0 : stats.attack) !== null && _b !== void 0 ? _b : 0}</td>
                  <td className="px-4 py-2">{(_c = stats === null || stats === void 0 ? void 0 : stats.blocks) !== null && _c !== void 0 ? _c : 0}</td>
                  <td className="px-4 py-2">{(_d = stats === null || stats === void 0 ? void 0 : stats.service) !== null && _d !== void 0 ? _d : 0}</td>
                </tr>);
            })}
            </tbody>
          </table>) : (<p className="text-gray-500 text-sm">No hay estadísticas registradas.</p>)}
      </div>
    </div>);
};
exports.default = MatchDetail;
