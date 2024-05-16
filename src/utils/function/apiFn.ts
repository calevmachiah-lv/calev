import { PRICE_PLACEHOLDER } from '../../utils/constants';
import currencyArray from '../currency.json';
import { t } from 'i18next';

export const getPriceWithCurrency = (price?: string | number | null, currency?: string) => {
  if (!price || !currency) {
    return t('product.label.missing_price', { defaultValue: PRICE_PLACEHOLDER });
  }
  //@ts-ignore
  const currencySymbol = currencyArray[currency] || currency || '';
  return `${price}${currencySymbol}`;
};

export const calculateLeadtime = ({
  min,
  max,
}: {
  min: number;
  max: number;
}): {
  unit: string | null;
  value: string;
} => {
  let unit, value, newMin, newMax;
  newMin = min;
  newMax = max;

  if (min <= 0 && max <= 0) return { unit: null, value: '' };

  if (min < 7) {
    unit = 'days';
  } else {
    unit = 'weeks';
    newMin = Math.floor(min / 7);
    newMax = Math.floor(max / 7);
  }

  if (newMin === newMax) {
    value = `${newMin}`;
  } else {
    value = `${newMin}/${newMax}`;
  }

  return { unit, value };
};
