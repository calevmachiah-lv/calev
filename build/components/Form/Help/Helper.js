"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const assets_1 = require("../../../assets");
const Helper_style_1 = require("./Helper.style");
const mockData_1 = require("../../../utils/mockData");
const ViewsViewer_1 = __importDefault(require("../../ViewsViewer"));
const react_1 = require("react");
const constants_1 = require("../../../utils/constants");
const Helper = ({ displayHelper, setDisplayHelper }) => {
    const [activeStep, setActiveStep] = (0, react_1.useState)(0);
    const [open, setOpen] = (0, react_1.useState)(true);
    const [slideDirection, setSlideDirection] = (0, react_1.useState)('next');
    return ((0, jsx_runtime_1.jsx)(Helper_style_1.Container, { id: constants_1.HELPER_DIV_ID, open: displayHelper, children: mockData_1.helperData === null || mockData_1.helperData === void 0 ? void 0 : mockData_1.helperData.map((item, index) => {
            return ((0, jsx_runtime_1.jsx)(Helper_style_1.StepSlide, { isActive: activeStep === index, children: (0, jsx_runtime_1.jsxs)(Helper_style_1.InnerContainer, { open: displayHelper, children: [(0, jsx_runtime_1.jsxs)(Helper_style_1.TitleContainer, { children: [(0, jsx_runtime_1.jsx)(Helper_style_1.Title, { children: "How to Custome your Lucky Louis" }), (0, jsx_runtime_1.jsx)(Helper_style_1.Icon, { src: assets_1.CLOSE_ICON_HELPER, onClick: () => {
                                        setDisplayHelper(false);
                                    } })] }), (0, jsx_runtime_1.jsxs)(Helper_style_1.ContentContainer, { children: [(0, jsx_runtime_1.jsx)(Helper_style_1.PictureContainer, { image: item === null || item === void 0 ? void 0 : item.imageUrl, slideDirection: slideDirection, children: (0, jsx_runtime_1.jsx)(ViewsViewer_1.default, { data: mockData_1.helperData, setActiveStep: setActiveStep, setSlideDirection: setSlideDirection, activeStep: activeStep, isMobile: true, isHelper: true, containerID: constants_1.HELPER_DIV_ID }) }), (0, jsx_runtime_1.jsxs)(Helper_style_1.DescriptionContainer, { children: [(0, jsx_runtime_1.jsxs)(Helper_style_1.StepTitle, { children: ["Step - 0", activeStep + 1] }), (0, jsx_runtime_1.jsxs)(Helper_style_1.DescriptionTitle, { children: ["Select your ", item === null || item === void 0 ? void 0 : item.title] }), (0, jsx_runtime_1.jsx)(Helper_style_1.DescriptionText, { children: item === null || item === void 0 ? void 0 : item.description })] })] })] }) }, index));
        }) }));
};
exports.default = Helper;
