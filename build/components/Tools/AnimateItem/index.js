"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimateItem = void 0;
const react_1 = require("react");
const threekitHooks_1 = require("../../../utils/threekitHooks");
const constants_1 = require("../../../utils/constants");
const functions_1 = require("../../../utils/function/functions");
const AnimateItem = (props) => {
    const loaded = (0, threekitHooks_1.useThreekitInitStatus)();
    const originalPosition = (0, react_1.useRef)({});
    const originalRotation = (0, react_1.useRef)({});
    const isTransformed = (0, react_1.useRef)({});
    const animationInProgress = (0, react_1.useRef)({});
    const { topItemOnly, translateMetadataField, rotateMetadataField, duration } = Object.assign({
        topItemOnly: true,
        translateMetadataField: constants_1.METADATA_RESERVED.translate,
        rotateMetadataField: constants_1.METADATA_RESERVED.rotate,
        duration: 1000,
    }, props);
    (0, react_1.useEffect)(() => {
        const tool = () => ({
            key: 'animate-item',
            label: 'animate-item',
            active: true,
            enabled: true,
            handlers: {
                click: (event) => __awaiter(void 0, void 0, void 0, function* () {
                    var _a, _b;
                    const hits = event.hitNodes;
                    if (!(hits === null || hits === void 0 ? void 0 : hits.length))
                        return undefined;
                    const hierarchy = [...hits[0].hierarchy];
                    hierarchy.reverse();
                    let itemId;
                    let item;
                    let nullId;
                    let translateDelta;
                    let rotateDelta;
                    if (topItemOnly) {
                        for (let node of hierarchy) {
                            if (itemId)
                                continue;
                            if (node.type === 'Null') {
                                nullId = node.nodeId;
                                continue;
                            }
                            if (node.type === 'Item')
                                itemId = node.nodeId;
                        }
                        if (!nullId)
                            return;
                        if (animationInProgress.current[nullId] === true)
                            return;
                        item = window.threekit.player.scene.get({ id: itemId });
                        const translate = (_a = item.configurator) === null || _a === void 0 ? void 0 : _a.metadata.find((el) => el.name === translateMetadataField);
                        const rotate = (_b = item.configurator) === null || _b === void 0 ? void 0 : _b.metadata.find((el) => el.name === rotateMetadataField);
                        if (!translate && !rotate)
                            return;
                        if (translate) {
                            translateDelta = Object.assign({ x: 0, y: 0, z: 0, duration }, (0, functions_1.metadataValueToObject)(translate === null || translate === void 0 ? void 0 : translate.defaultValue));
                            originalPosition.current[nullId] =
                                window.threekit.player.scene.get({
                                    id: nullId,
                                    plug: 'Transform',
                                    property: 'translation',
                                });
                        }
                        if (rotate) {
                            rotateDelta = Object.assign({ x: 0, y: 0, z: 0, duration }, (0, functions_1.metadataValueToObject)(rotate === null || rotate === void 0 ? void 0 : rotate.defaultValue));
                            originalRotation.current[nullId] =
                                window.threekit.player.scene.get({
                                    id: nullId,
                                    plug: 'Transform',
                                    property: 'rotation',
                                });
                        }
                    }
                    if (!(nullId in isTransformed.current))
                        isTransformed.current[nullId] = false;
                    let start;
                    const animateFrame = (timestamp) => {
                        let axisList = ['x', 'y', 'z'];
                        if (start === undefined)
                            start = timestamp;
                        const elapsed = timestamp - start;
                        if (translateDelta) {
                            //  Translate Setup
                            let updatedPosition = {
                                x: undefined,
                                y: undefined,
                                z: undefined,
                            };
                            const tProgress = elapsed / translateDelta.duration;
                            const tAnimPercent = (0, functions_1.easeInOutCubic)(tProgress);
                            if (!isTransformed.current[nullId]) {
                                updatedPosition = axisList.reduce((output, axis) => {
                                    return Object.assign(output, {
                                        [axis]: Math.min(originalPosition.current[nullId][axis] +
                                            translateDelta[axis] * tAnimPercent, translateDelta[axis]),
                                    });
                                }, updatedPosition);
                            }
                            else {
                                updatedPosition = axisList.reduce((output, axis) => {
                                    return Object.assign(output, {
                                        [axis]: Math.min(originalPosition.current[nullId][axis] -
                                            translateDelta[axis] * tAnimPercent, translateDelta[axis]),
                                    });
                                }, updatedPosition);
                            }
                            window.threekit.player.scene.set({
                                id: nullId,
                                plug: 'Transform',
                                property: 'translation',
                            }, updatedPosition);
                        }
                        if (rotateDelta) {
                            //  Rotation Setup
                            let updatedRotation = {
                                x: undefined,
                                y: undefined,
                                z: undefined,
                            };
                            const rProgress = elapsed / rotateDelta.duration;
                            const rAnimPercent = (0, functions_1.easeInOutCubic)(rProgress);
                            if (!isTransformed.current[nullId]) {
                                updatedRotation = axisList.reduce((output, axis) => {
                                    return Object.assign(output, {
                                        [axis]: Math.min(originalRotation.current[nullId][axis] +
                                            rotateDelta[axis] * rAnimPercent, rotateDelta[axis]),
                                    });
                                }, updatedRotation);
                            }
                            else {
                                updatedRotation = axisList.reduce((output, axis) => {
                                    return Object.assign(output, {
                                        [axis]: Math.min(originalRotation.current[nullId][axis] -
                                            rotateDelta[axis] * rAnimPercent, rotateDelta[axis]),
                                    });
                                }, updatedRotation);
                            }
                            window.threekit.player.scene.set({
                                id: nullId,
                                plug: 'Transform',
                                property: 'rotation',
                            }, updatedRotation);
                        }
                        if (elapsed <
                            Math.max((translateDelta === null || translateDelta === void 0 ? void 0 : translateDelta.duration) || 0, (rotateDelta === null || rotateDelta === void 0 ? void 0 : rotateDelta.duration) || 0)) {
                            window.requestAnimationFrame(animateFrame);
                        }
                        else {
                            animationInProgress.current[nullId] = false;
                            isTransformed.current[nullId] = !isTransformed.current[nullId];
                        }
                    };
                    animationInProgress.current[nullId] = true;
                    window.requestAnimationFrame(animateFrame);
                }),
            },
        });
        (() => {
            if (!loaded)
                return;
            originalPosition.current = {};
            originalRotation.current = {};
            isTransformed.current = {};
            animationInProgress.current = {};
            window.threekit.controller.addTool(tool);
        })();
        // return window.threekit.controller.removeTool(tooltip());
    }, [loaded]);
    return null;
};
exports.AnimateItem = AnimateItem;
exports.default = exports.AnimateItem;
