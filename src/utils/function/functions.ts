import { IAttribute } from 'store/threekitSlicer';
import { getParams } from './navigationParams';

export const isMobileScreen = (): boolean => {
  const userAgent =
    typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
  return Boolean(
    /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      userAgent
    )
  );
};

const isObject = (object: any): boolean =>
  object != null && typeof object === 'object';

export const shallowCompare = (value1: any, value2: any): boolean => {
  if (typeof value1 !== typeof value2) return false;

  if (Array.isArray(value1)) {
    if (value1.length !== value2.length) return false;
    for (let i = 0; i < value1.length; i++)
      if (value1[i] !== value2[i]) return false;
  }

  if (typeof value1 !== 'object') return value1 === value2;

  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (value1[key] !== value2[key]) {
      return false;
    }
  }

  return true;
};

export const deepCompare = (item1: any, item2: any): boolean => {
  if (typeof item1 !== typeof item2) return false;
  else if (Array.isArray(item1)) {
    if (item1.length !== item2.length) return false;
    for (let i = 0; i < item1.length; i++)
      if (!deepCompare(item1[i], item2[i])) return false;
  } else if (isObject(item1)) {
    const keys1 = Object.keys(item1);
    const keys2 = Object.keys(item2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!deepCompare(item1[key], item2[key])) return false;
    }
  } else if (item1 !== item2) return false;

  return true;
};

export const attrNameToRegExp = (name: string | RegExp): RegExp =>
  typeof name === 'string' ? new RegExp(`${name} [0-9]`) : name;

export const dataURItoFile = (dataURI: string, filename: string): File => {
  var arr = dataURI.split(','),
    //@ts-ignore
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const copyTextToClipboard = async (text: string): Promise<void> => {
  await navigator.clipboard.writeText(text);
};

export const easeInOutCubic = (val: number): number =>
  val < 0.5 ? 4 * val * val * val : 1 - Math.pow(-2 * val + 2, 3) / 2;

export const metadataValueToObject = (
  data: string
): Record<string, number | string> =>
  data.split(',').reduce((output, keVal) => {
    const [key, value] = keVal
      .trim()
      .split('=')
      .map((el) => el.trim());
    return Object.assign(output, { [key]: parseFloat(value) || value });
  }, {});

export const isEmptyObj = (obj: object): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const isEmpty = (variable: any): boolean => {
  if (variable === undefined || variable === null) {
    return true;
  }
  if (typeof variable === 'number' && isNaN(variable)) {
    return true;
  }
  if (typeof variable === 'string' && variable.trim().length > 0) {
    return false;
  }
  if (Array.isArray(variable) && variable.length > 0) {
    return false;
  }
  if (typeof variable === 'object' && Object.keys(variable).length > 0) {
    return false;
  }
  return true;
};

export const addOpacityAnimation = (
  elementId: string,
  time: number = 500,
  mode?: string
) => {
  const playerEl = document.getElementById(elementId);
  const animationToDisplay = mode
    ? `opacity-animation-${mode}`
    : 'opacity-animation';
  if (!playerEl) return;
  playerEl.classList.add(animationToDisplay);
  setTimeout(() => {
    playerEl.classList.remove(animationToDisplay);
  }, time);
};

export const createScriptIfRequired = (): void => {
  if (
    !document.querySelector(
      'script[src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"]'
    )
  ) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js';
    document.body.appendChild(script);
  }
};

export function getEventPosition(event: MouseEvent | TouchEvent) {
  if (event?.type && event.type.startsWith('touch')) {
    const touchEvent = event as TouchEvent;
    const touch = touchEvent?.changedTouches[0] || touchEvent?.touches[0];
    return { x: touch?.clientX, y: touch?.clientY };
  } else {
    const mouseEvent = event as MouseEvent;
    return { x: mouseEvent?.clientX, y: mouseEvent?.clientY };
  }
}

export function isPinchZoom(event: MouseEvent | TouchEvent) {
  if (event?.type && event?.type?.startsWith('touch')) {
    const touchEvent = event as TouchEvent;
    const touch = touchEvent.changedTouches || touchEvent.touches || [];
    return touch?.length > 1;
  } else {
    return false;
  }
}
type coordinate = { x: number; y: number };

export function isWithinTapArea(
  pos1: coordinate,
  pos2: coordinate,
  tolerance: number = 25
): boolean {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return dx * dx + dy * dy < tolerance * tolerance;
}

export const hasPatch = (): boolean => {
  const attributes3D = window.threekit?.configurator
    ?.getDisplayAttributes()
    ?.find(
      (el: any) =>
        el.values?.find(
          (attr: IAttribute) =>
            attr.metadata?.isPlayer3D == 'true' &&
            attr?.assetId == el?.value?.assetId
        )
    );

  if (!attributes3D) return false;

  const yesAttributes = window?.dataDrivenConfiguratorExtension
    ?.getStatus()
    ?.validAttributesAndTheirValues_typeB.find(
      (attr: any) => attr?.name === attributes3D?.name
    );
  const yes3D =
    yesAttributes?.values?.find((el: any) => el.selected)?.name === 'yes';
  return yes3D;
};

export const isTextAttribute = (currentGroup: Record<string, string>) => {
  let isTextAttribute = false;
  const hasPatch = Object.keys(currentGroup).findIndex(
    (element) => element === 'has patch'
  );
  const hasText = Object.keys(currentGroup).findIndex(
    (element) => element === 'perso + / patch text line 1'
  );

  const hasLockNumber = Object.keys(currentGroup).findIndex(
    (element) => element === 'has lock number'
  );
  const persoLockNumber = Object.keys(currentGroup).findIndex(
    (element) => element === 'perso + / Lock number exists'
  );

  if (
    (hasPatch !== -1 || hasLockNumber !== -1) &&
    (hasText !== -1 || persoLockNumber !== -1)
  ) {
    isTextAttribute = true;
  }
  return isTextAttribute;
};
export const isRightToLeft = (): boolean => {
  const params = getParams();
  return params.lng === 'ara' || document.documentElement.dir === 'rtl';
};

export const isRTLCharacter = (char: string): boolean => {
  const rtlCharacters = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlCharacters.test(char);
};

export const extractGroupNameFromGroupKey = (groupKey: string): string => {
  const name = groupKey.split('_').slice(1).join('-');
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getMergedAttributesAndGrouped = (
  updatedAttributes: Record<string, IAttribute>
) => {
  const mergedAttributesWithDataDriven: Record<string, IAttribute> = {};
  const mergedAttributesWithDataDrivenGrouped: Record<string, IAttribute[]> =
    {};
  const dataDrivenStatus = window?.dataDrivenConfiguratorExtension?.getStatus();
  if (dataDrivenStatus) {
    const validAttributesAndTheirValues_typeB =
      dataDrivenStatus.validAttributesAndTheirValues_typeB;
    validAttributesAndTheirValues_typeB?.forEach((attribute: any) => {
      const fullAttributeData = {
        ...attribute,
        ...updatedAttributes[attribute.name],
        values: attribute?.values?.map((value: any) => {
          return {
            ...value,
            ...updatedAttributes[attribute.name]?.values?.find(
              (el: any) => el.name === value.name
            ),
          };
        }),
      };
      mergedAttributesWithDataDriven[attribute.name] = {
        ...fullAttributeData,
      };
      if (!attribute.groupName) {
        mergedAttributesWithDataDrivenGrouped[attribute.name] = [
          fullAttributeData,
        ];
      } else if (
        !mergedAttributesWithDataDrivenGrouped[
        extractGroupNameFromGroupKey(attribute?.groupName)
        ]
      ) {
        mergedAttributesWithDataDrivenGrouped[
          extractGroupNameFromGroupKey(attribute?.groupName)
        ] = [fullAttributeData];
      } else {
        mergedAttributesWithDataDrivenGrouped[
          extractGroupNameFromGroupKey(attribute?.groupName)
        ].push(fullAttributeData);
      }
    });
    return [
      mergedAttributesWithDataDriven,
      mergedAttributesWithDataDrivenGrouped,
    ];
  }
};

export const getSelectedSkus = (
  groupedAttributes: Record<any, any>
): String[] => {
  return (
    Object.values(groupedAttributes)
      ?.map(
        (group) =>
          group
            ?.map(
              (product: any) =>
                product?.values?.find(
                  (element: any) => element?.selected === true
                )?.sku
            )
            .filter((sku: string) => sku !== 'NA')
            .toString()
      )
      .filter((item) => item?.length > 0) || ''
  );
};

export const isChooseValue = (value: any) =>
  value?.name?.toUpperCase()?.startsWith('CHOOSE');

export const getChooseValue = (values: any[]) =>
  values.find((value) => value?.name?.toUpperCase()?.startsWith('CHOOSE'));
