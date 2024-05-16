"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputEngraving = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const i18next_1 = require("i18next");
const threekitHooks_1 = require("../../../utils/threekitHooks");
const constants_1 = require("../../../utils/constants");
const textInput_styled_1 = require("./textInput.styled");
const selectors_1 = require("../../../store/globalSettingsSlicer/selectors");
const ApiCalls_1 = require("../../../utils/ApiCalls/ApiCalls");
const validationSlicer_1 = require("../../../store/validationSlicer");
const debounce_1 = require("../../../utils/function/debounce");
const hooks_1 = require("../../../hooks");
const TextInputEngraving = ({ attribute, type = 'text', insideOptionalGroup, }) => {
    var _a, _b, _c, _d, _e;
    const inputRef = (0, react_1.useRef)(null);
    (0, hooks_1.useInputDirection)({ inputRef });
    const { isMobile } = (0, threekitHooks_1.useWindowSize)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const [attributeData, setAttributeData] = (0, threekitHooks_1.useAttribute)(attribute.name);
    const { appName, lng, token, timestamp } = (0, react_redux_1.useSelector)(selectors_1.getGlobalSettingsParams);
    const regexString = ((_c = (_b = (_a = attributeData === null || attributeData === void 0 ? void 0 : attributeData.metadata) === null || _a === void 0 ? void 0 : _a.regex) === null || _b === void 0 ? void 0 : _b.slice(1, -1)) === null || _c === void 0 ? void 0 : _c.replace(/\\\\/g, '\\')) || '';
    const minLength = ((_d = attributeData === null || attributeData === void 0 ? void 0 : attributeData.metadata) === null || _d === void 0 ? void 0 : _d.minLength) || '';
    const maxLength = ((_e = attributeData === null || attributeData === void 0 ? void 0 : attributeData.metadata) === null || _e === void 0 ? void 0 : _e.maxLength) || '';
    const regexPattern = regexString ? new RegExp(regexString) : null;
    const [isPure, setIsPure] = (0, react_1.useState)(true);
    const formTextInputFields = (0, react_redux_1.useSelector)(validationSlicer_1.getFormTextInputFields);
    const memoizedCheckText = (0, react_1.useMemo)(() => {
        return (text) => __awaiter(void 0, void 0, void 0, function* () {
            if (!text || (text === null || text === void 0 ? void 0 : text.length) <= 1) {
                setIsPure(true);
                return;
            }
            const purity = yield (0, ApiCalls_1.checkTextPurity)({
                text,
                lng: String(lng),
                isMobile
            });
            setIsPure(purity.valid);
        });
    }, [lng, isMobile, appName, token, timestamp]);
    const debouncedCheck = (0, debounce_1.debounce)((text) => __awaiter(void 0, void 0, void 0, function* () {
        yield memoizedCheckText(text);
    }), 500);
    const handleChange = (e) => {
        const value = e.target.value;
        if (!value || (value === null || value === void 0 ? void 0 : value.length) <= 1) {
            if (!value) {
                setAttributeData('');
            }
            setIsPure(true);
        }
        if (!(regexPattern === null || regexPattern === void 0 ? void 0 : regexPattern.test(e.target.value)) && (value === null || value === void 0 ? void 0 : value.length) > 0) {
            e.preventDefault();
            return;
        }
        const currentFormTextInputFields = Object.assign(Object.assign({}, formTextInputFields), { [attribute.name]: value });
        dispatch((0, validationSlicer_1.setFormTextInputFields)(currentFormTextInputFields));
        if (type === 'text') {
            debouncedCheck(value);
        }
    };
    (0, react_1.useEffect)(() => {
        const inputValue = formTextInputFields[attribute.name];
        if (!isPure) {
            setAttributeData('');
        }
        else {
            if (!inputValue) {
                setAttributeData('');
                return;
            }
            if (!regexPattern || regexPattern.test(inputValue)) {
                setAttributeData(inputValue);
            }
        }
    }, [formTextInputFields[attribute.name], isPure]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(textInput_styled_1.WrapperTextInput, { onChange: handleChange, value: (formTextInputFields && formTextInputFields[attribute.name]) ||
                    (attributeData === null || attributeData === void 0 ? void 0 : attributeData.value) ||
                    '', placeholder: appName === constants_1.OOB_APPNAME ? attributeData === null || attributeData === void 0 ? void 0 : attributeData.displayName : '', minLength: minLength, maxLength: maxLength, insideOptionalGroup: insideOptionalGroup, ref: inputRef }), !isPure && ((0, jsx_runtime_1.jsxs)(textInput_styled_1.WarningText, { children: [(0, i18next_1.t)('key.for.warning.message.here', "Sorry, the text you've entered does not fit within our guidelines"), (0, jsx_runtime_1.jsx)("br", {}), (0, i18next_1.t)('key.for.input.new.text.here', 'Please enter a new text')] }))] }));
};
exports.TextInputEngraving = TextInputEngraving;
exports.TextInputEngraving.compatibleAttributes = new Set([
    constants_1.ATTRIBUTE_TYPES.string,
    constants_1.ATTRIBUTE_TYPES.number,
    constants_1.ATTRIBUTE_TYPES.asset,
    constants_1.ATTRIBUTE_TYPES.arraySelector,
]);
exports.default = exports.TextInputEngraving;
