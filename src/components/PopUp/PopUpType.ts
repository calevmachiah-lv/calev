import { DIALOG, INFO, PRODUCT } from '../../assets';

export interface PopUpPosition {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

interface PopUpConfiguration {
  autoHideDuration: number;
  preventDuplicate: boolean;
  variant: 'default' | 'success' | 'error' | 'warning' | 'info' | 'none';
  style?: any;
  popUpMessageKey?: string;
  popUpMessageDefault?: string;
  popUpMessage?: string;
  position?: PopUpPosition;
}

const defaultConfiguration: PopUpConfiguration = {
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
    boxShadow:
      '0px 4px 8px 0px rgba(0, 0, 0, 0.04), 0px 12px 20px 0px rgba(0, 0, 0, 0.08)',
  },
};

const styles = {
  notificationWhite: {
    ...defaultConfiguration.style,
    backgroundColor: '#FFFFFF',
    color: '#2C2C2C',
    leftImageStyle: {
      width: '62px',
      backgroundColor: '#e6e6e6',
      padding: '10px',
      borderBottomLeftRadius: '8px 8px',
      borderTopLeftRadius: '8px 8px',
    },
    leftImage: PRODUCT,
    boxShadow: '3px 3px 5px 0 rgba(0, 0, 0, 0.1)',
  },
  notificationBlack: {
    ...defaultConfiguration.style,
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    leftImage: DIALOG,
    leftImageStyle: { width: '32px', margin: '10px' },
  },
  error: {
    ...defaultConfiguration.style,
    backgroundColor: '#D23030',
    color: '#FFFFFF',
    leftImage: INFO,
    leftImageStyle: { width: '32px', margin: '10px' },
  },
};

export const popUpTypes: Record<string, any> = {
  quantityError: {
    ...defaultConfiguration,
    style: styles.error,
    popUpMessageKey: 'error.stock_quantity',
    popUpMessage: 'Error fetching stock quantity',
  },
  leadTimeError: {
    ...defaultConfiguration,
    style: styles.error,
    popUpMessageKey: 'error.leadtime',
    popUpMessage: 'Error fetching the leadtime',
  },
  webPurifyError: {
    ...defaultConfiguration,
    style: styles.error,
    popUpMessageKey: 'error.text_purity',
    popUpMessage: 'Error verifying text',
  },
  priceError: {
    ...defaultConfiguration,
    style: styles.error,
    popUpMessageKey: 'error.price',
    popUpMessage: 'Error fetching the price',
  },
  savedConfigurationError: {
    ...defaultConfiguration,
    style: styles.error,
    popUpMessageKey: 'error.getconfiguration',
    popUpMessage: 'Error fetching the configuration',
  },
  notOrderableError: {
    ...defaultConfiguration,
    style: styles.notificationWhite,
    popUpMessageKey: 'error.Customization', //temporary until we have translations name
    popUpMessage:
      'Incomplete Customization - Please Complete Your Bag Configuration ',
  },
  // notOrderableError: {
  //   ...defaultConfiguration,
  //   style: styles.notificationBlack,
  //   popUpMessageKey: 'error.notorderable',
  //   popUpMessage: 'This product is not orderable',
  // },
  missingFieldError: {
    ...defaultConfiguration,
    style: styles.notificationBlack,
    popUpMessageKey: 'error.label.missing_field',
    popUpMessage: 'Missing field',
  },
  linkCopied: {
    ...defaultConfiguration,
    style: styles.notificationWhite,
    popUpMessageKey: 'info.share_link_copied',
    popUpMessage: 'Link copied to clipboard',
  },
  outOfStock: {
    ...defaultConfiguration,
    style: styles.error,
    popUpMessageKey: 'error.out_of_stock',
    popUpMessage: 'This product is out of stock',
  },
};
