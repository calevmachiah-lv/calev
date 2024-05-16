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
exports.setLanguage = exports.settingsReducers = void 0;
const react_redux_1 = require("react-redux");
exports.settingsReducers = {
    setThreekitLoaded: (state, action) => {
        state.settings.isThreekitLoaded = action.payload;
    },
    setPlayerLoading: (state, action) => {
        state.settings.isPlayerLoading = action.payload;
    },
    setLanguageState: (state, action) => {
        state.settings.language = action.payload;
    },
    setIsChina: (state, action) => {
        state.settings.isChina = action.payload;
    },
    setPlayerSize: (state, action) => {
        state.settings.playerSize = action.payload;
    },
    setNotInStockUnselected: (state, action) => {
        state.settings.notInStockUnselected = action.payload;
    },
};
const setLanguage = (language) => (dispatch = (0, react_redux_1.useDispatch)()) => __awaiter(void 0, void 0, void 0, function* () {
    if (!language)
        return;
    const payloadAction = {
        type: 'settings/setLanguageState',
        payload: language,
    };
    dispatch(payloadAction);
});
exports.setLanguage = setLanguage;
