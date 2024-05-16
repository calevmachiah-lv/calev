import { IAttribute, IForm } from 'store/threekitSlicer';
import { ATTRIBUTE_NAME_TO_HIDE, ATTRIBUTE_TYPES } from '../constants';

type Attributes = IAttribute[] | Record<string, any>;

export const filterAttributesArray = (
  attributeName: string,
  attributes: Attributes
): Attributes => {
  const attributesRegExp =
    typeof attributeName === 'string'
      ? new RegExp(`/${attributeName}/`)
      : attributeName;

  return Array.isArray(attributes)
    ? attributes.filter((el) => attributesRegExp.test(el.name))
    : Object.entries(attributes).reduce(
      (output, [attrName, attr]) =>
        attributesRegExp.test(attrName)
          ? Object.assign(output, { [attrName]: attr })
          : output,
      {}
    );
};

export const prepAttribute = (attribute: IAttribute): IAttribute => {
  let prepped = attribute;
  // if (attribute.values[0].metadata[ATTRIBUTE_ORDER_METADATA_KEY]) {
  //     prepped = Object.assign(attribute, {
  //         values: attribute.values.sort(
  //             (a, b) =>
  //                 a.metadata[ATTRIBUTE_ORDER_METADATA_KEY] -
  //                 b.metadata[ATTRIBUTE_ORDER_METADATA_KEY]
  //         ),
  //     });
  // }
  return prepped;
};
interface CameraApi {
  getPosition(): { x: number; y: number; z: number };
  getQuaternion(): {
    x: number;
    y: number;
    z: number;
    w: number;
    _x: number;
    _y: number;
    _z: number;
    _w: number;
  };
  setPosition(cameraPosition: any): void;
  setQuaternion(quaternion: any): void;
}

interface CameraPosition {
  position: { x: number; y: number; z: number };
  quaternion: {
    x: number;
    y: number;
    z: number;
    w: number;
    _x: number;
    _y: number;
    _z: number;
    _w: number;
  };
}

export const getCameraPosition = (cameraApi: CameraApi): CameraPosition => ({
  position: cameraApi.getPosition(),
  quaternion: cameraApi.getQuaternion(),
});

export const setCameraPosition = (
  cameraApi: CameraApi,
  cameraPosition: CameraPosition
): void => {
  cameraApi.setPosition(cameraPosition.position);
  cameraApi.setQuaternion(cameraPosition.quaternion);
};

export const deflateRgb = (
  rgbObj: Record<string, number>
): Record<string, number> => {
  return Object.entries(rgbObj).reduce(
    (output: Record<string, number>, [key, value]: [string, number]) => {
      if (['r', 'g', 'b'].includes(key)) {
        return { ...output, [key]: value / 255 };
      }
      return output;
    },
    {}
  );
};

export const selectionToConfiguration = (
  value: any,
  attributeType: string
): any => {
  if (!value && value !== '') return undefined;
  let updated;
  switch (attributeType) {
    case ATTRIBUTE_TYPES.number:
      updated = value;
      break;
    case ATTRIBUTE_TYPES.asset:
      if (!isNaN(value)) updated = 'good';
      else updated = { assetId: value };
      break;
    case ATTRIBUTE_TYPES.string:
      updated = value;
      break;
    case ATTRIBUTE_TYPES.color:
      if ('r' in value) updated = deflateRgb(value);
      else updated = value;
      break;
    default:
      updated = value;
  }
  return updated;
};

export const getStepNumberByAttributeName = ({
  form,
  attributeName,
}: {
  form: IForm;
  attributeName: string;
}): number | undefined => {
  if (!form || !attributeName) return undefined;
  let fieldStep: number | undefined;
  Object.values(form).forEach((fields, num) => {
    if (Object.keys(fields).includes(attributeName)) {
      fieldStep = num;
      return;
    }
  });
  return fieldStep;
};

interface Asset {
  name: string;
  [key: string]: any;
}
export const assetsRules = (asset: Asset): boolean =>
  !ATTRIBUTE_NAME_TO_HIDE.includes(asset.name);

export const getAttributeIndex = (attributeName: string): number => {
  if (!attributeName) return -1;
  const status = window?.dataDrivenConfiguratorExtension?.getStatus();
  const validAttributesAndTheirValues = status?.validAttributesAndTheirValues_typeB;
  const attributeIndex = validAttributesAndTheirValues.findIndex(
    (attr: IAttribute | undefined) => attr?.name === attributeName
  );
  return attributeIndex;
};
