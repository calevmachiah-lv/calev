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
const generateNumberAttributeValues = (attribute) => {
    const length = (attribute.max + attribute.step) / attribute.step;
    return Array.from({ length }, (_, index) => index * attribute.step);
};
const add2DSpinTool = ({ attributeId, direction = 1, maxWidth = 0, }, handleLastAngle, isRotable, isFullScreen, setToggleButton, handleFullScreen) => {
    const player = window.threekit.player;
    const configurator = window.threekit.configurator;
    const attribute = configurator
        .getDisplayAttributes()
        .find(({ id }) => id === attributeId);
    if (!attribute) {
        return;
    }
    const attrName = attribute.name;
    const attributeValues = generateNumberAttributeValues(attribute);
    const configuration = configurator.getConfiguration();
    let curPct = configuration[attrName];
    const attrCount = attributeValues.length;
    const threshold = 1 / attrCount;
    player.tools.addTool({
        key: 'zoom',
        active: false,
        enabled: false,
    });
    !isFullScreen && player.tools.addTool({
        key: '2Dspin',
        active: isRotable,
        enabled: isRotable,
        handlers: {
            drag: () => ({
                handle: (event) => __awaiter(void 0, void 0, void 0, function* () {
                    const configuration = configurator.getConfiguration();
                    const deltaT = event.deltaX / Math.max(event.rect.width, maxWidth);
                    const newPct = curPct + deltaT;
                    if (Math.abs(newPct) < 0.05 && Math.abs(newPct) > threshold) {
                        const currentValueIndex = attributeValues.findIndex((attributeValue) => attributeValue === configuration[attrName]);
                        const increment = (newPct > 0 ? 1 : -1) * (direction < 0 ? -1 : 1);
                        const newIndex = (currentValueIndex + increment) % attrCount;
                        const attributeValue = attributeValues[newIndex < 0 ? attrCount + newIndex : newIndex];
                        configurator.setConfiguration({ [attrName]: attributeValue });
                        handleLastAngle(+`${attributeValue}`);
                    }
                    curPct = newPct % threshold;
                }),
                momentum: true,
            }),
        },
    });
    const putZoom = (isPinch, doubleClick) => {
        if (isPinch)
            return;
        if (doubleClick) {
            handleFullScreen();
        }
        removeIcon();
        player.tools.addTool('zoom');
        player.tools.removeTool('2Dspin');
    };
    const removeIcon = () => {
        setTimeout(() => {
            setToggleButton(false);
        }, 3000);
    };
    const removeZoom = () => {
        player.tools.removeTool('zoom');
        player.tools.addTool({
            key: '2Dspin',
            active: isRotable,
            enabled: isRotable,
            handlers: {
                drag: () => ({
                    handle: (event) => __awaiter(void 0, void 0, void 0, function* () {
                        const configuration = configurator.getConfiguration();
                        const deltaT = event.deltaX / Math.max(event.rect.width, maxWidth);
                        const newPct = curPct + deltaT;
                        if (Math.abs(newPct) < 0.05 && Math.abs(newPct) > threshold) {
                            const currentValueIndex = attributeValues.findIndex((attributeValue) => attributeValue === configuration[attrName]);
                            const increment = (newPct > 0 ? 1 : -1) * (direction < 0 ? -1 : 1);
                            const newIndex = (currentValueIndex + increment) % attrCount;
                            const attributeValue = attributeValues[newIndex < 0 ? attrCount + newIndex : newIndex];
                            configurator.setConfiguration({ [attrName]: attributeValue });
                            handleLastAngle(attributeValue);
                        }
                        curPct = newPct % threshold;
                    }),
                    momentum: true,
                }),
            },
        });
    };
    isFullScreen ? putZoom() : removeZoom();
};
exports.default = add2DSpinTool;
