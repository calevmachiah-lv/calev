import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  ContentWrapper,
  WrapperContainer,
  ConfigurationSection,
} from './SummaryPage.styles';
import { useThreekitInitStatus } from '../../utils/threekitHooks';
import TopSection from '../../components/TopSection/TopSection';
import { usePageTitle } from '../../hooks';
import ConfigurationSectionContent from '../components/ConfigurationSectionContent';
import { ButtonsSection } from './components/ButtonsSection';
import ProductImage from './components/ProductImage';
import { getGlobalSettingsParams } from '../../store/globalSettingsSlicer/selectors';
import { SummaryButtons } from '../../components/SummaryButtons';
import { OrderButtons } from '../../components/OrderButtons';

const SummaryPage = ({ data }: any) => {
  usePageTitle({ page: 'summary' });
  const globalSettingsParams = useSelector(getGlobalSettingsParams);
  const { appName } = globalSettingsParams || {};
  const isLoaded = useThreekitInitStatus();
  const [attributesToDisplay, setAttributesToDisplay] = useState<any>();
  const [productImages, setProductImages] = useState(data?.attachments || {});

  return (
    <>
      <Container>
        <ProductImage productImages={productImages} isLoading={isLoaded} />
        <ContentWrapper>
          <WrapperContainer>
            <TopSection summaryPage />
            <SummaryButtons />
            <OrderButtons />
          </WrapperContainer>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default SummaryPage;
