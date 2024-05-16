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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Router_1 = __importDefault(require("./router/Router"));
const react_redux_1 = require("react-redux");
const styled_components_1 = require("styled-components");
const useWindowSize_1 = __importDefault(require("./utils/threekitHooks/useWindowSize"));
const threekitSlicer_1 = require("./store/threekitSlicer");
const useParams_1 = __importDefault(require("./hooks/useParams"));
const components_1 = require("./components");
const globalSettingsSlicer_1 = require("./store/globalSettingsSlicer");
const navigationParams_1 = require("./utils/function/navigationParams");
const functions_1 = require("./utils/function/functions");
const dataDrivenFn_1 = require("./utils/function/dataDrivenFn");
const App = () => {
    const { isIpad, isDesktop, isMobile } = (0, useWindowSize_1.default)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const params = (0, navigationParams_1.getParams)();
    const { sku, appName = 'catalogios' } = params || {};
    window.dataDrivenConfiguratorInitialSku = sku;
    const memoizedAppName = (0, react_1.useMemo)(() => appName.toLowerCase(), [appName]);
    const { newParams: config, isChina, isLoading, error } = (0, useParams_1.default)();
    const [isDataDrivenReady, setIsDataDrivenReady] = (0, react_1.useState)(false);
    const dataDrivenReady = () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, dataDrivenFn_1.waitForDataDrivenExtensionConfigurator)(); });
    (0, react_1.useEffect)(() => {
        dataDrivenReady();
        setIsDataDrivenReady(true);
    }, []);
    (0, react_1.useEffect)(() => {
        if (!isDataDrivenReady || isLoading || error)
            return;
        dispatch((0, threekitSlicer_1.setIsChina)(isChina));
        dispatch((0, globalSettingsSlicer_1.setGlobalSettingsParams)(params));
        dispatch((0, threekitSlicer_1.launch)(config));
    }, [dispatch, isDataDrivenReady, config, isChina, isLoading, error]);
    (0, react_1.useEffect)(() => {
        const isRtl = (0, functions_1.isRightToLeft)();
        const dir = isRtl ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
    }, [params.lng]);
    const theme = {
        device: { isIpad, isDesktop, isMobile },
        appName: memoizedAppName,
    };
    if (error) {
        return ((0, jsx_runtime_1.jsx)(styled_components_1.ThemeProvider, { theme: theme, children: (0, jsx_runtime_1.jsx)("div", { style: { margin: '20px' }, children: error }) }));
    }
    if (isLoading || !isDataDrivenReady) {
        return ((0, jsx_runtime_1.jsx)(styled_components_1.ThemeProvider, { theme: theme, children: (0, jsx_runtime_1.jsx)(components_1.AwaitPlayerLoad, {}) }));
    }
    return ((0, jsx_runtime_1.jsx)(styled_components_1.ThemeProvider, { theme: theme, children: (0, jsx_runtime_1.jsx)(components_1.AwaitPlayerLoad, { children: (0, jsx_runtime_1.jsx)(Router_1.default, {}) }) }));
};
exports.default = App;
