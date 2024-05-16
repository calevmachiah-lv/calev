"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const landscapeForm_styles_1 = require("./landscapeForm.styles");
const Attributes_1 = __importDefault(require("../../../components/Attributes"));
const ActiveAttributeTitle_1 = __importDefault(require("../../../components/ActiveAttributeTitle"));
const assets_1 = require("../../../assets");
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const useActiveAttribute_1 = __importDefault(require("../../../hooks/useActiveAttribute"));
const SlectedValuesOfAttribute_1 = __importDefault(require("../../../components/SlectedValuesOfAttribute"));
const flowSlicer_1 = require("../../../store/flowSlicer");
const RecapPage_1 = __importDefault(require("../../RecapPage"));
const FunctionalButtons_1 = __importDefault(require("../../../components/FunctionalButtons"));
const ProductInfos_1 = __importDefault(require("./ProductInfos"));
const BottomContainer_1 = __importDefault(require("./BottomContainer"));
const LandscapeForm = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { displayTutorial, tutorialStep } = (0, react_redux_1.useSelector)(flowSlicer_1.getTutorial);
    const groupedAttributes = (0, react_redux_1.useSelector)(threekitSlicer_1.getGroupedAttributes) || {};
    const { activeAttribute, selectedValues } = (0, useActiveAttribute_1.default)();
    const displayRecap = (0, react_redux_1.useSelector)(flowSlicer_1.getDisplayRecap);
    return ((0, jsx_runtime_1.jsxs)(landscapeForm_styles_1.FormContainer, { children: [(0, jsx_runtime_1.jsx)(ProductInfos_1.default, {}), (0, jsx_runtime_1.jsxs)(landscapeForm_styles_1.TopFormContainer, { children: [(0, jsx_runtime_1.jsxs)(landscapeForm_styles_1.BesideAttributesContainer, { children: [(0, jsx_runtime_1.jsx)(landscapeForm_styles_1.SelectionSummaryIcon, { src: assets_1.SUMMARY_ICON, onClick: () => {
                                    dispatch((0, flowSlicer_1.openRecap)(true));
                                } }), (0, jsx_runtime_1.jsxs)(landscapeForm_styles_1.TitlePriceContainer, { children: [(0, jsx_runtime_1.jsx)(ActiveAttributeTitle_1.default, {}), (0, jsx_runtime_1.jsx)(SlectedValuesOfAttribute_1.default, { selectedValues: selectedValues })] })] }), (0, jsx_runtime_1.jsx)(Attributes_1.default, { tutorialStep: tutorialStep, displayTutorial: displayTutorial }), (0, jsx_runtime_1.jsx)(FunctionalButtons_1.default, {})] }), (0, jsx_runtime_1.jsx)(landscapeForm_styles_1.BottomFormContainer, { children: Object.entries(groupedAttributes).map(([groupName, attributes]) => {
                    const attribute = attributes[0];
                    return ((0, jsx_runtime_1.jsx)(BottomContainer_1.default, { attribute: attribute, attributes: attributes }));
                }) }), (0, jsx_runtime_1.jsx)(RecapPage_1.default, { show: displayRecap }), (0, jsx_runtime_1.jsx)(landscapeForm_styles_1.BackgroundWrapper, { show: displayRecap, onClick: () => dispatch((0, flowSlicer_1.closeRecap)(true)) })] }));
};
exports.default = LandscapeForm;
