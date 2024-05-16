"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const useNotOrderable_1 = __importDefault(require("../../../hooks/useNotOrderable"));
const globalSettingsSlicer_1 = require("../../../store/globalSettingsSlicer");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const validationSlicer_1 = require("../../../store/validationSlicer");
const constants_1 = require("../../../utils/constants");
const AttributesGroups_1 = __importDefault(require("../AttributesGroups"));
const OptionsButton_1 = __importDefault(require("../OptionsButton"));
const Carousel_styles_1 = require("./Carousel.styles");
const ShowPopUp_1 = require("../../PopUp/ShowPopUp");
const PopUpType_1 = require("../../PopUp/PopUpType");
const threekitHooks_1 = require("../../../utils/threekitHooks");
const navigationParams_1 = require("../../../utils/function/navigationParams");
const logicalFn_1 = require("../../../utils/function/logicalFn");
const functions_1 = require("../../../utils/function/functions");
const Carousel = () => {
    var _a, _b;
    const { isMobile } = (0, threekitHooks_1.useWindowSize)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const carousel = (0, react_1.useRef)(null);
    const [clicked, setClicked] = (0, react_1.useState)(false);
    //@ts-ignore
    const currentStep = (0, react_redux_1.useSelector)(globalSettingsSlicer_1.getStep);
    const isChina = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsChina);
    const formRequiredAndCheckedFields = (0, react_redux_1.useSelector)(validationSlicer_1.getFormRequiredAndChecked);
    const formWarningMessages = (0, react_redux_1.useSelector)(validationSlicer_1.getFormWarningMessages);
    const form = (0, react_redux_1.useSelector)(threekitSlicer_1.getForm) || {};
    const { isNotOrderable, notOrderableError } = (0, useNotOrderable_1.default)();
    const dataDrivenSku = (_b = (_a = window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus().sku) === null || _b === void 0 ? void 0 : _b.value;
    const totalSteps = (0, react_redux_1.useSelector)(threekitSlicer_1.getTotalSteps);
    const isLastStep = (0, react_1.useMemo)(() => currentStep === totalSteps - 1, [currentStep, totalSteps]);
    const isRtl = (0, react_1.useMemo)(() => (0, functions_1.isRightToLeft)(), []);
    const [isDisabled, setIsDisabled] = (0, react_1.useState)(false);
    const previousDisabled = (0, react_1.useMemo)(() => currentStep === 0, [currentStep]);
    const disabledParameters = (0, react_1.useMemo)(() => {
        return {
            form,
            formRequiredAndCheckedFields,
            currentStep,
            isCarousel: true,
        };
    }, [form, formRequiredAndCheckedFields, currentStep]);
    const handleNextStep = (0, react_1.useCallback)(() => {
        if (currentStep < totalSteps - 1) {
            dispatch((0, globalSettingsSlicer_1.setStep)(currentStep + 1));
        }
    }, [currentStep, totalSteps, dispatch]);
    const handlePreviousStep = (0, react_1.useCallback)(() => {
        if (currentStep > 0) {
            dispatch((0, globalSettingsSlicer_1.setStep)(currentStep - 1));
        }
    }, [currentStep, dispatch]);
    (0, react_1.useEffect)(() => {
        const params = (0, navigationParams_1.getParams)();
        params.step = currentStep;
        const finalParams = (0, navigationParams_1.paramsObjectToNavigationString)(params, isChina);
        navigate(`/${finalParams}`);
        setClicked(false);
    }, [currentStep, navigate, isChina]);
    const validateAndNavigate = (0, react_1.useCallback)((buttonDirection) => {
        const newDisabledState = (0, logicalFn_1.shouldDisableButton)(disabledParameters);
        if (newDisabledState) {
            setClicked(true);
            if (formWarningMessages) {
                const lines = Object.values(formWarningMessages);
                console.info({ lines });
                lines === null || lines === void 0 ? void 0 : lines.map((line) => (0, ShowPopUp_1.showPopUp)({
                    popUpType: PopUpType_1.popUpTypes.missingFieldError,
                    message: line,
                    functionOnClose: () => setClicked(false),
                    isMobile,
                }));
            }
        }
        else {
            if (buttonDirection === 'previous') {
                handlePreviousStep();
            }
            else if (buttonDirection === 'next') {
                handleNextStep();
            }
        }
        setIsDisabled(newDisabledState);
    }, [
        disabledParameters,
        handleNextStep,
        handlePreviousStep,
        isMobile,
        formWarningMessages,
    ]);
    (0, react_1.useEffect)(() => {
        setClicked(false);
    }, [dataDrivenSku]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(Carousel_styles_1.CarouselContainer, { className: constants_1.CAROUSSEL_CLASSNAME, ref: carousel, children: [(0, jsx_runtime_1.jsx)(Carousel_styles_1.Slide, { children: (0, jsx_runtime_1.jsx)(AttributesGroups_1.default, {}) }), (0, jsx_runtime_1.jsxs)(Carousel_styles_1.ButtonContainer, { children: [(0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.SURPRISE_ME_BUTTON_LABEL }), (0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.DONE_BUTTON_LABEL, notOrderable: isNotOrderable, notOrderableMessage: notOrderableError })] })] }) }));
};
exports.default = Carousel;
