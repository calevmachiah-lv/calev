"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const attributeFn_1 = require("../../utils/function/attributeFn");
const threekitHooks_1 = require("../../utils/threekitHooks");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const validationSlicer_1 = require("../../store/validationSlicer");
function useUpdateFormAndPlayer({ form, currentStep }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [playerMode, setPlayerMode] = (0, react_1.useState)();
    const [isRotable, setIsRotable] = (0, react_1.useState)(true);
    const currentModelPresentation = (0, react_redux_1.useSelector)(threekitSlicer_1.getCurrentModelView);
    const [validAttributes, setValidAttributes] = (0, react_1.useState)();
    const allAttributes = (0, react_redux_1.useSelector)((state) => state.threekit.configuration.attributes);
    const readableConfiguration = (0, react_redux_1.useSelector)((0, threekitSlicer_1.getReadableConfigurationWithAttributeType)());
    const { getIsAttributeValid } = (0, threekitHooks_1.useValidAttributes)();
    const [modelPresentationData, setModelPresentation] = (0, threekitHooks_1.useAttribute)('Model Presentation');
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (!form)
            return;
        // update form valid attributes
        const formValidAttributes = (0, attributeFn_1.updateForm)(form, getIsAttributeValid);
        setValidAttributes(formValidAttributes);
        dispatch((0, threekitSlicer_1.setFormValidAttributes)(formValidAttributes));
        const currentGroup = ((_a = Object.values(formValidAttributes)) === null || _a === void 0 ? void 0 : _a[currentStep]) || { 'MODEL Taille': {} };
        const currentModelPresentationOpen = (0, attributeFn_1.findModelPresentationOpen)(currentGroup);
        if (allAttributes && readableConfiguration) {
            const allAttrArray = (_b = Object.entries(allAttributes)) === null || _b === void 0 ? void 0 : _b.map((el) => Object.values(el)[1]);
            const allAttrArrayRequired = allAttrArray === null || allAttrArray === void 0 ? void 0 : allAttrArray.filter((el) => { var _a; return ((_a = el === null || el === void 0 ? void 0 : el.metadata) === null || _a === void 0 ? void 0 : _a.isRequired) === 'true'; });
            const readableConfigurationNames = Object.values(readableConfiguration).map((el) => el === null || el === void 0 ? void 0 : el.name);
            const currentRequiredAttributesState = {};
            allAttrArrayRequired === null || allAttrArrayRequired === void 0 ? void 0 : allAttrArrayRequired.forEach((el) => {
                const name = el === null || el === void 0 ? void 0 : el.name;
                const value = el === null || el === void 0 ? void 0 : el.value;
                if (readableConfigurationNames.includes(name)) {
                    currentRequiredAttributesState[name] = value;
                }
            });
            dispatch((0, validationSlicer_1.setFormRequiredAndChecked)(currentRequiredAttributesState));
            // update text input fields
            const allAttrArrayTextInput = allAttrArray === null || allAttrArray === void 0 ? void 0 : allAttrArray.filter((el) => { var _a; return ((_a = el === null || el === void 0 ? void 0 : el.metadata) === null || _a === void 0 ? void 0 : _a.frontComponent) === 'TextInput'; });
            const currentTextInputAttributesState = {};
            allAttrArrayTextInput === null || allAttrArrayTextInput === void 0 ? void 0 : allAttrArrayTextInput.forEach((el) => {
                const name = el === null || el === void 0 ? void 0 : el.name;
                const value = el === null || el === void 0 ? void 0 : el.value;
                if (readableConfigurationNames.includes(name)) {
                    currentTextInputAttributesState[name] = value;
                }
            });
            dispatch((0, validationSlicer_1.setInitialFormTextInputFields)(currentTextInputAttributesState));
        }
    }, [form, currentModelPresentation]);
    (0, react_1.useEffect)(() => {
        var _a;
        try {
            if (!form)
                return;
            const formValidAttributes = (0, attributeFn_1.updateForm)(form, getIsAttributeValid);
            setValidAttributes(formValidAttributes);
            dispatch((0, threekitSlicer_1.setFormValidAttributes)(formValidAttributes));
            const currentGroup = ((_a = Object.values(formValidAttributes)) === null || _a === void 0 ? void 0 : _a[currentStep]) || { 'MODEL Taille': {} };
            if (currentStep === -1 || !formValidAttributes)
                return;
            const currentModelPresentationOpen = (0, attributeFn_1.findModelPresentationOpen)(currentGroup);
            const newModelPresentation = currentModelPresentationOpen
                ? 'Open'
                : 'Closed';
            if (newModelPresentation !== currentModelPresentation &&
                playerMode === '2D') {
                setModelPresentation(newModelPresentation);
                dispatch((0, threekitSlicer_1.setCurrentModelView)(newModelPresentation));
            }
        }
        catch (e) {
            console.log(e);
        }
    }, [currentStep]);
    return { isRotable };
}
exports.default = useUpdateFormAndPlayer;
