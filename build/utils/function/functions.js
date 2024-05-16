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
exports.getChooseValue = exports.isChooseValue = exports.getSelectedSkus = exports.getMergedAttributesAndGrouped = exports.extractGroupNameFromGroupKey = exports.isRTLCharacter = exports.isRightToLeft = exports.isTextAttribute = exports.hasPatch = exports.isWithinTapArea = exports.isPinchZoom = exports.getEventPosition = exports.createScriptIfRequired = exports.addOpacityAnimation = exports.isEmpty = exports.isEmptyObj = exports.metadataValueToObject = exports.easeInOutCubic = exports.copyTextToClipboard = exports.dataURItoFile = exports.attrNameToRegExp = exports.deepCompare = exports.shallowCompare = exports.isMobileScreen = void 0;
const navigationParams_1 = require("./navigationParams");
const isMobileScreen = () => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    return Boolean(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent));
};
exports.isMobileScreen = isMobileScreen;
const isObject = (object) => object != null && typeof object === 'object';
const shallowCompare = (value1, value2) => {
    if (typeof value1 !== typeof value2)
        return false;
    if (Array.isArray(value1)) {
        if (value1.length !== value2.length)
            return false;
        for (let i = 0; i < value1.length; i++)
            if (value1[i] !== value2[i])
                return false;
    }
    if (typeof value1 !== 'object')
        return value1 === value2;
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (value1[key] !== value2[key]) {
            return false;
        }
    }
    return true;
};
exports.shallowCompare = shallowCompare;
const deepCompare = (item1, item2) => {
    if (typeof item1 !== typeof item2)
        return false;
    else if (Array.isArray(item1)) {
        if (item1.length !== item2.length)
            return false;
        for (let i = 0; i < item1.length; i++)
            if (!(0, exports.deepCompare)(item1[i], item2[i]))
                return false;
    }
    else if (isObject(item1)) {
        const keys1 = Object.keys(item1);
        const keys2 = Object.keys(item2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            if (!(0, exports.deepCompare)(item1[key], item2[key]))
                return false;
        }
    }
    else if (item1 !== item2)
        return false;
    return true;
};
exports.deepCompare = deepCompare;
const attrNameToRegExp = (name) => typeof name === 'string' ? new RegExp(`${name} [0-9]`) : name;
exports.attrNameToRegExp = attrNameToRegExp;
const dataURItoFile = (dataURI, filename) => {
    var arr = dataURI.split(','), 
    //@ts-ignore
    mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};
exports.dataURItoFile = dataURItoFile;
const copyTextToClipboard = (text) => __awaiter(void 0, void 0, void 0, function* () {
    yield navigator.clipboard.writeText(text);
});
exports.copyTextToClipboard = copyTextToClipboard;
const easeInOutCubic = (val) => val < 0.5 ? 4 * val * val * val : 1 - Math.pow(-2 * val + 2, 3) / 2;
exports.easeInOutCubic = easeInOutCubic;
const metadataValueToObject = (data) => data.split(',').reduce((output, keVal) => {
    const [key, value] = keVal
        .trim()
        .split('=')
        .map((el) => el.trim());
    return Object.assign(output, { [key]: parseFloat(value) || value });
}, {});
exports.metadataValueToObject = metadataValueToObject;
const isEmptyObj = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;
exports.isEmptyObj = isEmptyObj;
const isEmpty = (variable) => {
    if (variable === undefined || variable === null) {
        return true;
    }
    if (typeof variable === 'number' && isNaN(variable)) {
        return true;
    }
    if (typeof variable === 'string' && variable.trim().length > 0) {
        return false;
    }
    if (Array.isArray(variable) && variable.length > 0) {
        return false;
    }
    if (typeof variable === 'object' && Object.keys(variable).length > 0) {
        return false;
    }
    return true;
};
exports.isEmpty = isEmpty;
const addOpacityAnimation = (elementId, time = 500, mode) => {
    const playerEl = document.getElementById(elementId);
    const animationToDisplay = mode
        ? `opacity-animation-${mode}`
        : 'opacity-animation';
    if (!playerEl)
        return;
    playerEl.classList.add(animationToDisplay);
    setTimeout(() => {
        playerEl.classList.remove(animationToDisplay);
    }, time);
};
exports.addOpacityAnimation = addOpacityAnimation;
const createScriptIfRequired = () => {
    if (!document.querySelector('script[src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"]')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js';
        document.body.appendChild(script);
    }
};
exports.createScriptIfRequired = createScriptIfRequired;
function getEventPosition(event) {
    if ((event === null || event === void 0 ? void 0 : event.type) && event.type.startsWith('touch')) {
        const touchEvent = event;
        const touch = (touchEvent === null || touchEvent === void 0 ? void 0 : touchEvent.changedTouches[0]) || (touchEvent === null || touchEvent === void 0 ? void 0 : touchEvent.touches[0]);
        return { x: touch === null || touch === void 0 ? void 0 : touch.clientX, y: touch === null || touch === void 0 ? void 0 : touch.clientY };
    }
    else {
        const mouseEvent = event;
        return { x: mouseEvent === null || mouseEvent === void 0 ? void 0 : mouseEvent.clientX, y: mouseEvent === null || mouseEvent === void 0 ? void 0 : mouseEvent.clientY };
    }
}
exports.getEventPosition = getEventPosition;
function isPinchZoom(event) {
    var _a;
    if ((event === null || event === void 0 ? void 0 : event.type) && ((_a = event === null || event === void 0 ? void 0 : event.type) === null || _a === void 0 ? void 0 : _a.startsWith('touch'))) {
        const touchEvent = event;
        const touch = touchEvent.changedTouches || touchEvent.touches || [];
        return (touch === null || touch === void 0 ? void 0 : touch.length) > 1;
    }
    else {
        return false;
    }
}
exports.isPinchZoom = isPinchZoom;
function isWithinTapArea(pos1, pos2, tolerance = 25) {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return dx * dx + dy * dy < tolerance * tolerance;
}
exports.isWithinTapArea = isWithinTapArea;
const hasPatch = () => {
    var _a, _b, _c, _d, _e, _f, _g;
    const attributes3D = (_c = (_b = (_a = window.threekit) === null || _a === void 0 ? void 0 : _a.configurator) === null || _b === void 0 ? void 0 : _b.getDisplayAttributes()) === null || _c === void 0 ? void 0 : _c.find((el) => {
        var _a;
        return (_a = el.values) === null || _a === void 0 ? void 0 : _a.find((attr) => {
            var _a, _b;
            return ((_a = attr.metadata) === null || _a === void 0 ? void 0 : _a.isPlayer3D) == 'true' &&
                (attr === null || attr === void 0 ? void 0 : attr.assetId) == ((_b = el === null || el === void 0 ? void 0 : el.value) === null || _b === void 0 ? void 0 : _b.assetId);
        });
    });
    if (!attributes3D)
        return false;
    const yesAttributes = (_e = (_d = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _d === void 0 ? void 0 : _d.getStatus()) === null || _e === void 0 ? void 0 : _e.validAttributesAndTheirValues_typeB.find((attr) => (attr === null || attr === void 0 ? void 0 : attr.name) === (attributes3D === null || attributes3D === void 0 ? void 0 : attributes3D.name));
    const yes3D = ((_g = (_f = yesAttributes === null || yesAttributes === void 0 ? void 0 : yesAttributes.values) === null || _f === void 0 ? void 0 : _f.find((el) => el.selected)) === null || _g === void 0 ? void 0 : _g.name) === 'yes';
    return yes3D;
};
exports.hasPatch = hasPatch;
const isTextAttribute = (currentGroup) => {
    let isTextAttribute = false;
    const hasPatch = Object.keys(currentGroup).findIndex((element) => element === 'has patch');
    const hasText = Object.keys(currentGroup).findIndex((element) => element === 'perso + / patch text line 1');
    const hasLockNumber = Object.keys(currentGroup).findIndex((element) => element === 'has lock number');
    const persoLockNumber = Object.keys(currentGroup).findIndex((element) => element === 'perso + / Lock number exists');
    if ((hasPatch !== -1 || hasLockNumber !== -1) &&
        (hasText !== -1 || persoLockNumber !== -1)) {
        isTextAttribute = true;
    }
    return isTextAttribute;
};
exports.isTextAttribute = isTextAttribute;
const isRightToLeft = () => {
    const params = (0, navigationParams_1.getParams)();
    return params.lng === 'ara' || document.documentElement.dir === 'rtl';
};
exports.isRightToLeft = isRightToLeft;
const isRTLCharacter = (char) => {
    const rtlCharacters = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    return rtlCharacters.test(char);
};
exports.isRTLCharacter = isRTLCharacter;
const extractGroupNameFromGroupKey = (groupKey) => {
    const name = groupKey.split('_').slice(1).join('-');
    return name.charAt(0).toUpperCase() + name.slice(1);
};
exports.extractGroupNameFromGroupKey = extractGroupNameFromGroupKey;
const getMergedAttributesAndGrouped = (updatedAttributes) => {
    var _a;
    const mergedAttributesWithDataDriven = {};
    const mergedAttributesWithDataDrivenGrouped = {};
    const dataDrivenStatus = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus();
    if (dataDrivenStatus) {
        const validAttributesAndTheirValues_typeB = dataDrivenStatus.validAttributesAndTheirValues_typeB;
        validAttributesAndTheirValues_typeB === null || validAttributesAndTheirValues_typeB === void 0 ? void 0 : validAttributesAndTheirValues_typeB.forEach((attribute) => {
            var _a;
            const fullAttributeData = Object.assign(Object.assign(Object.assign({}, attribute), updatedAttributes[attribute.name]), { values: (_a = attribute === null || attribute === void 0 ? void 0 : attribute.values) === null || _a === void 0 ? void 0 : _a.map((value) => {
                    var _a, _b;
                    return Object.assign(Object.assign({}, value), (_b = (_a = updatedAttributes[attribute.name]) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.find((el) => el.name === value.name));
                }) });
            mergedAttributesWithDataDriven[attribute.name] = Object.assign({}, fullAttributeData);
            if (!attribute.groupName) {
                mergedAttributesWithDataDrivenGrouped[attribute.name] = [
                    fullAttributeData,
                ];
            }
            else if (!mergedAttributesWithDataDrivenGrouped[(0, exports.extractGroupNameFromGroupKey)(attribute === null || attribute === void 0 ? void 0 : attribute.groupName)]) {
                mergedAttributesWithDataDrivenGrouped[(0, exports.extractGroupNameFromGroupKey)(attribute === null || attribute === void 0 ? void 0 : attribute.groupName)] = [fullAttributeData];
            }
            else {
                mergedAttributesWithDataDrivenGrouped[(0, exports.extractGroupNameFromGroupKey)(attribute === null || attribute === void 0 ? void 0 : attribute.groupName)].push(fullAttributeData);
            }
        });
        return [
            mergedAttributesWithDataDriven,
            mergedAttributesWithDataDrivenGrouped,
        ];
    }
};
exports.getMergedAttributesAndGrouped = getMergedAttributesAndGrouped;
const getSelectedSkus = (groupedAttributes) => {
    var _a;
    return (((_a = Object.values(groupedAttributes)) === null || _a === void 0 ? void 0 : _a.map((group) => group === null || group === void 0 ? void 0 : group.map((product) => {
        var _a, _b;
        return (_b = (_a = product === null || product === void 0 ? void 0 : product.values) === null || _a === void 0 ? void 0 : _a.find((element) => (element === null || element === void 0 ? void 0 : element.selected) === true)) === null || _b === void 0 ? void 0 : _b.sku;
    }).filter((sku) => sku !== 'NA').toString()).filter((item) => (item === null || item === void 0 ? void 0 : item.length) > 0)) || '');
};
exports.getSelectedSkus = getSelectedSkus;
const isChooseValue = (value) => { var _a, _b; return (_b = (_a = value === null || value === void 0 ? void 0 : value.name) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === null || _b === void 0 ? void 0 : _b.startsWith('CHOOSE'); };
exports.isChooseValue = isChooseValue;
const getChooseValue = (values) => values.find((value) => { var _a, _b; return (_b = (_a = value === null || value === void 0 ? void 0 : value.name) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === null || _b === void 0 ? void 0 : _b.startsWith('CHOOSE'); });
exports.getChooseValue = getChooseValue;
