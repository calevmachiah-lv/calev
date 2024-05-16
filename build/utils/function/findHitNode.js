"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHitNode = void 0;
const findHitNode = (hitNodes, name) => {
    if (!hitNodes.length)
        return undefined;
    const hierarchy = [...hitNodes[0].hierarchy];
    hierarchy.reverse();
    return (hierarchy.find((el) => typeof name === 'string' ? name === el.name : name === null || name === void 0 ? void 0 : name.test(el.name)) || undefined);
};
exports.findHitNode = findHitNode;
