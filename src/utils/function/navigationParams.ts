import { IParams } from 'store/globalSettingsSlicer';
import { objectToQueryStr } from './objectToQueryString';

export function getParams(inputUrl?: string | null): IParams {
  const url = new URL(inputUrl || window.location.href);
  let params: IParams = {} as IParams;
  let strParams = '';
  if (!url.search.includes('?')) {
    const splittedPathname = url?.pathname?.split('/');
    const length = splittedPathname.length;
    strParams = splittedPathname[length - 1];
    if (strParams) {
      params = decodeParamsObj(strParams);
    }
  } else {
    params = Object.fromEntries(
      Array.from(url.searchParams.entries()).map(([key, value]) => [
        key,
        safeParseJson(value) || value,
      ])
    ) as IParams;
  }
  return params;
}

export function safeParseJson(input: string): object | null {
  try {
    return JSON.parse(input);
  } catch (e) {
    return null;
  }
}

export const paramsObjectToNavigationString = (
  params: IParams,
  isChina: boolean = false
): string => {
  const newParams: any = getParams();
  return isChina
    ? decodeURIComponent(encodeParamsObj(params))
    : objectToQueryStr(params, newParams);
};

export const encodeParamsObj = (params: IParams): string => {
  return encodeURIComponent(
    bytesToBase64(new TextEncoder().encode(JSON.stringify(params)))
  );
};

const bytesToBase64 = (bytes: Uint8Array): string => {
  const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join('');
  return btoa(binString);
};

const base64ToBytes = (base64: string): Uint8Array => {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
};

const decodeParamsObj = (params: string): IParams => {
  return JSON.parse(
    new TextDecoder().decode(base64ToBytes(decodeURIComponent(params)))
  );
};
