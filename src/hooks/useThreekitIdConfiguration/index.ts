import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setDisplayTutorial } from '../../store/flowSlicer';
import { setConfiguration, setPage } from '../../store/threekitSlicer';
import { useThreekitInitStatus } from '../../utils/threekitHooks';
import { RootState } from '../../store';
import { getParams } from '../../utils/function/navigationParams';
import { TK_SAVED_CONFIG_PARAM_KEY } from '../../utils/constants';
import { PopUpType, showPopUp } from '../../components/PopUp/ShowPopUp';
import { popUpTypes } from '../../components/PopUp/PopUpType';
import useSavedConfiguration from '../useSavedConfiguration';
import { isEmptyObj } from '../../utils/function/functions';
import useStock from '../useStock';

function useThreekitIdConfiguration() {
  type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
  const dispatch = useDispatch<AppThunkDispatch>();
  const isLoaded = useThreekitInitStatus();
  const params = getParams();
  const threekitId = params?.[TK_SAVED_CONFIG_PARAM_KEY] || '';
  const {
    savedConfigurationData,
    isLoadingSavedConfigurationData,
    isErrorSavedConfigurationData,
    errorSavedConfigurationData,
  } = useSavedConfiguration(threekitId);

  const [savedConfiguration, isConfigurationExists] = useMemo(
    () => [
      savedConfigurationData?.configuration || {},
      !isEmptyObj(savedConfigurationData?.configuration || {}),
    ],
    [savedConfigurationData]
  );

  useEffect(() => {
    const openPDPRecap = () => {
      dispatch(setDisplayTutorial(false));
      dispatch(setPage(''));
    };
    if (isConfigurationExists) {
      openPDPRecap();
      dispatch(setConfiguration(savedConfiguration));
    }
  }, [isConfigurationExists, dispatch, savedConfiguration]);

  const {
    data: inStockData,
    isLoading: inStockLoading,
    isError: inStockError,
    error: inStockErrorData,
  } = useStock({
    skus: savedConfigurationData?.skus || [],
  });

  useEffect(() => {
    if (
      threekitId &&
      isLoaded &&
      !inStockLoading &&
      !inStockError &&
      !inStockData?.allSkusAvailable
    ) {
      showPopUp({
        popUpType: popUpTypes.outOfStock as PopUpType,
      });
    }
  }, [inStockData, isLoaded]);
}

export default useThreekitIdConfiguration;
