"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const globalSettingsSlicer_1 = require("../../../store/globalSettingsSlicer");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const AttributesGroups_1 = __importDefault(require("../AttributesGroups"));
const Accordion_styles_1 = require("./Accordion.styles");
const useNotOrderable_1 = __importDefault(require("../../../hooks/useNotOrderable"));
const validationSlicer_1 = require("../../../store/validationSlicer");
const constants_1 = require("../../../utils/constants");
const OptionsButton_1 = __importDefault(require("../OptionsButton"));
const navigationParams_1 = require("../../../utils/function/navigationParams");
const logicalFn_1 = require("../../../utils/function/logicalFn");
const Accordion = () => {
    const [isDisabled, setIsDisabled] = (0, react_1.useState)(true);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const currentStep = parseInt((0, react_redux_1.useSelector)(globalSettingsSlicer_1.getStep).toString());
    const isChina = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsChina);
    const form = (0, react_redux_1.useSelector)(threekitSlicer_1.getForm);
    const formRequiredAndCheckedFields = (0, react_redux_1.useSelector)(validationSlicer_1.getFormRequiredAndChecked);
    const { isNotOrderable, notOrderableError } = (0, useNotOrderable_1.default)();
    (0, react_1.useEffect)(() => {
        const newDisabledState = (0, logicalFn_1.shouldDisableButton)({
            form,
            formRequiredAndCheckedFields,
            currentStep,
            isCarousel: false,
        }) || isNotOrderable;
        setIsDisabled(newDisabledState);
    }, [form, formRequiredAndCheckedFields, currentStep, isNotOrderable]);
    (0, react_1.useEffect)(() => {
        const params = (0, navigationParams_1.getParams)();
        params.step = currentStep;
        const finalParams = (0, navigationParams_1.paramsObjectToNavigationString)(params, isChina);
        navigate(`/${finalParams}`);
    }, [currentStep, navigate, isChina]);
    return ((0, jsx_runtime_1.jsxs)(Accordion_styles_1.AccordionContainer, { children: [(0, jsx_runtime_1.jsx)(AttributesGroups_1.default, {}), (0, jsx_runtime_1.jsxs)(Accordion_styles_1.FinishButtonContainer, { children: [(0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.SURPRISE_ME_BUTTON_LABEL }), (0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.DONE_BUTTON_LABEL, disable: isDisabled, notOrderable: isNotOrderable, notOrderableMessage: notOrderableError })] })] }));
};
exports.default = Accordion;
