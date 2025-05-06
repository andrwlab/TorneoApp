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
var react_1 = require("react");
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../firebase");
var react_router_dom_1 = require("react-router-dom");
var useUserRole_1 = require("../hooks/useUserRole");
var Schedule = function () {
    var _a = (0, react_1.useState)([]), matches = _a[0], setMatches = _a[1];
    var role = (0, useUserRole_1.default)();
    (0, react_1.useEffect)(function () {
        var unsubscribe = (0, firestore_1.onSnapshot)((0, firestore_1.collection)(firebase_1.db, 'matches'), function (snapshot) {
            var matchData = snapshot.docs
                .map(function (doc) { return (__assign({ id: doc.id }, doc.data())); })
                .sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
            setMatches(matchData);
        });
        return function () { return unsubscribe(); };
    }, []);
    return (<div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Calendario de Partidos</h2>
      <ul className="space-y-4">
        {matches.map(function (item) {
            var dateObj = new Date(item.date);
            var date = dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
            var time = dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            var isPlayed = item.scoreA != null && item.scoreB != null;
            return (<li key={item.id} className="bg-white shadow-sm border rounded-lg p-4 text-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                {/* Fecha */}
                <span className="text-sm text-gray-500 sm:w-1/4">{date}</span>

                {/* Partido + resultado */}
                <div className="sm:w-2/4 text-center">
                <react_router_dom_1.Link to={"/matches/".concat(item.id)}>
                    <div className="font-semibold hover:underline">
                    {item.teamA} vs {item.teamB}
                    {isPlayed && (<span className="text-primary ml-2">
                        ({item.scoreA} - {item.scoreB})
                        </span>)}
                    </div>
                </react_router_dom_1.Link>
                <div className="text-xs text-gray-500 mt-1">{item.format}</div>
                </div>

                {/* Hora + botón */}
                <div className="sm:w-1/4 text-right mt-2 sm:mt-0 flex justify-end gap-3">
                <span className="text-sm text-gray-500">{time}</span>
                {(!isPlayed && (role === 'admin' || role === 'scorekeeper')) && (<react_router_dom_1.Link to={"/admin-match/".concat(item.id)} className="text-xs text-blue-600 underline">
                    Editar
                    </react_router_dom_1.Link>)}
                </div>

              </div>
            </li>);
        })}
      </ul>
    </div>);
};
exports.default = Schedule;
