"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.styled.div(() => `
        display: flex;
        height: 42.5vh;
        height: 42.5svh;
        border-radius: 20px 20px 0px 0px;
        box-shadow: 0px -5px 50px 0px rgba(0, 0, 0, 0.10);
        width: 100vw;
    `);
