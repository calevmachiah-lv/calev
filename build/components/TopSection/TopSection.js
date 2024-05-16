"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_redux_1 = require("react-redux");
const i18next_1 = require("i18next");
const threekitHooks_1 = require("../../utils/threekitHooks");
const selectors_1 = require("../../store/globalSettingsSlicer/selectors");
const OptionsButton_1 = __importDefault(require("../Form/OptionsButton"));
const TopSection_styles_1 = require("./TopSection.styles");
const constants_1 = require("../../utils/constants");
const ProductPrice_1 = __importDefault(require("../ProductPrice"));
const hooks_1 = require("../../hooks");
const TopSection = ({ summaryPage }) => {
    const { isMobile } = (0, threekitHooks_1.useWindowSize)();
    const globalSettingsParams = (0, react_redux_1.useSelector)(selectors_1.getGlobalSettingsParams);
    const { appName, sku, configId } = globalSettingsParams || {};
    const productNameThreekit = (0, hooks_1.useProductName)();
    /*   const renderSku = () => (
      <>
        <ProductSKU>M23203</ProductSKU>
        {appName === CATALOGDESKTOP_APPNAME && (
          <ProductSKU>{configId}</ProductSKU>
        )}
      </>
    );
  
    const renderDesktopView = () => (
      <>
        <InnerContainer>
          <Wrapper>
            <ProductSKU>M23203</ProductSKU>
            <ShareAndWish>
              <ShareAndWishImage src={SHARE_ICON} />
              <ShareAndWishImage src={WISH_ICON} />
            </ShareAndWish>
          </Wrapper>
          <ProductName>{t(productNameThreekit, productNameThreekit)}</ProductName>
          <ProductPrice />
        </InnerContainer>
      </>
    );
  
    const renderMobileView = () => (
      <>
        <ProductSKU>{sku}</ProductSKU>
        <OptionsButton
          buttonName={SHARE_BUTTON_LABEL}
          summaryPage={summaryPage}
        />
        <ProductName>{t(productNameThreekit, productNameThreekit)}</ProductName>
        <ProductPrice />
        <StockStatus summaryPage />
      </>
    ); */
    return ((0, jsx_runtime_1.jsx)(TopSection_styles_1.Container, { children: (0, jsx_runtime_1.jsxs)(TopSection_styles_1.InnerContainer, { children: [(0, jsx_runtime_1.jsxs)(TopSection_styles_1.Wrapper, { children: [(0, jsx_runtime_1.jsx)(TopSection_styles_1.ProductSKU, { children: "M23203" }), (0, jsx_runtime_1.jsxs)(TopSection_styles_1.ShareAndWish, { children: [(0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.SHARE_BUTTON_LABEL }), (0, jsx_runtime_1.jsx)(OptionsButton_1.default, { buttonName: constants_1.WISH_BUTTON_LABEL })] })] }), (0, jsx_runtime_1.jsx)(TopSection_styles_1.ProductName, { children: (0, i18next_1.t)(productNameThreekit, productNameThreekit) }), (0, jsx_runtime_1.jsx)(ProductPrice_1.default, {})] }) }));
};
exports.default = TopSection;
