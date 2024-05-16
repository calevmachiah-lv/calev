import { useDispatch } from 'react-redux';
import { getParams } from '../../utils/function/navigationParams';
import { mappingLanguage } from '../../utils/function/mapping';
import { useQuery } from '@tanstack/react-query';
import { fetchThreekitDatatableTranslations } from '../../services/configurations';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';

const useTranslationInitialisation = (translationTableId: string) => {
  const params = getParams();
  const { lng: language, ...paramsRest } = params || {};
  const lng = mappingLanguage(language || 'en_E1');
  const options: any = {
    debug: true,
    lng,
    paramsRest,
  };


  const {
    data: translations,
    isLoading: isLoadingTranslation,
    error: errorTranslation,
  } = useQuery({
    queryKey: ['product/fetchTranslations', translationTableId],
    queryFn: () => {
      const payload = fetchThreekitDatatableTranslations({
        id: translationTableId,
        lng,
      });
      if (!payload) {
        console.error('error fetching translations');
      }

      return payload;
    },
    staleTime: 300000,
    refetchOnWindowFocus: false,
    enabled: !!translationTableId && !!paramsRest,
    retry: false,
  });

  options.resources = {
    [lng]: {
      translation: translations,
    },
  };
  if (translations && !i18n.isInitialized) {
    i18n.use(HttpApi).use(initReactI18next).init(options);
  }

  return { translations, isLoadingTranslation, errorTranslation };
};

export default useTranslationInitialisation;
