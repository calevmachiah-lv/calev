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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const photosDisplayer_styled_1 = require("./photosDisplayer.styled");
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const globalSettingsSlicer_1 = require("../../store/globalSettingsSlicer");
const Arrows_styles_1 = require("../../components/ArrowsComponent/Arrows.styles");
const assets_1 = require("../../assets");
const threekitHooks_1 = require("../../utils/threekitHooks");
const validationSlicer_1 = require("../../store/validationSlicer");
const attributeFn_1 = require("../../utils/function/attributeFn");
const functions_1 = require("../../utils/function/functions");
const PhotosDisplayer = () => {
    var _a, _b, _c, _d;
    const dispatch = (0, react_redux_1.useDispatch)();
    const [mainPhotoKey, setMainPhotoKey] = (0, react_1.useState)(0);
    const currentMode = (0, react_redux_1.useSelector)(threekitSlicer_1.getCurrentMode);
    const lastAngle = (0, react_redux_1.useSelector)(threekitSlicer_1.getLastAngle);
    const currentViewPresentation = (0, react_redux_1.useSelector)(threekitSlicer_1.getCurrentModelView);
    const currentStep = (0, react_redux_1.useSelector)(globalSettingsSlicer_1.getStep);
    const { getIsAttributeValid } = (0, threekitHooks_1.useValidAttributes)();
    const form = (0, react_redux_1.useSelector)(threekitSlicer_1.getForm);
    const [modelViewsStable, setModelViewsStable] = (0, react_1.useState)([]);
    const formTextInputFields = (0, react_redux_1.useSelector)(validationSlicer_1.getFormTextInputFields);
    const currentModelPresentation = (0, react_redux_1.useSelector)(threekitSlicer_1.getCurrentModelView);
    const [isViewClick, setIsViewClick] = (0, react_1.useState)(false);
    const currentGroup = (0, react_1.useMemo)(() => {
        var _a;
        if (form) {
            const formValidAttributes = (0, attributeFn_1.updateForm)(form, getIsAttributeValid);
            if (currentStep !== -1) {
                return (_a = Object.values(formValidAttributes)) === null || _a === void 0 ? void 0 : _a[currentStep];
            }
        }
    }, [formTextInputFields, currentStep]);
    const carousel = (0, react_1.useMemo)(() => {
        var _a, _b;
        return (_b = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus()) === null || _b === void 0 ? void 0 : _b.carousel;
    }, [(_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus()) === null || _b === void 0 ? void 0 : _b.carousel) === null || _c === void 0 ? void 0 : _c.items]);
    const modelViews = (0, react_1.useMemo)(() => {
        if (currentGroup && (0, functions_1.isTextAttribute)(currentGroup)) {
            if ((modelViewsStable === null || modelViewsStable === void 0 ? void 0 : modelViewsStable.length) === 0) {
                return carousel.items;
            }
            else if ((modelViewsStable === null || modelViewsStable === void 0 ? void 0 : modelViewsStable.length) > 0 && (0, functions_1.hasPatch)()) {
                return modelViewsStable;
            }
        }
        return carousel === null || carousel === void 0 ? void 0 : carousel.items;
    }, [carousel, currentGroup]);
    const photoWidth = (0, react_1.useMemo)(() => {
        return modelViews ? 100 / modelViews.length + '%' : '20%';
    }, [modelViews]);
    (0, react_1.useEffect)(() => {
        if (currentGroup) {
            if ((0, functions_1.isTextAttribute)(currentGroup) && (0, functions_1.hasPatch)()) {
                if (!modelViewsStable || carousel.items > modelViewsStable) {
                    setModelViewsStable(carousel.items);
                }
            }
        }
    }, [currentGroup]);
    (0, react_1.useEffect)(() => {
        if (currentMode === '2D') {
            const viewIndex = modelViews === null || modelViews === void 0 ? void 0 : modelViews.findIndex((element) => element.configuration['Rotate Model'] === lastAngle &&
                element.configuration['Model Presentation'] ===
                    currentViewPresentation);
            if (viewIndex != undefined && viewIndex !== -1) {
                if (modelViews[viewIndex].configuration)
                    setMainPhotoKey(viewIndex);
            }
        }
    }, [lastAngle]);
    (0, react_1.useEffect)(() => {
        let index = -1;
        if (currentMode !== '3D') {
            index = modelViews === null || modelViews === void 0 ? void 0 : modelViews.findIndex((element) => element.PlayerType === currentMode &&
                currentModelPresentation ===
                    element.configuration['Model Presentation']);
        }
        else {
            index = modelViews.length - 1;
        }
        if (index !== undefined && index !== -1 && !isViewClick) {
            setTimeout(() => {
                setMainPhotoKey(index);
            }, 500);
        }
    }, [currentMode, currentModelPresentation]);
    (0, react_1.useEffect)(() => {
        if (modelViewsStable !== (carousel === null || carousel === void 0 ? void 0 : carousel.items)) {
            setModelViewsStable(carousel === null || carousel === void 0 ? void 0 : carousel.items);
        }
    }, [currentStep]);
    const setNewView = (0, react_1.useCallback)((view, key) => __awaiter(void 0, void 0, void 0, function* () {
        if (view && 0 <= key && key <= modelViews.length) {
            setIsViewClick(true);
            const viewModelPresentation = view === null || view === void 0 ? void 0 : view.configuration['Model Presentation'];
            const viewRotate = view === null || view === void 0 ? void 0 : view.configuration['Rotate Model'];
            yield window.dataDrivenConfigurator.setConfiguration({
                'Model Presentation': viewModelPresentation,
                'Rotate Model': viewRotate,
            });
            dispatch((0, threekitSlicer_1.setViewUpdate)(true));
            dispatch((0, threekitSlicer_1.setCurrentModelView)(viewModelPresentation));
            dispatch((0, threekitSlicer_1.setCurrentMode)(view.PlayerType));
            dispatch((0, threekitSlicer_1.setLastAngle)(viewRotate));
            setMainPhotoKey(key);
            setTimeout(() => {
                setIsViewClick(false);
                dispatch((0, threekitSlicer_1.setViewUpdate)(false));
            }, 50);
        }
    }), [modelViews, dispatch]);
    return ((modelViews === null || modelViews === void 0 ? void 0 : modelViews.length) && ((0, jsx_runtime_1.jsxs)(photosDisplayer_styled_1.ElsePhotosWrapper, { children: [(modelViews === null || modelViews === void 0 ? void 0 : modelViews.length) > 0 && ((0, jsx_runtime_1.jsxs)(Arrows_styles_1.ArrowContainer, { children: [(0, jsx_runtime_1.jsx)(Arrows_styles_1.Arrow, { image: assets_1.LEFT_ARROW_SLIDER, onClick: () => setNewView(modelViews[mainPhotoKey - 1], mainPhotoKey - 1) }), (0, jsx_runtime_1.jsx)(Arrows_styles_1.Arrow, { image: assets_1.RIGHT_ARROW_SLIDER, onClick: () => setNewView(modelViews[mainPhotoKey + 1], mainPhotoKey + 1) })] })), modelViews === null || modelViews === void 0 ? void 0 : modelViews.map((item, key) => item.PlayerType === '2D' && ((0, jsx_runtime_1.jsx)(photosDisplayer_styled_1.ElsePhotoWrapper, { onClick: () => setNewView(item, key), selected: key === mainPhotoKey && currentMode === '2D', width: photoWidth, children: (0, jsx_runtime_1.jsx)(photosDisplayer_styled_1.ElsePhoto, { imageToDisplay: item === null || item === void 0 ? void 0 : item.thumbnailUrl }) }, key))), modelViews &&
                modelViews[modelViews.length - 1].PlayerType === '3D' && ((0, jsx_runtime_1.jsx)(photosDisplayer_styled_1.ElsePhotoWrapper, { onClick: () => setNewView(modelViews[modelViews.length - 1], modelViews.length - 1), selected: currentMode === '3D', width: photoWidth, children: (0, jsx_runtime_1.jsx)(photosDisplayer_styled_1.ElsePhoto, { imageToDisplay: (_d = modelViews[modelViews.length - 1]) === null || _d === void 0 ? void 0 : _d.thumbnailUrl }) }))] })));
};
exports.default = PhotosDisplayer;
