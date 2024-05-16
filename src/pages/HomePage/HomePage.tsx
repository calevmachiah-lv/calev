import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/animations.scss';
import {
  useThreekitInitStatus,
  useWindowSize,
} from '../../utils/threekitHooks';
import { Container } from './Home.styles';
import { AnimateItem, AwaitPlayerLoad, Player2D } from '../../components';
import { useNavigate } from 'react-router';
import {
  getGlobalSettingsParams,
  getStep,
  setGlobalSettingsParams,
  setStep,
} from '../../store/globalSettingsSlicer';
import {
  getForm,
  getIsChina,
  getPage,
  setInitialConfiguration,
  getAttributes,
  setIsInStock,
} from '../../store/threekitSlicer';
import { setTutorialStepsNumber } from '../../store/flowSlicer';
import {
  RESET_STEP_ACCORDION,
  RESET_STEP_CAROUSEL,
  HOME_CONTAINER,
  TK_SAVED_CONFIG_PARAM_KEY,
  PORTRAIT_FORM_BASE_HEIGHT_IN_PX,
  LANDSCAPE_FORM_MAX_HEIGHT_IN_PX,
} from '../../utils/constants';
import { usePageTitle, useThreekitIdConfiguration } from '../../hooks';
import SummaryPage from '../SummaryPage/SummaryPage';
import useSavedConfiguration from '../../hooks/useSavedConfiguration';
import useUpdateFormAndPlayer from '../../hooks/usePlayerMode';
import {
  getParams,
  paramsObjectToNavigationString,
} from '../../utils/function/navigationParams';
import PortraitForm from './components/PortraitForm';
import LandscapeForm from './components/LandscapeForm';
import Tutorial from '../../components/Tutorial/Tutorial';
import { tutorialData } from '../../utils/mockData';
import { getDisplayTutorial } from '../../store/flowSlicer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import useStock from '../../hooks/useStock';
import { isChooseValue } from '../../utils/function/functions';

const Home = () => {
  useThreekitIdConfiguration();
  type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
  const dispatch = useDispatch<AppThunkDispatch>();
  usePageTitle({ page: 'home' });
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();
  const isLoaded = useThreekitInitStatus();
  const currentStep = useSelector(getStep);
  const globalSettingsParams = useSelector(getGlobalSettingsParams);
  const params = getParams();

  const form = useSelector(getForm);
  const isChina = useSelector(getIsChina);
  const pageToDisplay = useSelector(getPage) === 'home';
  const {
    configId,
    sku,
    [TK_SAVED_CONFIG_PARAM_KEY]: threekitId,
  } = globalSettingsParams || {
    configId: '',
    sku: '',
    threekitId: '',
  };
  const dataDrivenSku =
    window?.dataDrivenConfiguratorExtension?.getStatus()?.sku?.value;
  const { savedConfigurationData } = useSavedConfiguration(threekitId!);

  const { isRotable } = useUpdateFormAndPlayer({
    form,
    currentStep,
  });

  const [isInitialConfigurationSet, setIsInitialConfigutationSet] =
    useState(false);
  const displayTutorial = useSelector(getDisplayTutorial);

  useEffect(() => {
    if (isChina === undefined) return;
    if (!params.step || params.step < RESET_STEP_CAROUSEL) {
      const initialStep = isMobile ? RESET_STEP_CAROUSEL : RESET_STEP_ACCORDION;
      params.step = initialStep;
      dispatch(setStep(initialStep));
      const finalParams = paramsObjectToNavigationString(params, isChina);
      navigate(`/${finalParams}`);
    } else {
      dispatch(setStep(params.step));
    }
  }, [isChina, dispatch, navigate, isMobile]);

  useEffect(() => {
    const newParams = {
      ...globalSettingsParams,
      sku: dataDrivenSku,
    };
    if (dataDrivenSku !== sku) {
      dispatch(setGlobalSettingsParams(newParams));
    }
  }, [dataDrivenSku]);

  useEffect(() => {
    if (tutorialData?.steps?.length > 0) {
      dispatch(setTutorialStepsNumber(tutorialData?.steps?.length));
    }
  }, [tutorialData?.steps?.length]);

  useEffect(() => {
    if (isInitialConfigurationSet || !dataDrivenSku) return;
    const initiateConfiguration = async () => {
      const initialConfig =
        await window.threekit.configurator.getFullConfiguration();
      if (initialConfig) {
        dispatch(setInitialConfiguration(initialConfig));
        setIsInitialConfigutationSet(true);
      }
    };
    initiateConfiguration();
  }, [dataDrivenSku]);

  const attributes = useSelector(getAttributes());
  const allValuesSKUs: any = useMemo(
    () =>
      Object.values(attributes)
        .map((attribute) =>
          attribute.values.map((value: any) =>
            !isChooseValue(value) && value.sku ? value.sku : ''
          )
        )
        .flat()
        .filter((value) => value !== ''),
    [attributes]
  );

  const {
    data: skusInStock,
    isLoading,
    isError,
    error,
  } = useStock({
    skus: allValuesSKUs || [],
  });

  useEffect(() => {
    if (skusInStock?.items) dispatch(setIsInStock(skusInStock.items));
  }, [skusInStock, dispatch]);

  return (
    <>
      <Container overscroll={pageToDisplay} id={HOME_CONTAINER}>
        {pageToDisplay && (
          <AwaitPlayerLoad>
            <Player2D
              homePage
              cssDisplay={pageToDisplay && !displayTutorial}
              isMobile={isMobile}
              isRotable={isRotable}
              isLoaded={isLoaded}
              tutorialData={tutorialData}
              height={
                isMobile
                  ? `calc(100vh - ${PORTRAIT_FORM_BASE_HEIGHT_IN_PX}px)`
                  : `calc(100vh - ${LANDSCAPE_FORM_MAX_HEIGHT_IN_PX}px)`
              }
            >
              <AnimateItem />
            </Player2D>
            {pageToDisplay &&
              isLoaded &&
              (isMobile ? <PortraitForm /> : <LandscapeForm />)}
          </AwaitPlayerLoad>
        )}
        {!pageToDisplay && isLoaded && (
          <SummaryPage data={savedConfigurationData} />
        )}
        {displayTutorial && isLoaded && (
          <Tutorial tutorialData={tutorialData} />
        )}
      </Container>
    </>
  );
};

export default Home;

/*
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/animations.scss';
import {
  useThreekitInitStatus,
  useWindowSize,
} from '../../utils/threekitHooks';
import { Container } from './Home.styles';
import { AnimateItem, AwaitPlayerLoad, Player2D } from '../../components';
import { useNavigate } from 'react-router';
import {
  getGlobalSettingsParams,
  getStep,
  setGlobalSettingsParams,
  setStep,
} from '../../store/globalSettingsSlicer';
import {
  getForm,
  getIsChina,
  getPage,
  setInitialConfiguration,
  getAttributes,
  setIsInStock,
  getActiveAttribute
} from '../../store/threekitSlicer';
import {
  setTutorialStepsNumber
} from '../../store/flowSlicer';
import {
  RESET_STEP_ACCORDION,
  RESET_STEP_CAROUSEL,
  HOME_CONTAINER,
} from '../../utils/constants';
import { usePageTitle } from '../../hooks';
import SummaryPage from '../SummaryPage/SummaryPage';
import useSavedConfiguration from '../../hooks/useSavedConfiguration';
import useUpdateFormAndPlayer from '../../hooks/usePlayerMode';
import {
  getParams,
  paramsObjectToNavigationString,
} from '../../utils/function/navigationParams';

import PortraitForm from './components/PortraitForm';
import LandscapeForm from './components/LandscapeForm';
import { fetchIsSKUsInStock } from '../../utils/ApiCalls/ApiCalls';
import { useQuery } from '@tanstack/react-query';
import Tutorial from '../../components/Tutorial/Tutorial';
import { tutorialData } from '../../utils/mockData';
import { getDisplayTutorial } from '../../store/flowSlicer';

const Home = () => {
  usePageTitle({ page: 'home' });
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoaded = useThreekitInitStatus();
  const currentStep = useSelector(getStep);
  const activeAttribute = useSelector(getActiveAttribute);
  const globalSettingsParams = useSelector(getGlobalSettingsParams);

  const form = useSelector(getForm);
  const [allSkus, setSkus] = useState([]);
  const isChina = useSelector(getIsChina);
  const pageToDisplay = useSelector(getPage) === 'home';
  const { configId, sku } = globalSettingsParams || { configId: '', sku: '' };
  const dataDrivenSku =
    window?.dataDrivenConfiguratorExtension?.getStatus()?.sku?.value;
  const { savedConfigurationData } = useSavedConfiguration(configId!);

  const { isRotable } = useUpdateFormAndPlayer({
    form,
    currentStep
  });

  const [isInitialConfigurationSet, setIsInitialConfigutationSet] = useState(false);
  const displayTutorial = useSelector(getDisplayTutorial);

  useEffect(() => {
    if (isChina === undefined) return;
    const params = getParams();
    if (!params.step || params.step < RESET_STEP_CAROUSEL) {
      const initialStep = isMobile ? RESET_STEP_CAROUSEL : RESET_STEP_ACCORDION;
      params.step = initialStep;
      dispatch(setStep(initialStep));
      const finalParams = paramsObjectToNavigationString(params, isChina);
      navigate(`/${finalParams}`);
    } else {
      dispatch(setStep(params.step));
    }
  }, [isChina, dispatch, navigate, isMobile]);

  useEffect(() => {
    const newParams = {
      ...globalSettingsParams,
      sku: dataDrivenSku,
    };
    if (dataDrivenSku !== sku) {
      dispatch(setGlobalSettingsParams(newParams));
    }
  }, [dataDrivenSku]);

  useEffect(() => {
    if (tutorialData?.steps?.length > 0) {
      dispatch(setTutorialStepsNumber(tutorialData?.steps?.length));
    }
  }, [tutorialData?.steps?.length]);

  useEffect(() => {
    if (isInitialConfigurationSet || !dataDrivenSku) return;
    const initiateConfiguration = async () => {
      const initialConfig =
        await window.threekit.configurator.getFullConfiguration();
      if (initialConfig) {
        dispatch(setInitialConfiguration(initialConfig));
        setIsInitialConfigutationSet(true);
      }
    };
    initiateConfiguration();
  }, [dataDrivenSku]);

  const attributes = useSelector(getAttributes());
  const allValuesSKUs = useMemo(() => {
    return Object.values(attributes)
      .reduce((acc, attribute) => {
        // Check if the attribute is the active one
        if (attribute.name !== activeAttribute) return acc;

        // Extract SKUs from the attribute values
        const skus = attribute.values
          .filter((value: any) => !value?.name?.startsWith('Choose') && value.sku)
          .map((value: any) => value.sku);

        return acc.concat(skus);
      }, [])
      .filter((value: any) => value !== ''); // This line can be omitted if your data structure ensures 'sku' is never an empty string
  }, [activeAttribute, attributes]); // Added 'attributes' as a dependency


  const {
    data: skusInStock,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['stock', allSkus],
    queryFn: () =>
      fetchIsSKUsInStock({
        skus: allSkus,
      }),
    staleTime: 300000,
    enabled: allValuesSKUs?.length > 0,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    setSkus(allValuesSKUs)
  }, [activeAttribute]);

  useEffect(() => {
    dispatch(setIsInStock(skusInStock));
  }, [skusInStock, dispatch]);

  return (
    <>
      <Container overscroll={pageToDisplay} id={HOME_CONTAINER}>
        <AwaitPlayerLoad>
          <Player2D
            homePage
            cssDisplay={pageToDisplay && !displayTutorial}
            isMobile={isMobile}
            isRotable={isRotable}
            isLoaded={isLoaded}
            tutorialData={tutorialData}
          >
            <AnimateItem />
          </Player2D>
          {pageToDisplay &&
            isLoaded &&
            (isMobile ? <PortraitForm /> : <LandscapeForm />)}
        </AwaitPlayerLoad>
        {!pageToDisplay && isLoaded && savedConfigurationData && (
          <SummaryPage data={savedConfigurationData} />
        )}
        {displayTutorial && isLoaded && (
          <Tutorial tutorialData={tutorialData} />
        )}
      </Container>
    </>
  );
};

export default Home;

*/
