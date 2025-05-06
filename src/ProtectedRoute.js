"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("./AuthContext");
var ProtectedRoute = function (_a) {
    var children = _a.children, requiredRole = _a.requiredRole;
    var _b = (0, AuthContext_1.useAuth)(), user = _b.user, role = _b.role, loading = _b.loading;
    if (!user || role === undefined) {
        return null; // o un loader si prefieres
    }
    if (loading)
        return null;
    if (!user || role !== requiredRole) {
        return <react_router_dom_1.Navigate to="/" replace/>;
    }
    return <>{children}</>;
};
exports.default = ProtectedRoute;
