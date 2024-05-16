import { t } from 'i18next';

export const mappingLanguage = (lng: string | undefined): string => {
  switch (lng) {
    case 'de':
      return 'de_DE';

    case 'de_DE':
      return 'de_DE';

    case 'deu':
      return 'de_DE';

    case 'en_E1':
      return 'en_E1';

    case 'ENG':
      return 'en_E1';

    case 'eng':
      return 'en_E1';

    case 'en':
      return 'en_E1';

    case 'es_ES':
      return 'es_ES';

    case 'esp':
      return 'es_ES';

    case 'es':
      return 'es_ES';

    case 'fr_FR':
      return 'fr_FR';

    case 'fra':
      return 'fr_FR';

    case 'fr':
      return 'fr_FR';

    case 'it_IT':
      return 'it_IT';

    case 'ita':
      return 'it_IT';

    case 'it':
      return 'it_IT';

    case 'ja_JP':
      return 'ja_JP';

    case 'ja':
      return 'ja_JP';

    case 'jpn':
      return 'ja_JP';

    case 'ko':
      return 'ko_KR';

    case 'ko_KR':
      return 'ko_KR';

    case 'kor':
      return 'ko_KR';

    case 'pt':
      return 'pt_BR';

    case 'pt_BR':
      return 'pt_BR';

    case 'por':
      return 'pt_BR';

    case 'ru':
      return 'ru_RU';

    case 'ru_RU':
      return 'ru_RU';

    case 'rus':
      return 'ru_RU';

    case 'zh_CN':
      return 'zh_CN';

    case 'zh-Hans-CN':
      return 'zh_CN';

    case 'zhs':
      return 'zh_CN';

    case 'zh-Hant-HK':
      return 'zh_HK';

    case 'zh_HK':
      return 'zh_HK';

    case 'zh-Hant-TW':
      return 'zh_TW';

    case 'zht':
      return 'zh_TW';

    default:
      return 'en_E1';
  }
};

export const localePriceMapping = (country: string | undefined): string => {
  switch (country?.toLowerCase()) {
    case 'ae':
      return 'ara-ae';

    case 'kw':
      return 'ara-kw';

    case 'qa':
      return 'ara-qa';

    case 'sa':
      return 'ara-sa';

    case 'de':
      return 'deu-de';

    case 'ae':
      return 'eng-ae';

    case 'at':
      return 'eng-at';

    case 'au':
      return 'eng-au';

    case 'be':
      return 'eng-be';

    case 'ca':
      return 'eng-ca';

    case 'dk':
      return 'eng-dk';

    case 'fi':
      return 'eng-fi';

    case 'gb':
      return 'eng-gb';

    case 'hk':
      return 'eng-hk';

    case 'id':
      return 'eng-id';

    case 'ie':
      return 'eng-ie';

    case 'in':
      return 'eng-in';

    case 'kw':
      return 'eng-kw';

    case 'lu':
      return 'eng-lu';

    case 'my':
      return 'eng-my';

    case 'nl':
      return 'eng-nl';

    case 'nz':
      return 'eng-nz';

    case 'oa':
      return 'eng-oa';

    case 'qa':
      return 'eng-qa';

    case 'sa':
      return 'eng-sa';

    case 'se':
      return 'eng-se';

    case 'sg':
      return 'eng-sg';

    case 'rus':
      return 'ru_RU';

    case 'us':
      return 'eng-us';

    case 'es':
      return 'esp-es';

    case 'mx':
      return 'esp-mx';

    case 'ca':
      return 'fra-ca';

    case 'zh_HK':
      return 'zh_HK';

    case 'fr':
      return 'fra-fr';

    case 'it':
      return 'ita-it';

    case 'jp':
      return 'jpn-jp';

    case 'kr':
      return 'kor-kr';

    case 'br':
      return 'por-br';

    case 'ru':
      return 'rus-ru';

    case 'th':
      return 'tha-th';

    case 'vn':
      return 'vie-vn';

    case 'cn':
      return 'zhs-cn';

    case 'hk':
      return 'zht-hk';

    case 'tw':
      return 'zht-tw';

    default:
      return 'eng-e1';
  }
};

export const webPurifyLanguageMappings = (lng: string): string => {
  switch (lng) {
    case 'de_DE':
      return 'de';

    case 'deu':
      return 'de';

    case 'en_E1':
      return 'en';

    case 'ENG':
      return 'en';

    case 'eng':
      return 'en';

    case 'es_ES':
      return 'es';

    case 'esp':
      return 'es';

    case 'fr_FR':
      return 'fr';

    case 'fra':
      return 'fr';

    case 'it_IT':
      return 'it';

    case 'ita':
      return 'it';

    case 'ja_JP':
      return 'ja';

    case 'jpn':
      return 'ja';

    case 'ko_KR':
      return 'ko';

    case 'kor':
      return 'ko';

    case 'pt_BR':
      return 'pt';

    case 'por':
      return 'pt';

    case 'ru_RU':
      return 'ru';

    case 'rus':
      return 'ru';

    case 'zh_CN':
      return 'zh';

    case 'zhs':
      return 'zh';

    case 'zh_HK':
      return 'zh';

    case 'zht':
      return 'zh';

    default:
      return 'en';
  }
};

export function translateLeadTime(leadTime: string, leadTimeUnit: string) {
  let translationKey: string;

  switch (leadTimeUnit) {
    case 'day_one':
      translationKey = 'stock.label.date.day_one';
      break;
    case 'days':
      translationKey = 'stock.label.date.day_other';
      break;
    case 'day_zero':
      translationKey = 'stock.label.date.day_zero';
      break;
    case 'month_one':
      translationKey = 'stock.label.date.month_one';
      break;
    case 'month_other':
      translationKey = 'stock.label.date.month_other';
      break;
    case 'week_one':
      translationKey = 'stock.label.date.week_one';
      break;
    case 'weeks':
      translationKey = 'stock.label.date.week_other';
      break;
    default:
      translationKey = 'stock.label.date.day_other';
  }

  return t(translationKey, { leadTime, interpolation: { escapeValue: false } });
}

export interface ILeadTimeAndPrice {
  maxLeadTime?: number;
  minLeadTime?: number;
  price?: number | null;
  currency?: string;
}

interface IInputJson {
  metadata?: {
    readableConfiguration?: Record<
      string,
      {
        index?: number;
        value: any;
        thumbnailPath?: string;
        thumbnail?: string;
        thumbnailColor?: string;
      }
    >;
  };
  createdAt?: string;
  shortId?: string;
  attachments?: Record<string, any>;
  clientUrl?: string;
  editUrl?: string;
  productName?: string;
  inStore?: boolean;
  kit_item_sku?: string;
  sku_item: string
}
interface IConfigItem {
  label: string;
  index: number;
  value: any;
  thumbnailPath?: string;
  thumbnailColor?: string;
}
interface IOutputJson {
  readableConfiguration: IConfigItem[];
  createdAt: string;
  threekitID: string;
  attachments?: Record<string, any>;
  clientUrl: string;
  editUrl: string;
  productName: string;
  inStore: boolean;
  leadTime: number;
  price: number;
  currency: string;
  kit_item_sku: string | string[];
  sku_item: string;
}

export const parseRecipe = (
  inputJson: IInputJson,
  leadTimeAndPrice: ILeadTimeAndPrice
): IOutputJson => {
  let readableConfig: IConfigItem[] = [];
  let index = 0;
  for (const [key, value] of Object.entries(
    inputJson?.metadata?.readableConfiguration || {}
  )) {
    const configItem: IConfigItem = {
      label: key,
      index: value.index || index || 0,
      value: value.value,
      thumbnailPath: value?.thumbnailPath || value?.thumbnail,
      thumbnailColor: value?.thumbnailColor,
    };
    readableConfig.push(configItem);
    index++;
  }
  const outputJson: IOutputJson = {
    readableConfiguration: readableConfig,
    createdAt: inputJson?.createdAt || '',
    threekitID: inputJson?.shortId || '',
    attachments: Object.keys(inputJson?.attachments || {})?.length
      ? inputJson?.attachments
      : undefined,
    clientUrl: inputJson?.clientUrl || '',
    editUrl: inputJson?.editUrl || '',
    productName: inputJson?.productName || '',
    inStore: inputJson?.inStore || false,
    leadTime: leadTimeAndPrice?.maxLeadTime || leadTimeAndPrice?.minLeadTime || 0,
    price: leadTimeAndPrice?.price || 0,
    currency: leadTimeAndPrice?.currency || '',
    kit_item_sku: inputJson?.kit_item_sku || '',
    sku_item: inputJson?.sku_item || '',
  };

  return outputJson;
};
