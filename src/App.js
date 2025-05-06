"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
// Páginas principales
var ProtectedRoute_1 = require("./ProtectedRoute");
var Admin_1 = require("./pages/Admin"); // o el nombre que uses
var Navbar_1 = require("./Navbar");
var Leaderboard_1 = require("./pages/Leaderboard");
var Matches_1 = require("./pages/Matches");
var Players_1 = require("./pages/Players");
var Schedule_1 = require("./pages/Schedule");
var MatchDetail_1 = require("./pages/MatchDetail");
var AdminMatch_1 = require("./pages/AdminMatch");
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <Navbar_1.default />
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<Schedule_1.default />}/>
        {/* <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} /> */}
        <react_router_dom_1.Route path="/schedule" element={<Schedule_1.default />}/>
        <react_router_dom_1.Route path="/leaderboard" element={<Leaderboard_1.default />}/>
        <react_router_dom_1.Route path="/players" element={<Players_1.default />}/>
        <react_router_dom_1.Route path="/matches/:id" element={<MatchDetail_1.default />}/>
        <react_router_dom_1.Route path="/admin-match/:id" element={<AdminMatch_1.default />}/>
        <react_router_dom_1.Route path="/matches" element={<ProtectedRoute_1.default requiredRole="admin">
              <Matches_1.default />
            </ProtectedRoute_1.default>}/>
        <react_router_dom_1.Route path="/admin" element={<ProtectedRoute_1.default roles={['admin', 'scorekeeper']}>
              <Admin_1.default />
            </ProtectedRoute_1.default>}/>
      </react_router_dom_1.Routes>

    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
