import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import threekitApi from '../services';
import { getParams } from 'utils/function/navigationParams';
import { mappingLanguage } from 'utils/function/mapping';

export const initializeI18n = async (translationTableId: string) => {
  const params = getParams();
  const lng = mappingLanguage(params['lng'] || 'en_E1');

  const options: InitOptions = {
    debug: true,
    lng,
    fallbackLng: 'en_E1',
    interpolation: {
      escapeValue: false,
    },
  };

  try {
    const translation =
      await threekitApi.configurations.fetchThreekitDatatableTranslations({
        id: translationTableId,
        lng,
      });

    if (translation && Object.keys(translation).length > 0) {
      options.resources = {
        [lng]: {
          translation: translation,
        },
      };
    } else {
      console.error('Error: Translation is empty or not available.');
    }
  } catch (error) {
    console.error('Error fetching translation:', error);
  }

  i18n.use(HttpApi).use(initReactI18next).init(options);

  return options?.resources;
};
