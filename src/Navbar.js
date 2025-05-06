"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var auth_1 = require("firebase/auth");
var AuthContext_1 = require("./AuthContext");
var Navbar = function () {
    var auth = (0, auth_1.getAuth)();
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, role = _a.role;
    var login = function () {
        var provider = new auth_1.GoogleAuthProvider();
        (0, auth_1.signInWithPopup)(auth, provider).catch(console.error);
    };
    var logout = function () {
        (0, auth_1.signOut)(auth);
    };
    return (<nav className="bg-primary text-white px-4 py-4 sm:px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Torneo de Vóley</h1>

        <ul className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm sm:text-base">
          {/* <li><Link to="/" className="hover:underline">Inicio</Link></li>
        <li><Link to="/teams" className="hover:underline">Equipos</Link></li> */}
          <li><react_router_dom_1.Link to="/schedule" className="hover:underline">Calendario</react_router_dom_1.Link></li>
          <li><react_router_dom_1.Link to="/leaderboard" className="hover:underline">Posiciones</react_router_dom_1.Link></li>
          <li><react_router_dom_1.Link to="/players" className="hover:underline">Jugadores</react_router_dom_1.Link></li>
          {user && role === 'admin' && (<li><react_router_dom_1.Link to="/matches" className="hover:underline">Partidos</react_router_dom_1.Link></li>)}
        </ul>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          {user ? (<>
              <span className="text-sm text-center sm:text-left">Hola, {user.displayName}</span>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm">
                Cerrar sesión
              </button>
            </>) : (<button onClick={login} className="bg-white text-primary px-3 py-1 rounded text-sm hover:bg-gray-100">
              Iniciar sesión
            </button>)}
        </div>
      </div>
    </nav>);
};
exports.default = Navbar;
