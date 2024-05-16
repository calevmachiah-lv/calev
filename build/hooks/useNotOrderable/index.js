"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotOrderable = void 0;
const react_1 = require("react");
const useAvaibility_1 = __importDefault(require("../useAvaibility"));
const usePrice_1 = __importDefault(require("../usePrice"));
const useStock_1 = __importDefault(require("../useStock"));
const react_redux_1 = require("react-redux");
const threekitSlicer_1 = require("../../store/threekitSlicer");
const useNotOrderable = () => {
    const sku = (0, react_redux_1.useSelector)(threekitSlicer_1.getSku);
    const { price, isLoading: priceIsLoading, isError: priceIsError, error: priceError, } = (0, usePrice_1.default)();
    const { leadTime, isLoading: leadTimeIsLoading, isError: leadTimeIsError, error: leadTimeError, } = (0, useAvaibility_1.default)();
    const { data: stockQuantity, isLoading: stockIsLoading, isError: stockIsError, error: stockError, } = (0, useStock_1.default)({
        skus: [sku],
    });
    const minLeadTime = leadTime === null || leadTime === void 0 ? void 0 : leadTime.min;
    const maxLeadTime = leadTime === null || leadTime === void 0 ? void 0 : leadTime.max;
    const isNotOrderable = (0, react_1.useMemo)(() => {
        return (((stockQuantity === undefined ||
            typeof stockQuantity !== 'number' ||
            stockQuantity < 1) &&
            (minLeadTime === undefined || minLeadTime === null) &&
            (maxLeadTime === undefined || maxLeadTime === null)) ||
            !price ||
            priceIsError ||
            (leadTimeIsError && stockIsError) ||
            priceIsLoading ||
            leadTimeIsLoading ||
            stockIsLoading);
    }, [
        stockQuantity,
        price,
        priceIsError,
        leadTimeIsError,
        stockIsError,
        priceIsLoading,
        leadTimeIsLoading,
        stockIsLoading,
        minLeadTime,
        maxLeadTime,
    ]);
    const notOrderableError = `${priceError ? priceError + ' ' : ''}${leadTimeError ? leadTimeError + ' ' : ''}${stockError ? stockError : ''}`.trim();
    return { isNotOrderable, notOrderableError };
};
exports.useNotOrderable = useNotOrderable;
exports.default = exports.useNotOrderable;
