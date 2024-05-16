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
exports.updateModelPresentationOnDataDriven = exports.setConfiguration = exports.configurationReducers = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const __1 = require("..");
const functions_1 = require("../../../utils/function/functions");
exports.configurationReducers = {
    setProduct: (state, action) => {
        state.configuration.product = action.payload;
    },
    setInitialConfiguration: (state, action) => {
        state.configuration.initialConfiguration = action.payload;
    },
    setValidAttributes: (state, action) => {
        state.configuration.dataDrivenConfiguratorExtensionStatus.validAttributes =
            action.payload;
    },
    setSku: (state, action) => {
        state.configuration.dataDrivenConfiguratorExtensionStatus.sku =
            action.payload;
    },
    setFormValidAttributes: (state, action) => {
        state.configuration.formValidAttributes = action.payload;
    },
    setName: (state, action) => {
        state.configuration.name = action.payload;
    },
    setActiveAttribute: (state, action) => {
        var _a;
        state.configuration.activeAttribute =
            typeof action.payload === 'string'
                ? action.payload
                : (_a = action.payload) === null || _a === void 0 ? void 0 : _a.name;
    },
    setDependencies: (state, action) => {
        state.configuration.dependencies = action.payload;
    },
    setForm: (state, action) => {
        state.configuration.form = action.payload;
    },
    setGroupedAttributes: (state, action) => {
        state.configuration.groupedAttributes = action.payload;
    },
    setIsInStock: (state, action) => {
        state.configuration.isInStock = action.payload;
    },
    setMetadata(state, action) {
        state.configuration.metadata = action.payload;
    },
    setAttributes(state, action) {
        const newAttributes = Object.assign({}, state.configuration.attributes, action.payload);
        state.configuration.attributes = Object.assign({}, newAttributes);
    },
};
const setDataDrivenFewConfiguration = (attributes) => __awaiter(void 0, void 0, void 0, function* () {
    for (const [key, value] of Object.entries(attributes)) {
        yield window.dataDrivenConfigurator.setConfiguration({
            [key]: value,
        });
    }
});
exports.setConfiguration = (0, toolkit_1.createAsyncThunk)('threekit/setConfiguration', (config, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const preppedConfig = config || {};
    if (Object.keys(preppedConfig).length === 1) {
        yield window.dataDrivenConfigurator.setConfiguration(preppedConfig);
    }
    else {
        yield setDataDrivenFewConfiguration(preppedConfig);
    }
    const updatedAttributes = yield window.threekit.controller.getAttributes();
    const [mergedAttributesWithDataDriven, mergedAttributesWithDataDrivenGrouped,] = (0, functions_1.getMergedAttributesAndGrouped)(updatedAttributes);
    // const groupedAttributes = await groupAttributes(updatedAttributes);
    dispatch((0, __1.setGroupedAttributes)(mergedAttributesWithDataDrivenGrouped));
    dispatch((0, __1.setForm)(window.threekit.controller.getForm(preppedConfig)));
    dispatch((0, __1.setAttributes)(mergedAttributesWithDataDriven));
    // dispatch(setPlayerLoading(false));
}));
const updateModelPresentationOnDataDriven = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { threekit } = getState();
    const currentModelPresentation = (_c = (_b = (_a = threekit === null || threekit === void 0 ? void 0 : threekit.configuration) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b['Model Presentation']) === null || _c === void 0 ? void 0 : _c.value;
    yield window.dataDrivenConfigurator.setConfiguration({
        'Model Presentation': currentModelPresentation,
    });
});
exports.updateModelPresentationOnDataDriven = updateModelPresentationOnDataDriven;
