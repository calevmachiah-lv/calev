import { IAttribute, IForm } from 'store/threekitSlicer';
import { ATTRIBUTE_TYPES, METADATA_RESERVED, SORT_OPTIONS } from '../constants';

type TCurrentGroupValue = {
  assetId: string;
  name: string;
  tags: Array<string>;
  metadata: {
    Name: string;
    Size: string;
    ProductName: string;
    ProductCategory: string;
    isPlayer3D?: string;
  };
  fileSize: number;
  tagids: Array<string>;
  type: string;
  label: string;
  visible: boolean;
  enabled: boolean;
  value: string;
};
export type TCurrentGroup = {
  'MODEL Taille': {
    id: string;
    type: string;
    name: string;
    metadata: {
      cameraView?: string;
      isRotable?: string;
    };
    blacklist: Array<string>;
    assetType: string;
    values: Array<TCurrentGroupValue>;
    defaultValue: {
      assetId: string;
    };
    global: {
      id: string;
      type: string;
      name: string;
      metadata: [];
    };
    visible: boolean;
    enabled: boolean;
    hiddenValues: Array<any>;
    disabledValues: Array<any>;
    value: {
      assetId: string;
    };
  };
};

export const findModelPresentationOpen = (
  currentGroup: TCurrentGroup
): TCurrentGroup[keyof TCurrentGroup] | undefined => {
  return Object.values(currentGroup).find(
    (attribute) => attribute?.metadata?.cameraView === 'Open'
  );
};

export const findPlayerMode = (currentGroup: TCurrentGroup): string => {
  return Object.values(currentGroup)?.find((el) =>
    el.values?.find(
      (attr) =>
        attr.metadata?.isPlayer3D === 'true' &&
        attr?.assetId === el?.value?.assetId
    )
  ) !== undefined
    ? '3D'
    : '2D';
};

export const findAttributeNotRotable = (
  currentGroup: TCurrentGroup
): boolean => {
  return (
    Object.values(currentGroup).find(
      (attribute) => attribute?.metadata?.isRotable === 'false'
    ) !== undefined
  );
};

export const updateForm = (
  form: IForm,
  getIsAttributeValid: (name: string) => boolean
): Record<string, Record<string, string>> => {
  const formValidAttributes: Record<string, Record<string, string>> = {};
  Object.entries(form).forEach(([key, attributes]: any) => {
    const validAttributes: Record<string, string> = {};
    Object.entries(attributes).forEach(([key, attribute]: any) => {
      if (getIsAttributeValid(attribute.name)) {
        validAttributes[key] = attribute;
      }
    });
    if (Object.keys(validAttributes).length) {
      formValidAttributes[key] = validAttributes;
    }
  });
  return formValidAttributes;
};

export function getDefaultAttributesValues(
  attributesData: Record<string, any>
): Record<string, any> {
  const defaultAttributesValues: Record<string, any> = {};
  if (attributesData) {
    Object.keys(attributesData)?.forEach((key) => {
      if (
        attributesData[key].hasOwnProperty('defaultValue') &&
        !key.includes('Object Angle')
      ) {
        defaultAttributesValues[key] = attributesData[key].defaultValue;
      }
    });
  }
  return defaultAttributesValues;
}
interface RGBObject {
  r?: number;
  g?: number;
  b?: number;
  [key: string]: number | undefined;
}
const inflateRgb = (rgbObj: RGBObject): RGBObject => {
  return Object.entries(rgbObj).reduce(
    (output: RGBObject, [key, value]: [string, number | undefined]) => {
      if (['r', 'g', 'b'].includes(key)) {
        return { ...output, [key]: Math.round(255 * (value ?? 0)) };
      }
      return output;
    },
    {}
  );
};

interface MetadataOptions {
  imgBaseUrl?: string;
  thumbnailFromMetadata?: string;
  priceFromMetadata?: string;
  descriptionFromMetadata?: string;
  sortKeyFromMetadata?: string;
}

interface PrepAttributeOptions {
  metadataKeys?: MetadataOptions;
  sort?: string;
}

interface PrepAttributeResult {
  selected: any;
  options: any;
}
export const prepAttributeForComponent = (
  attribute: IAttribute,
  { metadataKeys, sort }: PrepAttributeOptions | any,
  mode: string = 'component'
): PrepAttributeResult | IAttribute => {
  const imgBaseUrl = metadataKeys?.imgBaseUrl;
  const thumbnailFromMetadata = metadataKeys?.thumbnailFromMetadata;
  const priceFromMetadata = metadataKeys?.priceFromMetadata;
  const descriptionFromMetadata = metadataKeys?.descriptionFromMetadata;
  const sortKeyFromMetadata = metadataKeys?.sortKeyFromMetadata;

  const thumbnailKey =
    thumbnailFromMetadata ||
    METADATA_RESERVED.thumbnailPath ||
    METADATA_RESERVED.thumbnail;
  const priceKey = priceFromMetadata || METADATA_RESERVED.price;
  const descriptionKey =
    descriptionFromMetadata || METADATA_RESERVED.description;
  const sortKey = sortKeyFromMetadata || METADATA_RESERVED.sortKey || 'name';

  let options = attribute.values;
  let selected = attribute.value;

  if (attribute.type === ATTRIBUTE_TYPES.arraySelector) {
    options = Object.entries(attribute.values).reduce(
      (output, [assetId, el]) =>
        Object.assign(output, {
          [assetId]: prepCatalogItem(el),
        }),
      {}
    );
  } else if (attribute.type === ATTRIBUTE_TYPES.asset) {
    selected = attribute.value?.assetId;
    options = attribute.values
      ? attribute.values
          .map((el: any) => prepCatalogItem(el))
          .sort((a: any, b: any) => {
            const fieldA = a[sortKey];
            const fieldB = b[sortKey];

            if (!Object.keys(SORT_OPTIONS).includes(sort)) return undefined;
            if (sort === SORT_OPTIONS.ascending)
              return fieldA < fieldB ? -1 : 1;
            if (sort === SORT_OPTIONS.descending)
              return fieldA < fieldB ? 1 : -1;
            return undefined;
          })
      : [];
  } else if (attribute.type === ATTRIBUTE_TYPES.color)
    selected = inflateRgb(attribute.value);

  function prepCatalogItem(item: any) {
    return Object.assign(
      {},
      item,
      {
        value: item.assetId,
      },
      item.metadata[thumbnailKey]
        ? !imgBaseUrl?.length &&
          (item.metadata[thumbnailKey].startsWith('#') ||
            item.metadata[thumbnailKey].startsWith('rgb'))
          ? {
              colorValue: item.metadata[thumbnailKey],
            }
          : {
              imageUrl: (imgBaseUrl || '') + item.metadata[thumbnailKey],
            }
        : undefined,
      item.metadata[priceKey]
        ? {
            price: item.metadata[priceKey],
          }
        : undefined,
      item.metadata[descriptionKey]
        ? {
            description: item.metadata[descriptionKey],
          }
        : undefined
    );
  }

  if (mode === 'component') return { selected, options };

  return { ...attribute, values: options };
};
