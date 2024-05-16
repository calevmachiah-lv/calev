import React from 'react';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { useWindowSize } from '../../utils/threekitHooks';
import { getGlobalSettingsParams } from '../../store/globalSettingsSlicer/selectors';
import OptionsButton from '../Form/OptionsButton';
import {
  Container,
  ProductSKU,
  InnerContainer,
  ProductName,
  Wrapper,
  ShareAndWish,
  ShareAndWishImage,
} from './TopSection.styles';
import {
  CATALOGDESKTOP_APPNAME,
  SHARE_BUTTON_LABEL,
  WISH_BUTTON_LABEL,
} from '../../utils/constants';
import ProductPrice from '../ProductPrice';
import { useProductName } from '../../hooks';
import { SHARE_ICON, WISH_ICON } from '../../assets';

const TopSection = ({ summaryPage }: any) => {
  const { isMobile } = useWindowSize();
  const globalSettingsParams = useSelector(getGlobalSettingsParams);
  const { appName, sku, configId } = globalSettingsParams || {};
  const productNameThreekit = useProductName();

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

  return (
    <Container>
      <InnerContainer>
        <Wrapper>
          <ProductSKU>M23203</ProductSKU>
          <ShareAndWish>
            <OptionsButton buttonName={SHARE_BUTTON_LABEL} />
            <OptionsButton buttonName={WISH_BUTTON_LABEL} />
          </ShareAndWish>
        </Wrapper>
        <ProductName>{t(productNameThreekit, productNameThreekit)}</ProductName>
        <ProductPrice />
      </InnerContainer>
    </Container>
  );
};

export default TopSection;
