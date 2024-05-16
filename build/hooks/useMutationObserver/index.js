"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useMutationObserver = ({ element, callback, options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
}, }) => {
    (0, react_1.useEffect)(() => {
        if (element) {
            const observer = new MutationObserver(function (mutationsList, observer) {
                for (const mutation of mutationsList) {
                    const { type, attributeName, target } = mutation;
                    if (type == 'attributes' && attributeName == 'style') {
                        if (element.style.width !== "1px") {
                            callback();
                        }
                    }
                }
            });
            observer.observe(element, options);
            return () => observer.disconnect();
        }
    }, [callback, options]);
};
exports.default = useMutationObserver;
