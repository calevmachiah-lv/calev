"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ConfigurationSectionContent_styles_1 = require("./ConfigurationSectionContent.styles");
const getAttributeValueComponent = (name, props) => {
    const { attributeValueDisplayName, thumbnail, thumbnailColor, page, value } = Object.assign({}, props);
    const attributeValue = attributeValueDisplayName || value;
    const hasThumbnail = thumbnail || thumbnailColor;
    const isPatch = (name === null || name === void 0 ? void 0 : name.includes('patch')) && (name === null || name === void 0 ? void 0 : name.includes('text'));
    if (!attributeValue)
        return null;
    return ((0, jsx_runtime_1.jsxs)(ConfigurationSectionContent_styles_1.AttributeValue, { isPatchAttribute: isPatch, page: page, children: [hasThumbnail && thumbnail && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ConfigurationSectionContent_styles_1.AttributeThumbnail, { page: page, src: thumbnail }), (0, jsx_runtime_1.jsx)(ConfigurationSectionContent_styles_1.TextSummary, { isPatchAttribute: isPatch, page: page, children: attributeValueDisplayName })] })), hasThumbnail && !thumbnail && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ConfigurationSectionContent_styles_1.BackgroundColor, { backgroundColor: thumbnailColor }), (0, jsx_runtime_1.jsx)(ConfigurationSectionContent_styles_1.TextSummary, { page: page, children: attributeValueDisplayName })] })), !hasThumbnail && ((0, jsx_runtime_1.jsx)(ConfigurationSectionContent_styles_1.TextSummary, { isPatchAttribute: isPatch, page: page, children: attributeValue }))] }));
};
function ConfigurationSectionContent({ attributesToDisplay }) {
    const page = 'summary';
    const sortedAttributesToDisplay = attributesToDisplay === null || attributesToDisplay === void 0 ? void 0 : attributesToDisplay.filter((item) => item[1].uiPositionIndex !== undefined).sort((a, b) => a[1].uiPositionIndex - b[1].uiPositionIndex);
    return sortedAttributesToDisplay === null || sortedAttributesToDisplay === void 0 ? void 0 : sortedAttributesToDisplay.map((el) => {
        const name = el[0];
        const attributeProps = el[1];
        const ValueComponent = getAttributeValueComponent(name, Object.assign(Object.assign({}, attributeProps), { page }));
        return ValueComponent && (attributeProps === null || attributeProps === void 0 ? void 0 : attributeProps.uiVisible) ? ((0, jsx_runtime_1.jsxs)(ConfigurationSectionContent_styles_1.AttributeWrapper, { page: page, children: [(0, jsx_runtime_1.jsx)(ConfigurationSectionContent_styles_1.AttributeLabel, { page: page, children: attributeProps === null || attributeProps === void 0 ? void 0 : attributeProps.attributeDisplayName }), ValueComponent] }, name)) : null;
    });
}
exports.default = ConfigurationSectionContent;
