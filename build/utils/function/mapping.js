"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRecipe = exports.translateLeadTime = exports.webPurifyLanguageMappings = exports.localePriceMapping = exports.mappingLanguage = void 0;
const i18next_1 = require("i18next");
const mappingLanguage = (lng) => {
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
exports.mappingLanguage = mappingLanguage;
const localePriceMapping = (country) => {
    switch (country === null || country === void 0 ? void 0 : country.toLowerCase()) {
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
exports.localePriceMapping = localePriceMapping;
const webPurifyLanguageMappings = (lng) => {
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
exports.webPurifyLanguageMappings = webPurifyLanguageMappings;
function translateLeadTime(leadTime, leadTimeUnit) {
    let translationKey;
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
    return (0, i18next_1.t)(translationKey, { leadTime, interpolation: { escapeValue: false } });
}
exports.translateLeadTime = translateLeadTime;
const parseRecipe = (inputJson, leadTimeAndPrice) => {
    var _a, _b;
    let readableConfig = [];
    let index = 0;
    for (const [key, value] of Object.entries(((_a = inputJson === null || inputJson === void 0 ? void 0 : inputJson.metadata) === null || _a === void 0 ? void 0 : _a.readableConfiguration) || {})) {
        const configItem = {
            label: key,
            index: value.index || index || 0,
            value: value.value,
            thumbnailPath: (value === null || value === void 0 ? void 0 : value.thumbnailPath) || (value === null || value === void 0 ? void 0 : value.thumbnail),
            thumbnailColor: value === null || value === void 0 ? void 0 : value.thumbnailColor,
        };
        readableConfig.push(configItem);
        index++;
    }
    const outputJson = {
        readableConfiguration: readableConfig,
        createdAt: (inputJson === null || inputJson === void 0 ? void 0 : inputJson.createdAt) || '',
        threekitID: (inputJson === null || inputJson === void 0 ? void 0 : inputJson.shortId) || '',
        attachments: ((_b = Object.keys((inputJson === null || inputJson === void 0 ? void 0 : inputJson.attachments) || {})) === null || _b === void 0 ? void 0 : _b.length)
            ? inputJson === null || inputJson === void 0 ? void 0 : inputJson.attachments
            : undefined,
        clientUrl: (inputJson === null || inputJson === void 0 ? void 0 : inputJson.clientUrl) || '',
        editUrl: (inputJson === null || inputJson === void 0 ? void 0 : inputJson.editUrl) || '',
        productName: (inputJson === null || inputJson === void 0 ? void 0 : inputJson.productName) || '',
        inStore: (inputJson === null || inputJson === void 0 ? void 0 : inputJson.inStore) || false,
        leadTime: (leadTimeAndPrice === null || leadTimeAndPrice === void 0 ? void 0 : leadTimeAndPrice.maxLeadTime) || (leadTimeAndPrice === null || leadTimeAndPrice === void 0 ? void 0 : leadTimeAndPrice.minLeadTime) || 0,
        price: (leadTimeAndPrice === null || leadTimeAndPrice === void 0 ? void 0 : leadTimeAndPrice.price) || 0,
        currency: (leadTimeAndPrice === null || leadTimeAndPrice === void 0 ? void 0 : leadTimeAndPrice.currency) || '',
        kit_item_sku: (inputJson === null || inputJson === void 0 ? void 0 : inputJson.kit_item_sku) || '',
        sku_item: (inputJson === null || inputJson === void 0 ? void 0 : inputJson.sku_item) || '',
    };
    return outputJson;
};
exports.parseRecipe = parseRecipe;
