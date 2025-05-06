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
exports.usePlayerStats = void 0;
var react_1 = require("react");
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../firebase");
var usePlayerStats = function () {
    var _a = (0, react_1.useState)([]), players = _a[0], setPlayers = _a[1];
    (0, react_1.useEffect)(function () {
        var unsubscribe = (0, firestore_1.onSnapshot)((0, firestore_1.collection)(firebase_1.db, 'players'), function (snapshot) {
            var playerList = snapshot.docs.map(function (doc) { return doc.data(); });
            (0, firestore_1.onSnapshot)((0, firestore_1.collection)(firebase_1.db, 'matches'), function (matchSnap) {
                var matchData = matchSnap.docs.map(function (doc) { return doc.data(); });
                // Sumar estadísticas por jugador
                var statsMap = {};
                matchData.forEach(function (match) {
                    var _a, _b, _c;
                    var stats = match.playersStats || {};
                    for (var name_1 in stats) {
                        if (!statsMap[name_1]) {
                            statsMap[name_1] = { attack: 0, blocks: 0, service: 0 };
                        }
                        statsMap[name_1].attack += ((_a = stats[name_1]) === null || _a === void 0 ? void 0 : _a.attack) || 0;
                        statsMap[name_1].blocks += ((_b = stats[name_1]) === null || _b === void 0 ? void 0 : _b.blocks) || 0;
                        statsMap[name_1].service += ((_c = stats[name_1]) === null || _c === void 0 ? void 0 : _c.service) || 0;
                    }
                });
                // Asociar stats a cada jugador
                var combined = playerList.map(function (p) { return (__assign(__assign({}, p), statsMap[p.name] || { attack: 0, blocks: 0, service: 0 })); });
                setPlayers(combined);
            });
        });
        return function () { return unsubscribe(); };
    }, []);
    return players;
};
exports.usePlayerStats = usePlayerStats;
