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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../services/connection"));
const services_1 = __importDefault(require("../services"));
const functions_1 = require("../utils/function/functions");
const constants_1 = require("../utils/constants");
const objectToQueryString_1 = require("../utils/function/objectToQueryString");
const attributesHelperFn_1 = require("../utils/function/attributesHelperFn");
const attributeFn_1 = require("../utils/function/attributeFn");
const navigationParams_1 = require("../utils/function/navigationParams");
const dataDrivenFn_1 = require("../utils/function/dataDrivenFn");
class Controller {
    constructor({ product, api, player, configurator, translations, language, toolsList, attributeGrouping, config, settings, }) {
        var _a;
        this.takeSnapshots = (snapshotsConfig) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c;
            const size = (snapshotsConfig === null || snapshotsConfig === void 0 ? void 0 : snapshotsConfig.size) || constants_1.DEFAULT_CAMERA_CONFIG.size;
            const format = (snapshotsConfig === null || snapshotsConfig === void 0 ? void 0 : snapshotsConfig.format) || constants_1.DEFAULT_CAMERA_CONFIG.format;
            const attributeName = (snapshotsConfig === null || snapshotsConfig === void 0 ? void 0 : snapshotsConfig.attributeName) || constants_1.DEFAULT_CAMERA_CONFIG.attributeName;
            let snapshotsRaw = {};
            const cameras = (_b = window.threekit.configurator
                .getDisplayAttributes()
                .find((el) => el.name === attributeName)) === null || _b === void 0 ? void 0 : _b.values.filter((el) => el.tags.includes('snapshot'));
            const currentCamera = ((_c = window.threekit.configurator
                .getDisplayAttributes()
                .find((el) => el.name === attributeName)) === null || _c === void 0 ? void 0 : _c.value) || undefined;
            const cameraPosition = (0, attributesHelperFn_1.getCameraPosition)(window.threekit.player.camera);
            snapshotsRaw = (yield getSnapshots(cameras)) || {};
            yield window.threekit.configurator.setConfiguration({
                [attributeName]: currentCamera,
            });
            (0, attributesHelperFn_1.setCameraPosition)(window.threekit.player.camera, cameraPosition);
            const files = Object.entries(snapshotsRaw).reduce((output, [key, el]) => {
                const file = (0, functions_1.dataURItoFile)(el, `${key}.${format}`);
                return Object.assign(output, { [key]: file });
            }, {});
            return Promise.resolve(files);
            function getSnapshots(cameras) {
                let snapshots = {};
                return cameras === null || cameras === void 0 ? void 0 : cameras.reduce((snapshotPromise, camera) => __awaiter(this, void 0, void 0, function* () {
                    yield snapshotPromise;
                    return yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                        if (camera)
                            yield window.threekit.configurator.setConfiguration({
                                [attributeName]: { assetId: camera.assetId },
                            });
                        const snapshotStr = yield window.threekit.player.snapshotAsync({
                            size,
                            mimeType: `image/${constants_1.SNAPSHOT_FORMATS[format]}`,
                        });
                        snapshots[camera.name] = snapshotStr;
                        resolve(snapshots);
                    }));
                }), Promise.resolve(snapshots));
            }
        });
        this._product = product;
        this._api = services_1.default;
        this._player = player.enableApi('player');
        this._translations = translations;
        this._currentLanguage = language;
        this._history = [[{}, configurator.getConfiguration()]];
        this._historyPosition = 0;
        this._toolsList = toolsList || new Set([]);
        this._savedConfiguration = '';
        this._config = config;
        this._settings = settings;
        this._attributeGrouping = (_a = Object.entries(attributeGrouping || {})) === null || _a === void 0 ? void 0 : _a.reduce((output, [groupName, attrs]) => Object.assign(output, {
            [groupName]: attrs === null || attrs === void 0 ? void 0 : attrs.map((el) => el === null || el === void 0 ? void 0 : el.trim()),
        }), {});
        this._codeData = Object.entries(configurator.getMetadata()).reduce((output, [key, value]) => {
            var _a, _b;
            if (!key.includes('.code') &&
                !key.includes('.type') &&
                !key.includes(`.${constants_1.METADATA_RESERVED.valueSku}`) &&
                !key.includes(`.${constants_1.METADATA_RESERVED.valueCode}`))
                return output;
            const [attrName, dataKey, stringKey] = key.split('.');
            if (dataKey === constants_1.METADATA_RESERVED.valueCode) {
                const val = { [stringKey]: value };
                if (output[attrName]) {
                    output[attrName].codeValues = Object.assign({}, (_a = output[attrName]) === null || _a === void 0 ? void 0 : _a.codeValues, val);
                }
                else
                    output[attrName] = { codeValues: val };
            }
            else if (dataKey === constants_1.METADATA_RESERVED.valueSku) {
                const val = { [stringKey]: value };
                if (output[attrName]) {
                    output[attrName].skuValues = Object.assign({}, (_b = output[attrName]) === null || _b === void 0 ? void 0 : _b.skuValues, val);
                }
                else
                    output[attrName] = { skuValues: val };
            }
            else {
                if (output[attrName])
                    output[attrName][dataKey] = value;
                else
                    output[attrName] = { [dataKey]: value };
            }
            return output;
        }, {});
    }
    static createPlayerLoaderEl() {
        let playerElement = document.getElementById('player-root');
        if (playerElement)
            return playerElement;
        playerElement = document.createElement('div');
        playerElement.setAttribute('id', 'player-root');
        playerElement.style.height = '100%';
        const playerLoader = document.createElement('div');
        playerLoader.appendChild(playerElement);
        playerLoader.style.opacity = '0';
        playerLoader.style.position = 'fixed';
        playerLoader.style.top = '-110%';
        playerLoader.style.height = '1px';
        document.body.appendChild(playerLoader);
        return playerElement;
    }
    static createThreekitScriptEl(threekitEnv, scriptPath) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            if (scriptPath) {
                script.src = `${threekitEnv}${scriptPath}`;
            }
            else {
                script.src = `${threekitEnv}/app/js/threekit-player-bundle.js`;
            }
            script.id = 'threekit-player-bundle';
            script.onload = () => resolve();
            document.head.appendChild(script);
        });
    }
    static initThreekit(config) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const updatedConfig = Object.assign({}, config);
            console.time('player 2D');
            const player = yield window.threekitPlayer(updatedConfig);
            window.player = player;
            const configurator = yield player.getConfigurator();
            yield (0, dataDrivenFn_1.waitForDataDrivenExtensionConfigurator)();
            yield ((_a = window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus());
            const productAttributes = yield (configurator === null || configurator === void 0 ? void 0 : configurator.getDisplayAttributes());
            const isProduct3D = productAttributes.find((el) => { var _a; return (_a = el.values) === null || _a === void 0 ? void 0 : _a.find((attr) => { var _a; return ((_a = attr.metadata) === null || _a === void 0 ? void 0 : _a.isPlayer3D) === 'true'; }); }) !== undefined;
            const player3DPromise = isProduct3D
                ? new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    const player3D = yield window.threekitPlayer({
                        orgId: updatedConfig.orgId,
                        authToken: updatedConfig.authToken,
                        showLoadingThumbnail: false,
                        showLoadingProgress: false,
                        showAR: false,
                        el: updatedConfig.el3D,
                        assetId: 'baa61e2d-511d-4f9f-a7d1-0e53e5026258',
                        display: 'webgl',
                        tools: [],
                    });
                    window.playerMonogram = player3D;
                    const playerMonogramDiv = document.getElementById('player-3d');
                    if (playerMonogramDiv) {
                        playerMonogramDiv.style.width = '100%';
                        playerMonogramDiv.style.height = '0px';
                        playerMonogramDiv.style.display = 'block';
                    }
                    window.configuratorMonogram = yield player3D.getConfigurator();
                    let player = document.getElementById('player-3d');
                    const playerWrapper = document.getElementById(constants_1.TK_PLAYER_DIV_ID_3D);
                    playerWrapper === null || playerWrapper === void 0 ? void 0 : playerWrapper.appendChild(player);
                    resolve(player3D);
                }))
                : null;
            if (player3DPromise) {
                player3DPromise.then((player3D) => {
                    configurator.prefetchAttributes(['Rotate Model']);
                });
            }
            else {
                configurator.prefetchAttributes(['Rotate Model']);
            }
            resolve({ player, configurator, player3DPromise });
        }));
    }
    static attachPlayerToComponent(moveToElementId) {
        const addPlayer = (tryCount = 0) => {
            if (tryCount >= 10)
                return;
            let player = document.getElementById('player-root');
            const playerWrapper = document.getElementById(moveToElementId);
            if (!player || !playerWrapper)
                return setTimeout(() => {
                    addPlayer(tryCount + 1);
                }, 0.05 * 1000);
            if (!player)
                throw new Error('Initial Player element not found');
            if (!playerWrapper)
                throw new Error('Move To element not found');
            playerWrapper === null || playerWrapper === void 0 ? void 0 : playerWrapper.appendChild(player);
        };
        addPlayer();
    }
    static getConfiguration(configurationId) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            if (!configurationId) {
                if (!window.threekit)
                    return resolve(null);
                resolve(window.threekit.controller._player.getFullConfiguration());
            }
            const config = yield services_1.default.configurations.getSavedConfiguration(configurationId);
            if (!config)
                throw new Error('No config find for this Recipe Id');
            resolve(config);
        }));
    }
    static launch(config) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (window.threekit)
                    resolve();
                const { authToken, orgId, elementId, cache, stageId, showConfigurator, initialConfiguration: initialConfigurationRaw, showLoadingThumbnail, showLoadingProgress, onLoadingProgress, showAR, showShare, locale, allowMobileVerticalOrbit, publishStage, threekitEnv: threekitEnvRaw, serverUrl, useProxy, additionalTools, attrGroupingTableId, scriptPath, threekitProductEnv, authProductToken, isChina, compression, productInfos, } = Object.assign(constants_1.DEFAULT_PLAYER_CONFIG, config);
                let el = document.getElementById(elementId);
                if (!el)
                    el = this.createPlayerLoaderEl();
                let el3D = document.getElementById('player-3d');
                if (!el3D)
                    el3D = this.createPlayer3D();
                // const params = getParams();
                // const sku = params?.sku;
                // let productId;
                // if (sku) {
                //   productId = await threekitAPI.configurations.getProductIdBySku(sku);
                //   console.log(productId)
                // }
                let connectionConfig = {
                    authToken,
                    orgId,
                    threekitEnv: threekitEnvRaw,
                    serverUrl,
                    useProxy,
                    threekitProductEnv,
                    authProductToken,
                    assetId: productInfos === null || productInfos === void 0 ? void 0 : productInfos.id,
                };
                connection_1.default.connect(connectionConfig);
                const scriptPromise = this.createThreekitScriptEl(threekitEnvRaw, scriptPath);
                let initialConfiguration = Object.assign({}, initialConfigurationRaw);
                let attrGroupingTableIdPrepped = attrGroupingTableId;
                const { threekitEnv } = connection_1.default.getConnection();
                const product = productInfos;
                yield scriptPromise;
                // await this.createThreekitScriptEl(threekitEnv, scriptPath);
                const [{ player, configurator, player3DPromise }, attributeGrouping] = yield Promise.all([
                    this.initThreekit({
                        el,
                        el3D,
                        authToken,
                        orgId,
                        cache,
                        stageId,
                        assetId: productInfos === null || productInfos === void 0 ? void 0 : productInfos.id,
                        threekitEnv,
                        showConfigurator,
                        initialConfiguration,
                        showLoadingThumbnail,
                        showLoadingProgress,
                        onLoadingProgress,
                        showAR,
                        showShare,
                        locale,
                        allowMobileVerticalOrbit,
                        publishStage,
                        isChina,
                        compression,
                    }),
                    // threekitAPI.products.fetchTranslations(),
                    services_1.default.configurations.getAttributeGrouping({
                        id: attrGroupingTableIdPrepped,
                    }),
                ]);
                let toolsList = new Set([]);
                if (additionalTools === null || additionalTools === void 0 ? void 0 : additionalTools.length) {
                    additionalTools.flat().forEach((toolFunc) => {
                        const tool = toolFunc(player);
                        if (toolsList.has(tool.key))
                            return;
                        toolsList.add(tool.key);
                        player.tools.addTool(tool);
                    });
                }
                window.threekit = {
                    player,
                    player3DPromise,
                    configurator,
                    controller: new Controller({
                        product,
                        api: services_1.default,
                        player,
                        configurator,
                        translations: {},
                        language: locale,
                        toolsList,
                        attributeGrouping,
                        config: {
                            initialConfiguration,
                        },
                        settings: config,
                    }),
                };
                resolve();
            }));
        });
    }
    _prepThumbnails(attr) {
        if (attr.type.toLowerCase() !== 'asset')
            return attr;
        const { useProxy, threekitEnv } = connection_1.default.getConnection();
        const attribute = Object.assign({}, attr);
        attribute.values = attribute.values.map((el) => {
            const prepped = Object.assign({}, el);
            if (prepped.metadata._thumbnail) {
                prepped.metadata._thumbnail = `${threekitEnv}/api/images/webp/200x0/${useProxy
                    ? `${prepped.metadata._thumbnail.replace('https://preview.threekit.com', threekitEnv)}?cacheScope=123&cacheMaxAge=31536000`
                    : prepped.metadata._thumbnail}`;
            }
            return prepped;
        });
        return attribute;
    }
    static createPlayer3D() {
        let playerElement3D = document.createElement('div');
        playerElement3D.setAttribute('id', 'player-3d');
        playerElement3D.style.display = 'none';
        playerElement3D.style.height = '100%';
        playerElement3D.style.width = '100%';
        document.body.appendChild(playerElement3D);
        return playerElement3D;
    }
    _translateValidAttributes(data) {
        return data.map((attr) => {
            var _a, _b;
            const translatedName = ((_b = (_a = this._translations) === null || _a === void 0 ? void 0 : _a[attr.name]) === null || _b === void 0 ? void 0 : _b[this._currentLanguage]) || attr.name;
            return Object.assign(Object.assign({}, attr), { name: translatedName });
        });
    }
    _translateAttribute(attr) {
        var _a, _b;
        return Object.assign(Object.assign({}, attr), { label: ((_b = (_a = this._translations) === null || _a === void 0 ? void 0 : _a[attr.name]) === null || _b === void 0 ? void 0 : _b[this._currentLanguage]) || attr.name, values: !Array.isArray(attr.values)
                ? attr.values
                : attr.values.map((el) => {
                    var _a, _b, _c, _d;
                    return Object.assign({}, el, {
                        label: ((_b = (_a = this._translations) === null || _a === void 0 ? void 0 : _a[attr.type === constants_1.ATTRIBUTE_TYPES.string ? el.label : el.name]) === null || _b === void 0 ? void 0 : _b[this._currentLanguage]) ||
                            (attr.type === constants_1.ATTRIBUTE_TYPES.string ? el.label : el.name),
                        name: ((_d = (_c = this._translations) === null || _c === void 0 ? void 0 : _c[attr.type === constants_1.ATTRIBUTE_TYPES.string ? el.label : el.name]) === null || _d === void 0 ? void 0 : _d[this._currentLanguage]) ||
                            (attr.type === constants_1.ATTRIBUTE_TYPES.string ? el.label : el.name),
                    });
                }) });
    }
    _getAttributeValues(config) {
        const attributes = window.threekit.configurator.getDisplayAttributes(config);
        return attributes.reduce((output, attr) => {
            var _a;
            const valueData = (_a = attr.values) === null || _a === void 0 ? void 0 : _a.find((el) => {
                if (attr.type === constants_1.ATTRIBUTE_TYPES.asset)
                    return el.assetId === attr.value.assetId;
                else
                    return el.value === attr.value;
            });
            if (!valueData)
                return output;
            return Object.assign(output, {
                [attr.name]: Object.assign({}, attr.type === constants_1.ATTRIBUTE_TYPES.asset ? attr.value : undefined, valueData),
            });
        }, {});
    }
    _compareAttributes(attributes1, attributes2) {
        let updatedAttributes = new Set([]);
        const attributesObj1 = attributes1.reduce((output, el) => Object.assign(output, { [el.name]: el }), {});
        const attributesObj2 = attributes2.reduce((output, el) => Object.assign(output, { [el.name]: el }), {});
        const attrKeys1 = Object.keys(attributesObj1);
        const attrKeys2 = Object.keys(attributesObj2);
        //  We compare the attributes on in each object
        attrKeys2
            .filter((attribute) => attrKeys1.indexOf(attribute) === -1)
            .forEach((attribute) => updatedAttributes === null || updatedAttributes === void 0 ? void 0 : updatedAttributes.add(attribute));
        attrKeys1
            .filter((attribute) => attrKeys2.indexOf(attribute) === -1)
            .forEach((attribute) => updatedAttributes.add(attribute));
        for (let key of attrKeys1) {
            const attr1 = attributesObj1[key];
            const attr2 = attributesObj2[key];
            if (!attr1 || !attr2)
                continue;
            if (!(0, functions_1.shallowCompare)(attr1.value, attr2.value)) {
                updatedAttributes.add(key);
                continue;
            }
            if (!(0, functions_1.deepCompare)(attr1.values, attr2.values)) {
                updatedAttributes.add(key);
                continue;
            }
        }
        return Array.from(updatedAttributes);
    }
    _updateConfiguration(configuration) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const currentState = JSON.parse(JSON.stringify(window.threekit.configurator.getDisplayAttributes()));
            yield window.threekit.configurator.setConfiguration(configuration);
            const updatedState = window.threekit.configurator.getDisplayAttributes();
            const updatedAttrs = this._compareAttributes(currentState, updatedState);
            if (updatedAttrs === null || updatedAttrs === void 0 ? void 0 : updatedAttrs.length)
                this._savedConfiguration = undefined;
            resolve(updatedAttrs);
        }));
    }
    getForm(config) {
        const attributeArr = window.threekit.configurator.getDisplayAttributes(config);
        const attributes = attributeArr.reduce((output, attr) => {
            const prepped = this._prepThumbnails(attr);
            return Object.assign(output, {
                [attr.name]: prepped,
                //[attr.name]: this._translateAttribute(prepped),
            });
        }, {});
        if (!this._attributeGrouping || (config === null || config === void 0 ? void 0 : config.groupAttributes) === false)
            return attributes;
        const formGroupEntries = new Map(Object.entries(this._attributeGrouping));
        const attributeEntries = Object.entries(attributes).filter((el) => el[0] !== 'CameraAngle');
        const form = new Map();
        attributeEntries.forEach(([attrName, attrData]) => {
            for (let [groupName, groupAttributes] of formGroupEntries) {
                if (Array.isArray(groupAttributes) &&
                    groupAttributes.includes(attrName)) {
                    const preppedAttr = (0, attributeFn_1.prepAttributeForComponent)(attrData, {}, 'form');
                    if (form.has(groupName)) {
                        form.get(groupName)[attrName] = preppedAttr;
                    }
                    else {
                        form.set(groupName, { [attrName]: preppedAttr });
                    }
                    break;
                }
            }
        });
        return Object.fromEntries(form);
    }
    getProduct() {
        if (!window.threekit)
            return undefined;
        return window.threekit.controller._product;
    }
    getAttributeGrouping() {
        if (!window.threekit)
            return undefined;
        return window.threekit.controller._attributeGrouping;
    }
    getConfig() {
        if (!window.threekit)
            return undefined;
        return window.threekit.controller._config;
    }
    addTool(tools) {
        if (!tools)
            return;
        const toolsToAdd = Array.isArray(tools) ? tools : [tools];
        toolsToAdd.flat().forEach((toolFunc) => {
            const tool = toolFunc(window.threekit.player);
            if (this._toolsList.has(tool.key))
                return console.log(`The tool '${tool.label} has already been added.'`);
            this._toolsList.add(tool.key);
            window.threekit.player.tools.addTool(tool);
            window.threekit.player.tools.removeTool('pan');
        });
    }
    setLanguage(language) {
        if (!language)
            return;
        this._currentLanguage = language;
        return this.getAttributes();
    }
    getLanguage() {
        return this._currentLanguage;
    }
    getLanguageOptions() {
        return Object.keys(Object.values(this._translations)[0]);
    }
    getAttributes(attrNames) {
        const attributes = window.threekit.configurator
            .getDisplayAttributes()
            .filter((el) => el.name !== 'CameraAngle');
        const attributesObj = (attrNames === null || attrNames === void 0 ? void 0 : attrNames.reduce((output, el) => Object.assign(output, { [el]: undefined }), {})) || {};
        return attributes.reduce((output, attr) => {
            if (attrNames && !attrNames.includes(attr.name))
                return output;
            return Object.assign(output, {
                [attr.name]: attr,
                //[attr.name]: this._translateAttribute(attr),
            });
        }, attributesObj);
    }
    setAttributes(configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedAttrNames = yield this._updateConfiguration(configuration);
            if (!updatedAttrNames.length)
                return {};
            return this.getAttributes();
        });
    }
    getSku(config) {
        const configuration = window.threekit.configurator.getConfiguration();
        if (configuration[constants_1.SKU_ATTRIBUTE_NAME])
            return [configuration[constants_1.SKU_ATTRIBUTE_NAME]];
        const attributeSelections = this._getAttributeValues(config);
        return Object.entries(attributeSelections).reduce((output, [attrName, attrVal]) => {
            var _a, _b, _c, _d;
            let value;
            if (((_a = this._codeData[attrName]) === null || _a === void 0 ? void 0 : _a.type.toLowerCase()) === 'string')
                value = ((_b = this._codeData[attrName].skuValues) === null || _b === void 0 ? void 0 : _b[attrVal.value]) || '';
            else if ((_d = (_c = attrVal.metadata) === null || _c === void 0 ? void 0 : _c[constants_1.METADATA_RESERVED.sku]) === null || _d === void 0 ? void 0 : _d.length)
                value = attrVal.metadata[constants_1.METADATA_RESERVED.sku];
            if (value === null || value === void 0 ? void 0 : value.length)
                return [...output, value];
            return output;
        }, []);
    }
    getReadableConfiguration(config) {
        const attributesArr = window.threekit.configurator.getDisplayAttributes(config);
        return attributesArr
            .filter(attributesHelperFn_1.assetsRules)
            .reduce((output, attr) => {
            var _a, _b;
            let value;
            if (attr.values) {
                value = attr.values.find((el) => {
                    if (attr.type.toLowerCase() === 'asset')
                        return el.assetId === attr.value.assetId;
                    else
                        return el.value === attr.value;
                });
            }
            if (attr.value && attr.type === 'String' && attr.values.length === 0) {
                value = attr.value;
            }
            return Object.assign(output, {
                [attr.name]: {
                    value: (value === null || value === void 0 ? void 0 : value.name) || (value === null || value === void 0 ? void 0 : value.label) || (value && value),
                    thumbnail: ((_a = value === null || value === void 0 ? void 0 : value.metadata) === null || _a === void 0 ? void 0 : _a.thumbnailPath) ||
                        ((_b = value === null || value === void 0 ? void 0 : value.metadata) === null || _b === void 0 ? void 0 : _b.thumbnail) ||
                        undefined,
                },
            });
        }, {});
    }
    getOutputs(config) {
        const preppedConfig = Object.assign({
            sku: { includeHidden: false },
            industrialCode: { includeHidden: true },
            readableConfiguration: { includeHidden: true },
        }, config);
        const sku = this.getSku(preppedConfig.sku);
        const readableConfiguration = this.getReadableConfiguration(preppedConfig.readableConfiguration);
        const threekitConfiguration = window.threekit.configurator.getConfiguration();
        //   function encodeToUnicodeEscape(input) {
        //     return input.replace(/[\s\S]/g, function (char) {
        //         if (char === ' ') {
        //             return '\\u0020';
        //         } else {
        //             const charCode = char.charCodeAt(0);
        //             return '\\u' + charCode.toString(16).padStart(4, '0');
        //         }
        //     });
        // }
        // if (readableConfiguration) {
        //     readableConfiguration.EngravingText.value = encodeToUnicodeEscape(
        //         readableConfiguration.EngravingText?.value
        //     );
        // }
        return {
            sku,
            readableConfiguration,
            threekitConfiguration,
        };
    }
    saveConfiguration({ priceWithCurrency, productName, }) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const attachments = yield this.takeSnapshots();
            let configuration = window.threekit.configurator.getConfiguration();
            let preppedConfiguration = configuration;
            let metadataPrepped = Object.assign({}, this.getOutputs(), {
                price: priceWithCurrency,
                productName: productName,
            });
            if (!preppedConfiguration) {
                preppedConfiguration = window.threekit.configurator.getConfiguration();
                preppedConfiguration = Object.entries(preppedConfiguration).reduce((output, [attrName, attrData]) => attrName.startsWith('_')
                    ? output
                    : Object.assign(output, { [attrName]: attrData }), {});
            }
            const [response, error] = yield services_1.default.configurations.save({
                assetId: window.threekit.player.assetId,
                configuration: preppedConfiguration,
                metadata: metadataPrepped,
                attachments,
            });
            if (error)
                resolve(undefined);
            const params = Object.assign((0, navigationParams_1.getParams)(), {
                [constants_1.TK_SAVED_CONFIG_PARAM_KEY]: response === null || response === void 0 ? void 0 : response.shortId,
            });
            const url = window.location.href.replace(window.location.search, '');
            const output = Object.assign(Object.assign({}, response), { resumableUrl: `${url}${(0, objectToQueryString_1.objectToQueryStr)(params)}`, thumbnailUrls: Object.values(response === null || response === void 0 ? void 0 : response.attachments) });
            this._savedConfiguration = JSON.stringify(output);
            resolve(output);
        }));
    }
    resumeConfiguration(configurationId) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            try {
                const config = yield Controller.getConfiguration(configurationId);
                this.setAttributes((config === null || config === void 0 ? void 0 : config.variant) || (config === null || config === void 0 ? void 0 : config.configuration) || config);
                resolve(config);
            }
            catch (e) {
                throw new Error(e);
            }
        }));
    }
}
exports.default = Controller;
