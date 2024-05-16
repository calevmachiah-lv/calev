"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popUpTypes = void 0;
const assets_1 = require("../../assets");
const defaultConfiguration = {
    autoHideDuration: 5000,
    preventDuplicate: true,
    variant: 'none',
    style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        fontFamily: 'LouisVuitton_Regular',
        borderRadius: '8px',
        fontSize: '14px',
        maxWidth: '350px',
        fontWeight: '400',
        lineHeight: '20px',
        letterSpacing: '0.4px',
        textAlign: 'center',
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.04), 0px 12px 20px 0px rgba(0, 0, 0, 0.08)',
    },
};
const styles = {
    notificationWhite: Object.assign(Object.assign({}, defaultConfiguration.style), { backgroundColor: '#FFFFFF', color: '#2C2C2C', leftImageStyle: {
            width: '62px',
            backgroundColor: '#e6e6e6',
            padding: '10px',
            borderBottomLeftRadius: '8px 8px',
            borderTopLeftRadius: '8px 8px',
        }, leftImage: assets_1.PRODUCT, boxShadow: '3px 3px 5px 0 rgba(0, 0, 0, 0.1)' }),
    notificationBlack: Object.assign(Object.assign({}, defaultConfiguration.style), { backgroundColor: '#2C2C2C', color: '#FFFFFF', leftImage: assets_1.DIALOG, leftImageStyle: { width: '32px', margin: '10px' } }),
    error: Object.assign(Object.assign({}, defaultConfiguration.style), { backgroundColor: '#D23030', color: '#FFFFFF', leftImage: assets_1.INFO, leftImageStyle: { width: '32px', margin: '10px' } }),
};
exports.popUpTypes = {
    quantityError: Object.assign(Object.assign({}, defaultConfiguration), { style: styles.error, popUpMessageKey: 'error.stock_quantity', popUpMessage: 'Error fetching stock quantity' }),
    leadTimeError: Object.assign(Object.assign({}, defaultConfiguration), { style: styles.error, popUpMessageKey: 'error.leadtime', popUpMessage: 'Error fetching the leadtime' }),
    webPurifyError: Object.assign(Object.assign({}, defaultConfiguration), { style: styles.error, popUpMessageKey: 'error.text_purity', popUpMessage: 'Error verifying text' }),
    priceError: Object.assign(Object.assign({}, defaultConfiguration), { style: styles.error, popUpMessageKey: 'error.price', popUpMessage: 'Error fetching the price' }),
    savedConfigurationError: Object.assign(Object.assign({}, defaultConfiguration), { style: styles.error, popUpMessageKey: 'error.getconfiguration', popUpMessage: 'Error fetching the configuration' }),
    notOrderableError: Object.assign(Object.assign({}, defaultConfiguration), { style: styles.notificationWhite, popUpMessageKey: 'error.Customization', popUpMessage: 'Incomplete Customization - Please Complete Your Bag Configuration ' }),
    // notOrderableError: {
    //   ...defaultConfiguration,
    //   style: styles.notificationBlack,
    //   popUpMessageKey: 'error.notorderable',
    //   popUpMessage: 'This product is not orderable',
    // },
    missingFieldError: Object.assign(Object.assign({}, defaultConfiguration), { style: styles.notificationBlack, popUpMessageKey: 'error.label.missing_field', popUpMessage: 'Missing field' }),
    linkCopied: Object.assign(Object.assign({}, defaultConfiguration), { style: styles.notificationWhite, popUpMessageKey: 'info.share_link_copied', popUpMessage: 'Link copied to clipboard' }),
    outOfStock: Object.assign(Object.assign({}, defaultConfiguration), { style: styles.error, popUpMessageKey: 'error.out_of_stock', popUpMessage: 'This product is out of stock' }),
};
