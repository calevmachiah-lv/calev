"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderButtons = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const orderButtons_styles_1 = require("./orderButtons.styles");
const assets_1 = require("../../assets");
const useSwipe_1 = __importDefault(require("../../hooks/useSwipe"));
// Mock data
const buttons = {
    next: {
        findInStore: {
            label: 'Find in store',
            next: {
                text: 'Find the nearest store to you',
                store: {
                    label: 'Store',
                    subLabel: 'Louis Vuitton',
                    img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
                    next: {
                        text: 'Louis Vuitton Store, 5th Avenue, New York',
                        address: {
                            label: 'Address',
                            subLabel: 'Louis Vuitton Store, 5th Avenue, New York',
                            img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
                        },
                        openingHours: {
                            label: 'Opening hours',
                            subLabel: 'Mon-Sat: 10AM - 8PM, Sun: 11AM - 6PM',
                            img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
                        },
                    },
                },
                address: {
                    label: 'Address',
                    subLabel: 'Louis Vuitton Store, 5th Avenue, New York',
                    img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
                },
                openingHours: {
                    label: 'Opening hours',
                    subLabel: 'Mon-Sat: 10AM - 8PM, Sun: 11AM - 6PM',
                    img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
                },
            },
        },
        productDetails: {
            label: 'Product details',
            next: {
                text: 'The Speedy 18 is the perfect miniature version of Louis Vuitton’s iconic Speedy bag. Crafted from Monogram canvas with natural cowhide trim, it features two top handles and a detachable strap for shoulder or cross-body wear. The bag’s secure zip closure opens to reveal a spacious, well-organized interior. The Speedy 18 can be carried by hand, on the shoulder, or across the body.',
                bag: {
                    label: 'Bag',
                    subLabel: 'Veautwist Wisteria',
                    img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
                },
                charms: {
                    label: 'Charms',
                    subLabel: 'LV Logo white | Cake Creme | Eiffel Tower',
                    img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
                    next: {
                        text: 'With the new Adjustable Strap, it’s easy to customize your Speedy bag to suit your style. Crafted from Monogram canvas, this versatile strap features a VVN leather shoulder pad and gold-color hardware. It’s adjustable for comfortable shoulder or cross-body wear, and can be used with a variety of bags in the Louis Vuitton collection.',
                        moreDetails: {
                            label: 'More details',
                            subLabel: 'Adjustable Strap',
                            img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
                        },
                    },
                },
                carryStyle: {
                    label: 'Carry Style',
                    subLabel: 'Short strap 40',
                    img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
                },
                addOn: {
                    label: 'Add-on',
                    subLabel: 'Heart purse',
                    img: 'https://lv-kitting.s3.eu-north-1.amazonaws.com/tutorial/product-new-0.png',
                },
            },
        },
        deliveryAndReturns: {
            label: 'Delivery & returns',
            next: null,
        },
        gifting: {
            label: 'Gifting',
            next: null,
        },
    },
};
const DataComponent = ({ button, firstPage, handleButtonClick, }) => {
    var _a;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(button === null || button === void 0 ? void 0 : button.label) && (0, jsx_runtime_1.jsx)(orderButtons_styles_1.Title, { firstPage: firstPage, children: button.label }), (button === null || button === void 0 ? void 0 : button.next) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [((_a = button.next) === null || _a === void 0 ? void 0 : _a.text) && (0, jsx_runtime_1.jsx)(orderButtons_styles_1.Text, { children: button.next.text }), (0, jsx_runtime_1.jsx)(orderButtons_styles_1.ButtonsWrapper, { children: Object.entries(button.next).map(([key, value]) => key !== 'text' && ((0, jsx_runtime_1.jsxs)(orderButtons_styles_1.ButtonWrapper, { onClick: () => handleButtonClick(value), children: [value.img && ((0, jsx_runtime_1.jsx)("img", { className: "thumbnail", src: value.img, alt: value.label })), (0, jsx_runtime_1.jsxs)(orderButtons_styles_1.ButtonTextWrapper, { children: [(0, jsx_runtime_1.jsx)(orderButtons_styles_1.ButtonLabel, { children: value.label }), (0, jsx_runtime_1.jsx)(orderButtons_styles_1.ButtonSubLabel, { children: value.subLabel })] }), (0, jsx_runtime_1.jsx)("img", { className: "arrow", src: assets_1.RIGHT_ARROW_SLIDER_BLACK, alt: "right arrow" })] }, key))) })] }))] }));
};
const OrderButtons = () => {
    const [openedButton, setOpenedButton] = (0, react_1.useState)(buttons);
    const [prevStack, setPrevStack] = (0, react_1.useState)([buttons]);
    const wrapperComponent = (0, react_1.useRef)(null);
    const openedComponent = (0, react_1.useRef)(null);
    const { handleTouchStart, handleTouchEnd } = (0, useSwipe_1.default)(() => handleClose(), () => { }, 100);
    const firstPage = prevStack.length === 2;
    const opened = prevStack.length > 1;
    const slideComponent = (0, react_1.useCallback)((direction) => {
        if (!openedComponent.current)
            return;
        openedComponent.current.style.transition = 'none';
        openedComponent.current.style.transform =
            direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
        setTimeout(() => {
            if (!openedComponent.current)
                return;
            openedComponent.current.style.transition = 'transform 0.3s, top 0.3s';
            openedComponent.current.style.transform = 'translateX(0)';
        }, 0);
    }, []);
    const handleButtonClick = (0, react_1.useCallback)((button) => {
        if (opened)
            slideComponent('right');
        setPrevStack([...prevStack, button]);
        setOpenedButton(button);
    }, [prevStack, opened, slideComponent]);
    const handleClose = () => {
        if (!openedComponent.current)
            return;
        if (prevStack.length > 2)
            slideComponent('left');
        const prevStackVar = [...prevStack];
        const prevButton = prevStackVar[prevStackVar.length - 2];
        setOpenedButton(prevButton || null);
        setPrevStack(prevStackVar.slice(0, prevStackVar.length - 1));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(orderButtons_styles_1.MainWrapper, { children: (0, jsx_runtime_1.jsx)(DataComponent, { button: buttons, firstPage: true, handleButtonClick: handleButtonClick }) }), (0, jsx_runtime_1.jsx)(orderButtons_styles_1.DataWrapper, { open: opened, ref: wrapperComponent, onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, children: (0, jsx_runtime_1.jsxs)("div", { ref: openedComponent, style: { position: 'relative' }, children: [(0, jsx_runtime_1.jsx)(orderButtons_styles_1.CloseButton, { className: firstPage ? 'close' : 'back', onClick: handleClose, src: firstPage ? assets_1.CLOSE_ICON_BLACK : assets_1.LEFT_ARROW_SLIDER_BLACK }), (0, jsx_runtime_1.jsx)(DataComponent, { button: openedButton, firstPage: firstPage, handleButtonClick: handleButtonClick })] }) })] }));
};
exports.OrderButtons = OrderButtons;
