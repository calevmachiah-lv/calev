import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { Buffer } from 'buffer';
import {
  getInitialConfiguration,
  getIsChina,
  getPreviousCamera,
  getReadableConfigurationWithAttributeType,
  getPage,
  setConfiguration,
  setSavedConfigurationData,
  setPage,
  getIsInStock,
  setPlayerLoading,
} from '../../../store/threekitSlicer';
import {
  ButtonContainer,
  ButtonWrapper,
  Dot,
  LabelBold,
  LoaderWrapper,
  LoadingText,
} from './OptionsButton.style';
import {
  RESET_ICON,
  INSTOCK_ICON,
  SHARE_ICON,
  CART_ICON_OOB,
  CART_ICON,
  EDIT_ICON,
  ZOOM_ICON,
  CLOSE_ICON,
  UNZOOM_ICON,
  INFO_PRESS_ICON,
  WISH_ICON,
} from '../../../assets';
import { getGlobalSettingsParams } from '../../../store/globalSettingsSlicer/selectors';
import {
  CATALOGDESKTOP_APPNAME,
  CLOSE_BUTTON_LABEL,
  EDIT_BUTTON_LABEL,
  DONE_BUTTON_LABEL,
  INFO_ZOOM_BUTTON_LABEL,
  INSTOCK_BUTTON_LABEL,
  LEADTIME_BUTTON_LABEL,
  OOB_APPNAME,
  RESET_BUTTON_LABEL,
  SHARE_BUTTON_LABEL,
  TK_SAVED_CONFIG_PARAM_KEY,
  ZOOM_BUTTON_LABEL,
  HELPER_BUTTON_LABEL,
  SURPRISE_ME_BUTTON_LABEL,
  ADDTOBAG_BUTTON_LABEL,
  MODIFY_BUTTON_LABEL,
  WISH_BUTTON_LABEL,
  CATALOGWECOM_APPNAME,
} from '../../../utils/constants';
import { copyTextToClipboard } from '../../../utils/function/functions';
import {
  useAttribute,
  useAttributes,
  useWindowSize,
} from '../../../utils/threekitHooks';
import { getSavedConfigurationData } from '../../../store/threekitSlicer/selectors/savedConfigurationData';
import { useNavigate } from 'react-router-dom';
import {
  IParams,
  setGlobalSettingsParams,
  setStep,
} from '../../../store/globalSettingsSlicer';
import { useProductName } from '../../../hooks';
import { getSavedConfig } from '../../../utils/ApiCalls/ApiCalls';
import { usePrice } from '../../../hooks';
import useParams from '../../../hooks/useParams';
import {
  getFormTextInputFields,
  getFormWarningMessages,
  setFormTextInputFields,
} from '../../../store/validationSlicer';
import { PopUpType, showPopUp } from '../../PopUp/ShowPopUp';
import { popUpTypes } from '../../PopUp/PopUpType';
import {
  ILeadTimeAndPrice,
  parseRecipe,
} from '../../../utils/function/mapping';
import { closeRecap, getTutorial } from '../../../store/flowSlicer';
import { ThunkDispatch } from '@reduxjs/toolkit';
interface OptionsButtonProps {
  buttonName: string;
  buttonText?: string;
  summaryPage?: boolean;
  disable?: boolean;
  leadTime?: {
    min: number;
    max: number;
  };
  notOrderable?: boolean;
  notOrderableMessage?: string;
  fnButton?: Function;
  isFullScreen?: boolean;
}

const OptionsButton: React.FC<OptionsButtonProps> = ({
  buttonName,
  buttonText = '',
  summaryPage = false,
  disable = false,
  leadTime,
  notOrderable = false,
  isFullScreen = false,
  fnButton = () => { },
}) => {
  const attributeNames = window.dataDrivenConfiguratorExtension
    ?.getStatus()
    ?.validAttributesAndTheirValues_typeB?.map(
      (item: Record<string, any>) => item?.name
    );

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { isMobile, isDesktop } = useWindowSize();
  const [clicked, setClicked] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [disableSurpriseME, setDisableSurpriseMe] = useState<boolean>(
    Object.keys(window?.dataDrivenConfiguratorExtension?.getStatus()).length ===
    0
  );
  const [saveConfigurationError, setSaveConfigurationError] =
    useState<boolean>(false);
  const globalSettingsParams = useSelector(getGlobalSettingsParams);
  const { appName } = globalSettingsParams || {};
  const { baseUrlClient } = useParams();
  const productName = useProductName();
  const { currency, priceWithCurrency, price } = usePrice();
  const page = useSelector(getPage);
  const [, setCamera] = useAttribute('Camera');
  const defaultCameraId = useSelector(getPreviousCamera);
  const minLeadTime = leadTime?.min;
  const maxLeadTime = leadTime?.max;
  const isChina = useSelector(getIsChina);
  const readableConfiguration = useSelector(
    getReadableConfigurationWithAttributeType()
  );
  const navigate = useNavigate();
  const formTextInputFields = useSelector(getFormTextInputFields);
  const formWarningMessages = useSelector(getFormWarningMessages);
  const configurationSavedData = useSelector(getSavedConfigurationData);
  const initialConfig = useSelector(getInitialConfiguration);
  const attributesObject = useAttributes(attributeNames);
  const inStockData = useSelector(getIsInStock);
  const { displayTutorial, tutorialStep, tutorialStepsNumber } =
    useSelector(getTutorial);
  const tutorialCSSDisplay =
    buttonName === DONE_BUTTON_LABEL &&
    displayTutorial &&
    tutorialStep === tutorialStepsNumber - 1;
  const dataDrivenSku =
    window.dataDrivenConfiguratorExtension?.getStatus()?.skus;

  const handleReset = useCallback(async (): Promise<void> => {
    dispatch<any>(setConfiguration(initialConfig));
    dispatch(setStep(0));

    const newTextInputs = Object.keys(formTextInputFields).reduce(
      (accumulator: any, key) => {
        accumulator[key] = '';
        return accumulator;
      },
      {}
    );

    dispatch(setFormTextInputFields(newTextInputs));
  }, [dispatch, initialConfig, formTextInputFields]);

  const clientUrl = useMemo((): string | undefined => {
    if (!globalSettingsParams?.configId || !baseUrlClient) return;

    const result = `https://${baseUrlClient}/${globalSettingsParams?.configId}`;
    return encodeURI(result);
  }, [globalSettingsParams, baseUrlClient]);

  const handleShare = useCallback(async (): Promise<void> => {
    /*    if (!clientUrl) {
      console.error('No clientUrl found (probably no configId)');
      return;
    } */

    if (appName === OOB_APPNAME || appName === CATALOGDESKTOP_APPNAME) {
      const eventDataShare = {
        eventName: 'ShareClientUrlAlpha',
        eventData: { clientUrl },
      };
      window.parent.postMessage(eventDataShare, '*');
    } else {
      await copyTextToClipboard('clientUrl');
    }
    showPopUp({
      popUpType: popUpTypes.linkCopied as PopUpType,
      functionOnClose: () => setClicked(false),
    });
  }, [clientUrl, appName]);

  const handleFinish = useCallback((): void => {
    console.log(disable);
    if (disable) {
      showPopUp({ popUpType: popUpTypes.notOrderableError });
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
    dispatch(setPage('summary'));
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

  const handleSupriseME = useCallback(async () => {
    setDisableSurpriseMe(true);
    dispatch(setPlayerLoading(true));
    if (attributeNames.length > 0) {
      const newConfig = await attributeNames.reduce((acc: any, item: any) => {

        const assetIds = attributesObject[item]?.data?.values
          .filter(
            (element: any) =>
              element?.sku !== 'NA' && inStockData![element.sku] === true
          )
          .map((data: any) => {
            return data.assetId;
          });
        const randomAsset =
          assetIds[Math.floor(Math.random() * assetIds.length)];
        acc[item] = { assetId: randomAsset };
        return acc
      }, {});

      dispatch(setConfiguration(newConfig));

      setTimeout(() => {
        setDisableSurpriseMe(false);
        dispatch(setPlayerLoading(false));
      }, 3000);
    }
  }, [attributesObject, attributeNames]);

  const handleEdit = useCallback((): void => {
    dispatch(setPage('home'));
    dispatch(closeRecap(true));
  }, [page, dispatch]);

  const handleItemAction = useCallback(
    async (action: 'wish' | 'cart'): Promise<void> => {
      setClicked(true);
      const leadTimeAndPrice: ILeadTimeAndPrice = {
        price,
        currency,
        minLeadTime,
        maxLeadTime,
      };
      const json = {
        ...configurationSavedData,
        metadata: { readableConfiguration },
        createdAt: new Date().toISOString(),
        clientUrl,
        productName,
        inStore: configurationSavedData?.inStore || false,
        kit_item_sku: dataDrivenSku.slice(1),
        sku_item: dataDrivenSku[0],
        attachments: {
          front:
            'https://lv-api.3kit.com/api/configurations/T7RLUBQ7/image/Front,1.webp',
          backAndFront:
            'https://lv-api.3kit.com/api/configurations/T7RLUBQ7/image/Side,1.webp',
          back: 'https://lv-api.3kit.com/api/configurations/T7RLUBQ7/image/Side,1.webp',
        },
      };

      let parsedJsonToSend: any = parseRecipe(json, leadTimeAndPrice);

      parsedJsonToSend.ThreekitID = globalSettingsParams['configId'] || '';
      parsedJsonToSend.action = action;

      if (isChina || appName === CATALOGWECOM_APPNAME) {
        parsedJsonToSend = Buffer.from(
          JSON.stringify(parsedJsonToSend)
        ).toString('base64');

        //@ts-ignore
        wx?.miniProgram.getEnv(function (res) {
          console.log('Hello China 2', res);
          if (res.miniprogram) {
            //@ts-ignore
            wx.miniProgram.postMessage({
              data: { threekitPersoProduct: parsedJsonToSend },
            });
            // @ts-ignore
            wx?.miniProgram.switchTab({
              url: `/pages/Basket/Basket`,
            });
          }
        });
      }

      if (appName === CATALOGDESKTOP_APPNAME || appName === OOB_APPNAME) {
        const eventDataShare = {
          eventName: 'handleItemAction',
          eventData: { parsedJsonToSend },
        };
        window.parent.postMessage(eventDataShare, '*');
      }

      if (window.webkit?.messageHandlers?.onAddToCart) {
        window.webkit.messageHandlers.onAddToCart.postMessage({
          message: parsedJsonToSend,
        });
        console.log('jsonAddToCart', parsedJsonToSend);
      } else {
        console.info('jsonAddToCart', parsedJsonToSend);
      }

      setTimeout(() => {
        console.log('AddToCartReleased');
        setClicked(false);
      }, 10000);
    },
    [
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
    ]
  );

  let label;
  let iconSrc;
  let secondIconSrc;
  let functionOnclick: Function;

  switch (buttonName) {
    case INSTOCK_BUTTON_LABEL:
      label = buttonText;
      iconSrc = INSTOCK_ICON;
      functionOnclick = () => { };
      break;
    case LEADTIME_BUTTON_LABEL:
      label = buttonText?.startsWith('Lead time') ? (
        <>
          {buttonText?.slice(0, 9)}
          <LabelBold>{buttonText?.slice(10)}</LabelBold>
        </>
      ) : (
        buttonText || 'Not orderable'
      );
      functionOnclick = () => { };
      break;
    case ZOOM_BUTTON_LABEL:
      label = '';
      iconSrc = isFullScreen ? UNZOOM_ICON : ZOOM_ICON;
      functionOnclick = fnButton;
      break;
    case HELPER_BUTTON_LABEL:
      label = '';
      functionOnclick = fnButton;
      break;
    case CLOSE_BUTTON_LABEL:
      label = '';
      iconSrc = CLOSE_ICON;
      functionOnclick = () => fnButton(false);
      break;
    case INFO_ZOOM_BUTTON_LABEL:
      label = t('info.zoom_press', { defaultValue: INFO_ZOOM_BUTTON_LABEL });
      iconSrc = ZOOM_ICON;
      secondIconSrc = INFO_PRESS_ICON;
      functionOnclick = () => { };
      break;
    case RESET_BUTTON_LABEL:
      label = t('button.label.reset', { defaultValue: RESET_BUTTON_LABEL });
      iconSrc = RESET_ICON;
      functionOnclick = handleReset;
      break;
    case SHARE_BUTTON_LABEL:
      label = t('button.label.share', { defaultValue: SHARE_BUTTON_LABEL });
      iconSrc = SHARE_ICON;
      functionOnclick = handleShare;
      break;
    case WISH_BUTTON_LABEL:
      label = t('button.label.wish', { defaultValue: WISH_BUTTON_LABEL });
      iconSrc = WISH_ICON;
      functionOnclick = () => {
        handleItemAction('wish');
      };
      break;
    case EDIT_BUTTON_LABEL:
      label = t('button.label.edit', { defaultValue: EDIT_BUTTON_LABEL });
      iconSrc = EDIT_ICON;
      functionOnclick = handleEdit;
      break;
    case DONE_BUTTON_LABEL:
      label = t('button.label.done', { defaultValue: DONE_BUTTON_LABEL });
      iconSrc = null;
      functionOnclick = handleFinish;
      break;
    case SURPRISE_ME_BUTTON_LABEL:
      label = t('button.label.surprise_me', { defaultValue: SURPRISE_ME_BUTTON_LABEL });
      iconSrc = null;
      functionOnclick = handleSupriseME;
      break;
    case ADDTOBAG_BUTTON_LABEL:
      label = t('button.label.add_to_bag', { defaultValue: ADDTOBAG_BUTTON_LABEL });
      iconSrc = null;
      functionOnclick = () => {
        handleItemAction('cart');
      };
      break;
    case MODIFY_BUTTON_LABEL:
      label = t('button.label.modify', { defaultValue: MODIFY_BUTTON_LABEL });
      iconSrc = null;
      functionOnclick = handleEdit;
      break;
    default:
      label = buttonName;
      iconSrc = null;
      functionOnclick = () => { };
  }

  const shareButtonDisabled = useMemo((): boolean => {
    return buttonName === SHARE_BUTTON_LABEL && clicked;
  }, [buttonName, clicked]);

  const AddToCartButtonDisabled = useMemo((): boolean => {
    return buttonName === ADDTOBAG_BUTTON_LABEL && true;
  }, [buttonName, clicked]);

  useEffect(() => {
    const isLoading =
      buttonName === DONE_BUTTON_LABEL &&
      clicked &&
      !disable &&
      !saveConfigurationError &&
      !notOrderable;
    setShowLoader(isLoading);
  }, [clicked, disable, notOrderable, buttonName, saveConfigurationError]);
  return (
    <>
      <ButtonContainer
        buttonName={buttonName}
        data-dtname={buttonName}
        isFullScreen={isFullScreen}
        onClick={(e) => {
          !tutorialCSSDisplay && functionOnclick(e);
        }}
        disabled={
          buttonName === SURPRISE_ME_BUTTON_LABEL ? disableSurpriseME : disable
        }
        summaryPage={summaryPage}
        displayTutorial={tutorialCSSDisplay}
      >
        {showLoader ? (
          <Loader />
        ) : (
          <>
            {secondIconSrc && (
              <img data-dtname={buttonName} alt="" src={secondIconSrc} />
            )}
            {iconSrc && <img data-dtname={buttonName} alt="" src={iconSrc} />}
            {!(
              buttonName === SHARE_BUTTON_LABEL ||
              buttonName === RESET_BUTTON_LABEL ||
              buttonName === WISH_BUTTON_LABEL
            ) &&
              buttonName !== INFO_ZOOM_BUTTON_LABEL &&
              label}
            {buttonName === INFO_ZOOM_BUTTON_LABEL && (
              <ButtonWrapper>{label}</ButtonWrapper>
            )}
          </>
        )}
      </ButtonContainer>
    </>
  );
};

export default OptionsButton;

const Loader = (): ReactElement => (
  <LoaderWrapper>
    <LoadingText>Loading</LoadingText>
    <Dot delay="0s" />
    <Dot delay="0.15s" />
    <Dot delay="0.3s" />
  </LoaderWrapper>
);
