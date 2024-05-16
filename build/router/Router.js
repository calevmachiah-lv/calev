"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const HomePage_1 = __importDefault(require("../pages/HomePage/HomePage"));
const router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: ':details',
        element: (0, jsx_runtime_1.jsx)(HomePage_1.default, {}),
    },
    {
        path: '/',
        element: (0, jsx_runtime_1.jsx)(HomePage_1.default, {}),
    },
    {
        path: '*',
        element: (0, jsx_runtime_1.jsx)(HomePage_1.default, {}),
    },
]);
const Router = () => {
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.RouterProvider, { router: router });
};
exports.default = Router;
