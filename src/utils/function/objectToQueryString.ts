import { webPurifyLanguageMappings } from './mapping';

interface NewParams {
  token?: string;
}

export const objectToQueryStr = (
  obj: object,
  newParams?: NewParams
): string => {
  if (!obj || !Object.keys(obj).length) return '';
  return Object.entries(obj).reduce((output, [key, val], i) => {
    if (i) output += '&';
    if (val !== undefined) {
      if (key === 'token') {
        output += `${key}=${newParams?.token || val}`;
      } else if (key === 'lang') {
        output += `${key}=${webPurifyLanguageMappings(val)}`;
      } else {
        output += `${key}=${val}`;
      }
    }
    return output;
  }, '?');
};