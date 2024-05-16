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
const i18next_1 = require("i18next");
const buffer_1 = require("buffer");
const threekitSlicer_1 = require("../../../store/threekitSlicer");
const OptionsButton_style_1 = require("./OptionsButton.style");
const assets_1 = require("../../../assets");
const selectors_1 = require("../../../store/globalSettingsSlicer/selectors");
const constants_1 = require("../../../utils/constants");
const functions_1 = require("../../../utils/function/functions");
const threekitHooks_1 = require("../../../utils/threekitHooks");
const savedConfigurationData_1 = require("../../../store/threekitSlicer/selectors/savedConfigurationData");
const react_router_dom_1 = require("react-router-dom");
const globalSettingsSlicer_1 = require("../../../store/globalSettingsSlicer");
const hooks_1 = require("../../../hooks");
const hooks_2 = require("../../../hooks");
const useParams_1 = __importDefault(require("../../../hooks/useParams"));
const validationSlicer_1 = require("../../../store/validationSlicer");
const ShowPopUp_1 = require("../../PopUp/ShowPopUp");
const PopUpType_1 = require("../../PopUp/PopUpType");
const mapping_1 = require("../../../utils/function/mapping");
const flowSlicer_1 = require("../../../store/flowSlicer");
const OptionsButton = ({ buttonName, buttonText = '', summaryPage = false, disable = false, leadTime, notOrderable = false, isFullScreen = false, fnButton = () => { }, }) => {
    var _a, _b, _c, _d, _e, _f;
    const attributeNames = (_c = (_b = (_a = window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus()) === null || _b === void 0 ? void 0 : _b.validAttributesAndTheirValues_typeB) === null || _c === void 0 ? void 0 : _c.map((item) => item === null || item === void 0 ? void 0 : item.name);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isMobile, isDesktop } = (0, threekitHooks_1.useWindowSize)();
    const [clicked, setClicked] = (0, react_1.useState)(false);
    const [showLoader, setShowLoader] = (0, react_1.useState)(false);
    const [disableSurpriseME, setDisableSurpriseMe] = (0, react_1.useState)(Object.keys((_d = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _d === void 0 ? void 0 : _d.getStatus()).length ===
        0);
    const [saveConfigurationError, setSaveConfigurationError] = (0, react_1.useState)(false);
    const globalSettingsParams = (0, react_redux_1.useSelector)(selectors_1.getGlobalSettingsParams);
    const { appName } = globalSettingsParams || {};
    const { baseUrlClient } = (0, useParams_1.default)();
    const productName = (0, hooks_1.useProductName)();
    const { currency, priceWithCurrency, price } = (0, hooks_2.usePrice)();
    const page = (0, react_redux_1.useSelector)(threekitSlicer_1.getPage);
    const [, setCamera] = (0, threekitHooks_1.useAttribute)('Camera');
    const defaultCameraId = (0, react_redux_1.useSelector)(threekitSlicer_1.getPreviousCamera);
    const minLeadTime = leadTime === null || leadTime === void 0 ? void 0 : leadTime.min;
    const maxLeadTime = leadTime === null || leadTime === void 0 ? void 0 : leadTime.max;
    const isChina = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsChina);
    const readableConfiguration = (0, react_redux_1.useSelector)((0, threekitSlicer_1.getReadableConfigurationWithAttributeType)());
    const navigate = (0, react_router_dom_1.useNavigate)();
    const formTextInputFields = (0, react_redux_1.useSelector)(validationSlicer_1.getFormTextInputFields);
    const formWarningMessages = (0, react_redux_1.useSelector)(validationSlicer_1.getFormWarningMessages);
    const configurationSavedData = (0, react_redux_1.useSelector)(savedConfigurationData_1.getSavedConfigurationData);
    const initialConfig = (0, react_redux_1.useSelector)(threekitSlicer_1.getInitialConfiguration);
    const attributesObject = (0, threekitHooks_1.useAttributes)(attributeNames);
    const inStockData = (0, react_redux_1.useSelector)(threekitSlicer_1.getIsInStock);
    const { displayTutorial, tutorialStep, tutorialStepsNumber } = (0, react_redux_1.useSelector)(flowSlicer_1.getTutorial);
    const tutorialCSSDisplay = buttonName === constants_1.DONE_BUTTON_LABEL &&
        displayTutorial &&
        tutorialStep === tutorialStepsNumber - 1;
    const dataDrivenSku = (_f = (_e = window.dataDrivenConfiguratorExtension) === null || _e === void 0 ? void 0 : _e.getStatus()) === null || _f === void 0 ? void 0 : _f.skus;
    const handleReset = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        dispatch((0, threekitSlicer_1.setConfiguration)(initialConfig));
        dispatch((0, globalSettingsSlicer_1.setStep)(0));
        const newTextInputs = Object.keys(formTextInputFields).reduce((accumulator, key) => {
            accumulator[key] = '';
            return accumulator;
        }, {});
        dispatch((0, validationSlicer_1.setFormTextInputFields)(newTextInputs));
    }), [dispatch, initialConfig, formTextInputFields]);
    const clientUrl = (0, react_1.useMemo)(() => {
        if (!(globalSettingsParams === null || globalSettingsParams === void 0 ? void 0 : globalSettingsParams.configId) || !baseUrlClient)
            return;
        const result = `https://${baseUrlClient}/${globalSettingsParams === null || globalSettingsParams === void 0 ? void 0 : globalSettingsParams.configId}`;
        return encodeURI(result);
    }, [globalSettingsParams, baseUrlClient]);
    const handleShare = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        /*    if (!clientUrl) {
          console.error('No clientUrl found (probably no configId)');
          return;
        } */
        if (appName === constants_1.OOB_APPNAME || appName === constants_1.CATALOGDESKTOP_APPNAME) {
            const eventDataShare = {
                eventName: 'ShareClientUrlAlpha',
                eventData: { clientUrl },
            };
            window.parent.postMessage(eventDataShare, '*');
        }
        else {
            yield (0, functions_1.copyTextToClipboard)('clientUrl');
        }
        (0, ShowPopUp_1.showPopUp)({
            popUpType: PopUpType_1.popUpTypes.linkCopied,
            functionOnClose: () => setClicked(false),
        });
    }), [clientUrl, appName]);
    const handleFinish = (0, react_1.useCallback)(() => {
        console.log(disable);
        if (disable) {
            (0, ShowPopUp_1.showPopUp)({ popUpType: PopUpType_1.popUpTypes.notOrderableError });
            return;
        }
        /*  const locale = globalSettingsParams['lng'] || 'en_E1';
        defaultCameraId && setCamera(defaultCameraId);
    
        const getSavedConfiguration = async () => {
          const data = await window?.threekit?.controller.saveConfiguration({
            priceWithCurrency,
            productName,
          });
          return data;
        };
    
        const getAttachementsThroughAPI = async ({
          recipeId,
        }: {
          recipeId: string;
        }) => {
          const data = await getSavedConfig({
            recipeId,
            isMobile,
          });
          if (data?.attachments) {
            return {
              front: data?.attachments?.Front + ',1.webp',
              backAndFront: data?.attachments?.Side + ',1.webp',
              back: data?.attachments?.Side + ',1.webp',
            };
          } else {
            return {};
          }
        };
    
        getSavedConfiguration().then((data) => {
          window.dataDrivenConfiguratorExtension
            .saveConfiguration({ Patch: window.playerMonogram }, locale, {
              priceCurrency: currency,
              priceAmount: price,
              productName: productName,
              sku: dataDrivenSku,
              appName: appName,
            })
            .then(async (recipeId: string) => {
              const attachments = await getAttachementsThroughAPI({ recipeId });
              dispatch(setSavedConfigurationData({ ...data, attachments }));
              const params: IParams = {
                ...globalSettingsParams,
                sku: dataDrivenSku,
                recipeId,
                price: priceWithCurrency,
                productName: productName,
              };
              if (recipeId) {
                params[TK_SAVED_CONFIG_PARAM_KEY] = recipeId;
              }
              if (!params?.[TK_SAVED_CONFIG_PARAM_KEY])
                delete params[TK_SAVED_CONFIG_PARAM_KEY];
              dispatch(setGlobalSettingsParams(params));
              dispatch(setPage('summary'));
            });
        }); */
        dispatch((0, threekitSlicer_1.setPage)('summary'));
    }, [
        defaultCameraId,
        setCamera,
        dispatch,
        priceWithCurrency,
        globalSettingsParams,
        dataDrivenSku,
        productName,
        currency,
        price,
        appName,
        setClicked,
        formWarningMessages,
        isMobile,
        setSaveConfigurationError,
    ]);
    const handleSupriseME = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        setDisableSurpriseMe(true);
        dispatch((0, threekitSlicer_1.setPlayerLoading)(true));
        if (attributeNames.length > 0) {
            const newConfig = yield attributeNames.reduce((acc, item) => {
                var _a, _b;
                const assetIds = (_b = (_a = attributesObject[item]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.values.filter((element) => (element === null || element === void 0 ? void 0 : element.sku) !== 'NA' && inStockData[element.sku] === true).map((data) => {
                    return data.assetId;
                });
                const randomAsset = assetIds[Math.floor(Math.random() * assetIds.length)];
                acc[item] = { assetId: randomAsset };
                return acc;
            }, {});
            dispatch((0, threekitSlicer_1.setConfiguration)(newConfig));
            setTimeout(() => {
                setDisableSurpriseMe(false);
                dispatch((0, threekitSlicer_1.setPlayerLoading)(false));
            }, 3000);
        }
    }), [attributesObject, attributeNames]);
    const handleEdit = (0, react_1.useCallback)(() => {
        dispatch((0, threekitSlicer_1.setPage)('home'));
        dispatch((0, flowSlicer_1.closeRecap)(true));
    }, [page, dispatch]);
    const handleItemAction = (0, react_1.useCallback)((action) => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h;
        setClicked(true);
        const leadTimeAndPrice = {
            price,
            currency,
            minLeadTime,
            maxLeadTime,
        };
        const json = Object.assign(Object.assign({}, configurationSavedData), { metadata: { readableConfiguration }, createdAt: new Date().toISOString(), clientUrl,
            productName, inStore: (configurationSavedData === null || configurationSavedData === void 0 ? void 0 : configurationSavedData.inStore) || false, kit_item_sku: dataDrivenSku.slice(1), sku_item: dataDrivenSku[0], attachments: {
                front: 'https://lv-api.3kit.com/api/configurations/T7RLUBQ7/image/Front,1.webp',
                backAndFront: 'https://lv-api.3kit.com/api/configurations/T7RLUBQ7/image/Side,1.webp',
                back: 'https://lv-api.3kit.com/api/configurations/T7RLUBQ7/image/Side,1.webp',
            } });
        let parsedJsonToSend = (0, mapping_1.parseRecipe)(json, leadTimeAndPrice);
        parsedJsonToSend.ThreekitID = globalSettingsParams['configId'] || '';
        parsedJsonToSend.action = action;
        if (isChina || appName === constants_1.CATALOGWECOM_APPNAME) {
            parsedJsonToSend = buffer_1.Buffer.from(JSON.stringify(parsedJsonToSend)).toString('base64');
            //@ts-ignore
            wx === null || wx === void 0 ? void 0 : wx.miniProgram.getEnv(function (res) {
                console.log('Hello China 2', res);
                if (res.miniprogram) {
                    //@ts-ignore
                    wx.miniProgram.postMessage({
                        data: { threekitPersoProduct: parsedJsonToSend },
                    });
                    // @ts-ignore
                    wx === null || wx === void 0 ? void 0 : wx.miniProgram.switchTab({
                        url: `/pages/Basket/Basket`,
                    });
                }
            });
        }
        if (appName === constants_1.CATALOGDESKTOP_APPNAME || appName === constants_1.OOB_APPNAME) {
            const eventDataShare = {
                eventName: 'handleItemAction',
                eventData: { parsedJsonToSend },
            };
            window.parent.postMessage(eventDataShare, '*');
        }
        if ((_h = (_g = window.webkit) === null || _g === void 0 ? void 0 : _g.messageHandlers) === null || _h === void 0 ? void 0 : _h.onAddToCart) {
            window.webkit.messageHandlers.onAddToCart.postMessage({
                message: parsedJsonToSend,
            });
            console.log('jsonAddToCart', parsedJsonToSend);
        }
        else {
            console.info('jsonAddToCart', parsedJsonToSend);
        }
        setTimeout(() => {
            console.log('AddToCartReleased');
            setClicked(false);
        }, 10000);
    }), [
        isChina,
        currency,
        minLeadTime,
        maxLeadTime,
        price,
        configurationSavedData,
        appName,
        clientUrl,
        globalSettingsParams,
        dataDrivenSku,
        productName,
        readableConfiguration,
    ]);
    let label;
    let iconSrc;
    let secondIconSrc;
    let functionOnclick;
    switch (buttonName) {
        case constants_1.INSTOCK_BUTTON_LABEL:
            label = buttonText;
            iconSrc = assets_1.INSTOCK_ICON;
            functionOnclick = () => { };
            break;
        case constants_1.LEADTIME_BUTTON_LABEL:
            label = (buttonText === null || buttonText === void 0 ? void 0 : buttonText.startsWith('Lead time')) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [buttonText === null || buttonText === void 0 ? void 0 : buttonText.slice(0, 9), (0, jsx_runtime_1.jsx)(OptionsButton_style_1.LabelBold, { children: buttonText === null || buttonText === void 0 ? void 0 : buttonText.slice(10) })] })) : (buttonText || 'Not orderable');
            functionOnclick = () => { };
            break;
        case constants_1.ZOOM_BUTTON_LABEL:
            label = '';
            iconSrc = isFullScreen ? assets_1.UNZOOM_ICON : assets_1.ZOOM_ICON;
            functionOnclick = fnButton;
            break;
        case constants_1.HELPER_BUTTON_LABEL:
            label = '';
            functionOnclick = fnButton;
            break;
        case constants_1.CLOSE_BUTTON_LABEL:
            label = '';
            iconSrc = assets_1.CLOSE_ICON;
            functionOnclick = () => fnButton(false);
            break;
        case constants_1.INFO_ZOOM_BUTTON_LABEL:
            label = (0, i18next_1.t)('info.zoom_press', { defaultValue: constants_1.INFO_ZOOM_BUTTON_LABEL });
            iconSrc = assets_1.ZOOM_ICON;
            secondIconSrc = assets_1.INFO_PRESS_ICON;
            functionOnclick = () => { };
            break;
        case constants_1.RESET_BUTTON_LABEL:
            label = (0, i18next_1.t)('button.label.reset', { defaultValue: constants_1.RESET_BUTTON_LABEL });
            iconSrc = assets_1.RESET_ICON;
            functionOnclick = handleReset;
            break;
        case constants_1.SHARE_BUTTON_LABEL:
            label = (0, i18next_1.t)('button.label.share', { defaultValue: constants_1.SHARE_BUTTON_LABEL });
            iconSrc = assets_1.SHARE_ICON;
            functionOnclick = handleShare;
            break;
        case constants_1.WISH_BUTTON_LABEL:
            label = (0, i18next_1.t)('button.label.wish', { defaultValue: constants_1.WISH_BUTTON_LABEL });
            iconSrc = assets_1.WISH_ICON;
            functionOnclick = () => {
                handleItemAction('wish');
            };
            break;
        case constants_1.EDIT_BUTTON_LABEL:
            label = (0, i18next_1.t)('button.label.edit', { defaultValue: constants_1.EDIT_BUTTON_LABEL });
            iconSrc = assets_1.EDIT_ICON;
            functionOnclick = handleEdit;
            break;
        case constants_1.DONE_BUTTON_LABEL:
            label = (0, i18next_1.t)('button.label.done', { defaultValue: constants_1.DONE_BUTTON_LABEL });
            iconSrc = null;
            functionOnclick = handleFinish;
            break;
        case constants_1.SURPRISE_ME_BUTTON_LABEL:
            label = (0, i18next_1.t)('button.label.surprise_me', { defaultValue: constants_1.SURPRISE_ME_BUTTON_LABEL });
            iconSrc = null;
            functionOnclick = handleSupriseME;
            break;
        case constants_1.ADDTOBAG_BUTTON_LABEL:
            label = (0, i18next_1.t)('button.label.add_to_bag', { defaultValue: constants_1.ADDTOBAG_BUTTON_LABEL });
            iconSrc = null;
            functionOnclick = () => {
                handleItemAction('cart');
            };
            break;
        case constants_1.MODIFY_BUTTON_LABEL:
            label = (0, i18next_1.t)('button.label.modify', { defaultValue: constants_1.MODIFY_BUTTON_LABEL });
            iconSrc = null;
            functionOnclick = handleEdit;
            break;
        default:
            label = buttonName;
            iconSrc = null;
            functionOnclick = () => { };
    }
    const shareButtonDisabled = (0, react_1.useMemo)(() => {
        return buttonName === constants_1.SHARE_BUTTON_LABEL && clicked;
    }, [buttonName, clicked]);
    const AddToCartButtonDisabled = (0, react_1.useMemo)(() => {
        return buttonName === constants_1.ADDTOBAG_BUTTON_LABEL && true;
    }, [buttonName, clicked]);
    (0, react_1.useEffect)(() => {
        const isLoading = buttonName === constants_1.DONE_BUTTON_LABEL &&
            clicked &&
            !disable &&
            !saveConfigurationError &&
            !notOrderable;
        setShowLoader(isLoading);
    }, [clicked, disable, notOrderable, buttonName, saveConfigurationError]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(OptionsButton_style_1.ButtonContainer, { buttonName: buttonName, "data-dtname": buttonName, isFullScreen: isFullScreen, onClick: (e) => {
                !tutorialCSSDisplay && functionOnclick(e);
            }, disabled: buttonName === constants_1.SURPRISE_ME_BUTTON_LABEL ? disableSurpriseME : disable, summaryPage: summaryPage, displayTutorial: tutorialCSSDisplay, children: showLoader ? ((0, jsx_runtime_1.jsx)(Loader, {})) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [secondIconSrc && ((0, jsx_runtime_1.jsx)("img", { "data-dtname": buttonName, alt: "", src: secondIconSrc })), iconSrc && (0, jsx_runtime_1.jsx)("img", { "data-dtname": buttonName, alt: "", src: iconSrc }), !(buttonName === constants_1.SHARE_BUTTON_LABEL ||
                        buttonName === constants_1.RESET_BUTTON_LABEL ||
                        buttonName === constants_1.WISH_BUTTON_LABEL) &&
                        buttonName !== constants_1.INFO_ZOOM_BUTTON_LABEL &&
                        label, buttonName === constants_1.INFO_ZOOM_BUTTON_LABEL && ((0, jsx_runtime_1.jsx)(OptionsButton_style_1.ButtonWrapper, { children: label }))] })) }) }));
};
exports.default = OptionsButton;
const Loader = () => ((0, jsx_runtime_1.jsxs)(OptionsButton_style_1.LoaderWrapper, { children: [(0, jsx_runtime_1.jsx)(OptionsButton_style_1.LoadingText, { children: "Loading" }), (0, jsx_runtime_1.jsx)(OptionsButton_style_1.Dot, { delay: "0s" }), (0, jsx_runtime_1.jsx)(OptionsButton_style_1.Dot, { delay: "0.15s" }), (0, jsx_runtime_1.jsx)(OptionsButton_style_1.Dot, { delay: "0.3s" })] }));
