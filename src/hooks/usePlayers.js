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
exports.usePlayers = void 0;
// src/hooks/usePlayers.ts
var react_1 = require("react");
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("../firebase");
var usePlayers = function () {
    var _a = (0, react_1.useState)([]), players = _a[0], setPlayers = _a[1];
    (0, react_1.useEffect)(function () {
        var unsub = (0, firestore_1.onSnapshot)((0, firestore_1.collection)(firebase_1.db, 'players'), function (snapshot) {
            var data = snapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
            setPlayers(data);
        });
        return function () { return unsub(); };
    }, []);
    return players;
};
exports.usePlayers = usePlayers;
