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
var react_1 = require("react");
var firebase_1 = require("../firebase");
var firestore_1 = require("firebase/firestore");
var AuthContext_1 = require("../AuthContext");
var Matches = function () {
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, role = _a.role;
    var _b = (0, react_1.useState)([]), games = _b[0], setGames = _b[1];
    var _c = (0, react_1.useState)({
        teamA: '',
        teamB: '',
        scoreA: '',
        scoreB: '',
        date: ''
    }), formData = _c[0], setFormData = _c[1];
    (0, react_1.useEffect)(function () {
        var unsubscribe = (0, firestore_1.onSnapshot)((0, firestore_1.collection)(firebase_1.db, 'matches'), function (snapshot) {
            var matchesData = snapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
            setGames(matchesData);
        });
        return function () { return unsubscribe(); };
    }, []);
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var newMatch, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    newMatch = {
                        teamA: formData.teamA,
                        teamB: formData.teamB,
                        scoreA: parseInt(formData.scoreA),
                        scoreB: parseInt(formData.scoreB),
                        date: formData.date
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, 'matches'), newMatch)];
                case 2:
                    _a.sent();
                    setFormData({ teamA: '', teamB: '', scoreA: '', scoreB: '', date: '' });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error al guardar el partido:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Partidos</h2>

      {user && role === 'admin' && (<>
          <h3 className="text-xl font-semibold mb-2">Registrar nuevo partido</h3>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mb-6">
            <div className="flex gap-4">
              <input type="text" name="teamA" value={formData.teamA} onChange={handleChange} placeholder="Equipo A" className="w-1/2 border px-3 py-2 rounded" required/>
              <input type="text" name="teamB" value={formData.teamB} onChange={handleChange} placeholder="Equipo B" className="w-1/2 border px-3 py-2 rounded" required/>
            </div>
            <div className="flex gap-4">
              <input type="number" name="scoreA" value={formData.scoreA} onChange={handleChange} placeholder="Puntos A" className="w-1/2 border px-3 py-2 rounded" required/>
              <input type="number" name="scoreB" value={formData.scoreB} onChange={handleChange} placeholder="Puntos B" className="w-1/2 border px-3 py-2 rounded" required/>
            </div>
            <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="Fecha (ej. 2 de mayo)" className="w-full border px-3 py-2 rounded" required/>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Guardar</button>
          </form>
        </>)}

      <h3 className="text-xl font-semibold mb-2">Partidos registrados</h3>
      <ul className="space-y-2">
        {games.map(function (match) { return (<li key={match.id} className="border px-4 py-2 rounded shadow-sm flex justify-between items-center">
            <span>
                <strong>{match.date}</strong>: {match.teamA} {match.scoreA} - {match.scoreB} {match.teamB}
            </span>
            {(role === 'admin' || role === 'scorekeeper') && (<a href={"/admin-match/".concat(match.id)} className="text-sm text-blue-600 hover:underline ml-4">
                Editar
                </a>)}
            </li>); })}
    </ul>

    </div>);
};
exports.default = Matches;
