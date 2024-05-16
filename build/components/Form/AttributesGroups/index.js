"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const i18next_1 = require("i18next");
const Attributes_1 = __importDefault(require("./Attributes"));
const attributesGroups_styled_1 = require("./attributesGroups.styled");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const react_redux_1 = require("react-redux");
const selectors_1 = require("../../../store/globalSettingsSlicer/selectors");
const hooks_1 = require("../../../hooks");
const GroupHeading_1 = __importDefault(require("./GroupHeading"));
const threekitHooks_1 = require("../../../utils/threekitHooks");
const globalSettingsSlicer_1 = require("../../../store/globalSettingsSlicer");
const constants_1 = require("../../../utils/constants");
const validationSlicer_1 = require("../../../store/validationSlicer");
function AttributesGroups() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isMobile } = (0, threekitHooks_1.useWindowSize)();
    const form = (0, react_redux_1.useSelector)(threekitSlicer_1.getForm);
    const lastStepNumber = (0, react_1.useMemo)(() => (!form ? 0 : Object.keys(form).length - 1), [form]);
    const currentStep = (0, react_redux_1.useSelector)(selectors_1.getStep);
    const [fakeCurrentStep, setFakeCurrentStep] = (0, react_1.useState)(currentStep);
    const [lastStep, setLastStep] = (0, react_1.useState)(currentStep);
    const formValidAttributes = (0, react_redux_1.useSelector)(threekitSlicer_1.getFormValidAttributes);
    const totalSteps = (0, react_redux_1.useSelector)(threekitSlicer_1.getTotalSteps);
    const formRequiredAndCheckedFields = (0, react_redux_1.useSelector)(validationSlicer_1.getFormRequiredAndChecked);
    (0, react_1.useEffect)(() => {
        if (currentStep !== fakeCurrentStep) {
            setLastStep(fakeCurrentStep);
            setFakeCurrentStep(currentStep);
        }
    }, [currentStep]);
    (0, react_1.useEffect)(() => {
        if (currentStep > lastStepNumber) {
            dispatch((0, globalSettingsSlicer_1.setStep)(lastStepNumber));
        }
    }, []);
    const title = (0, react_1.useMemo)(() => Object.keys(formValidAttributes)[currentStep], [formValidAttributes, currentStep]);
    const allTitles = (0, react_1.useMemo)(() => Object.keys(formValidAttributes), [formValidAttributes]);
    // NOTE: Build warning messages for every empty required field.
    const buildWarningMessages = (0, react_1.useCallback)((formRequiredAndCheckedFields) => {
        const entries = Object.entries(formRequiredAndCheckedFields);
        if (entries.length > 0) {
            let messages = {};
            entries.forEach((el) => {
                // Validate required field isEmpty
                if (el[1].length === 0) {
                    messages[el[0]] = (0, i18next_1.t)(el[0], el[0]);
                }
            });
            if (Object.keys(messages).length > 0) {
                dispatch((0, validationSlicer_1.setFormWarningMessages)(Object.assign({}, messages)));
            }
            else {
                dispatch((0, validationSlicer_1.setFormWarningMessages)({}));
            }
        }
        else {
            dispatch((0, validationSlicer_1.setFormWarningMessages)({}));
        }
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        buildWarningMessages(formRequiredAndCheckedFields);
    }, [formRequiredAndCheckedFields, buildWarningMessages]);
    const ProgressBarComponent = (0, hooks_1.useProgressBar)({
        useNumbers: true,
        currentNumber: currentStep + 1,
        totalNumbers: totalSteps,
    });
    const handleGroupClick = (index) => {
        if (!isMobile && currentStep === index) {
            dispatch((0, globalSettingsSlicer_1.setStep)(-1));
        }
        else {
            dispatch((0, globalSettingsSlicer_1.setStep)(index));
        }
    };
    return ((0, jsx_runtime_1.jsx)(attributesGroups_styled_1.GroupsWrapper, { children: Object.values(formValidAttributes).map((attributes, index) => {
            var _a;
            const active = currentStep === index
                ? lastStep < currentStep
                    ? constants_1.NEXT_LABEL
                    : constants_1.PREVIOUS_LABEL
                : null;
            const numOfAttrs = ((_a = Object.keys(attributes)) === null || _a === void 0 ? void 0 : _a.length) || 0;
            return ((0, jsx_runtime_1.jsxs)(attributesGroups_styled_1.GroupWrapper, { isActive: isMobile ? active !== null : true, children: [(0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(GroupHeading_1.default, { title: isMobile
                                    ? (0, i18next_1.t)(title, title)
                                    : (0, i18next_1.t)(allTitles[index], allTitles[index]), isActive: isMobile ? active : currentStep === index, handleClick: () => handleGroupClick(index), groupIndex: index }), isMobile && currentStep === index && ((0, jsx_runtime_1.jsx)(attributesGroups_styled_1.ProgressBarWrapper, { children: ProgressBarComponent }))] }), (0, jsx_runtime_1.jsx)(Attributes_1.default, { isActive: isMobile ? active : currentStep === index, attributes: attributes, numOfAttrs: numOfAttrs })] }, index));
        }) }));
}
exports.default = AttributesGroups;
