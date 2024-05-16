"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStock = void 0;
const react_redux_1 = require("react-redux");
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const selectors_1 = require("../../store/globalSettingsSlicer/selectors");
const ApiCalls_1 = require("../../utils/ApiCalls/ApiCalls");
const useStock = ({ skus }) => {
    const { storeCode, appName } = (0, react_redux_1.useSelector)(selectors_1.getGlobalSettingsParams) || {};
    const queryKey = (0, react_1.useMemo)(() => ['productStock', storeCode, skus], [storeCode, skus]);
    const skuToQtyArr = (0, react_1.useMemo)(() => {
        var _a;
        const skuToQty = (_a = skus === null || skus === void 0 ? void 0 : skus.filter((el) => (el === null || el === void 0 ? void 0 : el.length) > 4)) === null || _a === void 0 ? void 0 : _a.reduce((acc, sku) => {
            acc[sku] = (acc[sku] || 0) + 1;
            return acc;
        }, {});
        const arr = Object.entries(skuToQty).map(([sku, qty]) => ({
            item_id: sku,
            qty,
        }));
        return arr;
    }, [skus]);
    const { data, isLoading, isError, error } = (0, react_query_1.useQuery)({
        queryKey: queryKey,
        queryFn: () => (0, ApiCalls_1.fetchSkusAvailability)({
            items: skuToQtyArr,
            storeCode: storeCode || 'NJ1',
            appName,
        }),
        staleTime: 300000,
        enabled: (skus === null || skus === void 0 ? void 0 : skus.length) > 0,
        refetchOnWindowFocus: false,
        retry: false,
    });
    return { data, isLoading, isError, error };
};
exports.useStock = useStock;
exports.default = exports.useStock;
