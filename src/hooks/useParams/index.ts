import { useQuery } from '@tanstack/react-query';
import { createScriptIfRequired } from '../../utils/function/functions';
import { CATALOGWECOM_APPNAME } from '../../utils/constants';
import useTranslationInitialisation from '../useTranslationInitialisation';
import { useEffect, useMemo } from 'react';
import { useWindowSize } from '../../utils/threekitHooks';
import {
  fetchConfigVariables,
  getCatalogProductBySku,
} from '../../utils/ApiCalls/ApiCalls';
import { getParams } from '../../utils/function/navigationParams';
import { mappingLanguage } from '../../utils/function/mapping';

export const useParams = () => {
  const { isMobile } = useWindowSize();
  const params = getParams();
  const { sku, lng, tokenjwt } = params || {};
  const isChina = params?.appName === CATALOGWECOM_APPNAME;

  if (tokenjwt) {
    localStorage.setItem('tokenjwt', tokenjwt);
  }

  const {
    data: config,
    isLoading: isLoadingConfig,
    error: errorConfig,
  } = useQuery({
    queryKey: ['getConfigVariables'],
    queryFn: () => fetchConfigVariables(),
    staleTime: 300000,
    refetchOnWindowFocus: false,
    enabled: !!params,
    retry: false,
  });

  const {
    data: productInfos,
    isLoading: isLoadingProductId,
    error: errorProductId,
  } = useQuery({
    queryKey: ['product/getCatalogProductBySku', sku],
    queryFn: () => getCatalogProductBySku({ sku }),
    staleTime: 300000,
    refetchOnWindowFocus: false,
    enabled: !!sku && !!config,
    retry: false,
  });

  useEffect(() => {
    if (isChina) {
      createScriptIfRequired();
    }
  }, [isChina]);

  const { errorTranslation } = useTranslationInitialisation(
    config?.translationTableId
  );

  const newParams = useMemo(() => {
    return {
      ...config,
      productInfos: productInfos,
      isChina: isChina,
      locale: mappingLanguage(lng) || 'FR',
      compression: {
        imageResolution: isMobile ? '512' : '1024',
      },
    };
  }, [config, productInfos, isChina, lng]);

  const baseUrlClient = config?.baseUrlClient || '';

  const clientURLParams = useMemo(() => {
    const clientParams = { ...params };
    delete clientParams?.storeCode;
    delete clientParams?.country;
    delete clientParams?.timestamp;
    delete clientParams?.token;
    return clientParams;
  }, [params]);

  const isLoading = isLoadingConfig || isLoadingProductId;
  const error = `${errorConfig ? errorConfig + ' ' : ''}${errorProductId ? errorProductId + ' ' : ''
    }${errorTranslation ? errorTranslation : ''}`.trim();

  return {
    newParams,
    baseUrlClient,
    clientURLParams,
    isChina,
    isLoading,
    error,
  };
};

export default useParams;
