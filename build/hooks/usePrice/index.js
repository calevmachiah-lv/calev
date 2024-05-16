"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const react_intl_1 = require("react-intl");
const react_redux_1 = require("react-redux");
const threekitHooks_1 = require("../../utils/threekitHooks");
const apiFn_1 = require("../../utils/function/apiFn");
const globalSettingsSlicer_1 = require("../../store/globalSettingsSlicer");
const ApiCalls_1 = require("../../utils/ApiCalls/ApiCalls");
const usePrice = () => {
    var _a, _b, _c;
    const { isMobile } = (0, threekitHooks_1.useWindowSize)();
    const params = (0, react_redux_1.useSelector)(globalSettingsSlicer_1.getGlobalSettingsParams);
    const { storeCode, country, lng, sku } = params || {};
    const skus = ((_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.dataDrivenConfiguratorExtension) === null || _a === void 0 ? void 0 : _a.getStatus()) === null || _b === void 0 ? void 0 : _b.skus) === null || _c === void 0 ? void 0 : _c[0]) || [sku];
    const queryKey = (0, react_1.useMemo)(() => ['productPrice', storeCode, skus, country, lng], [storeCode, skus, country, lng]);
    const { data, isLoading, isError, error } = (0, react_query_1.useQuery)({
        queryKey,
        queryFn: () => (0, ApiCalls_1.fetchPrice)({ lng, storeCode, skus, country, isMobile }),
        staleTime: 300000,
        refetchOnWindowFocus: false,
        enabled: Boolean(skus && storeCode && country && lng),
        retry: false,
    });
    return (0, react_1.useMemo)(() => {
        var _a, _b;
        if (isLoading || isError) {
            return { isLoading, isError, error };
        }
        const priceInfos = (_b = (_a = data === null || data === void 0 ? void 0 : data.skuList) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.priceSpecification;
        const price = priceInfos === null || priceInfos === void 0 ? void 0 : priceInfos.price;
        const currency = data === null || data === void 0 ? void 0 : data.currency;
        const priceWithCurrency = (0, apiFn_1.getPriceWithCurrency)(price, currency);
        const priceFormated = currency && price ? ((0, jsx_runtime_1.jsx)(react_intl_1.FormattedNumber, { style: "currency", currency: currency, value: price })) : ('');
        return {
            price,
            priceWithCurrency,
            priceFormated,
            currency,
            isLoading,
            isError,
            error,
        };
    }, [data, isLoading, isError, error]);
};
exports.default = usePrice;
