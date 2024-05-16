"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
// export const debounce = (func, delay:number) => {
//   let timeoutId;
//   return function (...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(this, args), delay);
//   };
// };
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};
exports.debounce = debounce;
