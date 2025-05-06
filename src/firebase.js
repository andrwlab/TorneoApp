"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var auth_1 = require("firebase/auth");
// ⬇️ Sustituye los datos con los de tu proyecto Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBnCUSs7kB_vM7Pg_-Ib9CWvPJ99pxGYQk",
    authDomain: "webtorneitoapp.firebaseapp.com",
    projectId: "webtorneitoapp",
    storageBucket: "webtorneitoapp.firebasestorage.app",
    messagingSenderId: "1044341561885",
    appId: "1:1044341561885:web:a8d456248a9209668184f4",
    measurementId: "G-3FGSQNXL5N"
};
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.db = (0, firestore_1.getFirestore)(app);
exports.auth = (0, auth_1.getAuth)(app);
