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
const react_redux_1 = require("react-redux");
require("../../styles/animations.scss");
const threekitHooks_1 = require("../../utils/threekitHooks");
const Home_styles_1 = require("./Home.styles");
const components_1 = require("../../components");
const react_router_1 = require("react-router");
const globalSettingsSlicer_1 = require("../../store/globalSettingsSlicer");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const flowSlicer_1 = require("../../store/flowSlicer");
const constants_1 = require("../../utils/constants");
const hooks_1 = require("../../hooks");
const SummaryPage_1 = __importDefault(require("../SummaryPage/SummaryPage"));
const useSavedConfiguration_1 = __importDefault(require("../../hooks/useSavedConfiguration"));
const usePlayerMode_1 = __importDefault(require("../../hooks/usePlayerMode"));
const navigationParams_1 = require("../../utils/function/navigationParams");
const PortraitForm_1 = __importDefault(require("./components/PortraitForm"));
const LandscapeForm_1 = __importDefault(require("./components/LandscapeForm"));
const Tutorial_1 = __importDefault(require("../../components/Tutorial/Tutorial"));
const mockData_1 = require("../../utils/mockData");
const flowSlicer_2 = require("../../store/flowSlicer");
const useStock_1 = __importDefault(require("../../hooks/useStock"));
const functions_1 = require("../../utils/function/functions");
const Home = () => {
    var _a, _b, _c, _d;
    (0, hooks_1.useThreekitIdConfiguration)();
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, hooks_1.usePageTitle)({ page: 'home' });
    const { isMobile } = (0, threekitHooks_1.useWindowSize)();
    const navigate = (0, react_router_1.useNavigate)();
    const isLoaded = (0, threekitHooks_1.useThreekitInitStatus)();
    const currentStep = (0, react_redux_1.useSelector)(globalSettingsSlicer_1.getStep);
    const globalSettingsParams = (0, react_redux_1.useSelector)(globalSettingsSlicer_1.getGlobalSettingsParams);
    const params = (0, navigationParams_1.getParams)();
    const form = (0, react_redux_1.useSelector)(threekitSlicer_1.getForm);
    const isChina = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsChina);
    const pageToDisplay = (0, react_redux_1.useSelector)(threekitSlicer_1.getPage) === 'home';
    const { configId, sku, [constants_1.TK_SAVED_CONFIG_PARAM_KEY]: threekitId, } = globalSettingsParams || {
        configId: '',
        sku: '',
        threekitId: '',
    };
    const dataDrivenSku = (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus()) === null || _b === void 0 ? void 0 : _b.sku) === null || _c === void 0 ? void 0 : _c.value;
    const { savedConfigurationData } = (0, useSavedConfiguration_1.default)(threekitId);
    const { isRotable } = (0, usePlayerMode_1.default)({
        form,
        currentStep,
    });
    const [isInitialConfigurationSet, setIsInitialConfigutationSet] = (0, react_1.useState)(false);
    const displayTutorial = (0, react_redux_1.useSelector)(flowSlicer_2.getDisplayTutorial);
    (0, react_1.useEffect)(() => {
        if (isChina === undefined)
            return;
        if (!params.step || params.step < constants_1.RESET_STEP_CAROUSEL) {
            const initialStep = isMobile ? constants_1.RESET_STEP_CAROUSEL : constants_1.RESET_STEP_ACCORDION;
            params.step = initialStep;
            dispatch((0, globalSettingsSlicer_1.setStep)(initialStep));
            const finalParams = (0, navigationParams_1.paramsObjectToNavigationString)(params, isChina);
            navigate(`/${finalParams}`);
        }
        else {
            dispatch((0, globalSettingsSlicer_1.setStep)(params.step));
        }
    }, [isChina, dispatch, navigate, isMobile]);
    (0, react_1.useEffect)(() => {
        const newParams = Object.assign(Object.assign({}, globalSettingsParams), { sku: dataDrivenSku });
        if (dataDrivenSku !== sku) {
            dispatch((0, globalSettingsSlicer_1.setGlobalSettingsParams)(newParams));
        }
    }, [dataDrivenSku]);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (((_a = mockData_1.tutorialData === null || mockData_1.tutorialData === void 0 ? void 0 : mockData_1.tutorialData.steps) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            dispatch((0, flowSlicer_1.setTutorialStepsNumber)((_b = mockData_1.tutorialData === null || mockData_1.tutorialData === void 0 ? void 0 : mockData_1.tutorialData.steps) === null || _b === void 0 ? void 0 : _b.length));
        }
    }, [(_d = mockData_1.tutorialData === null || mockData_1.tutorialData === void 0 ? void 0 : mockData_1.tutorialData.steps) === null || _d === void 0 ? void 0 : _d.length]);
    (0, react_1.useEffect)(() => {
        if (isInitialConfigurationSet || !dataDrivenSku)
            return;
        const initiateConfiguration = () => __awaiter(void 0, void 0, void 0, function* () {
            const initialConfig = yield window.threekit.configurator.getFullConfiguration();
            if (initialConfig) {
                dispatch((0, threekitSlicer_1.setInitialConfiguration)(initialConfig));
                setIsInitialConfigutationSet(true);
            }
        });
        initiateConfiguration();
    }, [dataDrivenSku]);
    const attributes = (0, react_redux_1.useSelector)((0, threekitSlicer_1.getAttributes)());
    const allValuesSKUs = (0, react_1.useMemo)(() => Object.values(attributes)
        .map((attribute) => attribute.values.map((value) => !(0, functions_1.isChooseValue)(value) && value.sku ? value.sku : ''))
        .flat()
        .filter((value) => value !== ''), [attributes]);
    const { data: skusInStock, isLoading, isError, error, } = (0, useStock_1.default)({
        skus: allValuesSKUs || [],
    });
    (0, react_1.useEffect)(() => {
        if (skusInStock === null || skusInStock === void 0 ? void 0 : skusInStock.items)
            dispatch((0, threekitSlicer_1.setIsInStock)(skusInStock.items));
    }, [skusInStock, dispatch]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(Home_styles_1.Container, { overscroll: pageToDisplay, id: constants_1.HOME_CONTAINER, children: [pageToDisplay && ((0, jsx_runtime_1.jsxs)(components_1.AwaitPlayerLoad, { children: [(0, jsx_runtime_1.jsx)(components_1.Player2D, { homePage: true, cssDisplay: pageToDisplay && !displayTutorial, isMobile: isMobile, isRotable: isRotable, isLoaded: isLoaded, tutorialData: mockData_1.tutorialData, height: isMobile
                                ? `calc(100vh - ${constants_1.PORTRAIT_FORM_BASE_HEIGHT_IN_PX}px)`
                                : `calc(100vh - ${constants_1.LANDSCAPE_FORM_MAX_HEIGHT_IN_PX}px)`, children: (0, jsx_runtime_1.jsx)(components_1.AnimateItem, {}) }), pageToDisplay &&
                            isLoaded &&
                            (isMobile ? (0, jsx_runtime_1.jsx)(PortraitForm_1.default, {}) : (0, jsx_runtime_1.jsx)(LandscapeForm_1.default, {}))] })), !pageToDisplay && isLoaded && ((0, jsx_runtime_1.jsx)(SummaryPage_1.default, { data: savedConfigurationData })), displayTutorial && isLoaded && ((0, jsx_runtime_1.jsx)(Tutorial_1.default, { tutorialData: mockData_1.tutorialData }))] }) }));
};
exports.default = Home;
