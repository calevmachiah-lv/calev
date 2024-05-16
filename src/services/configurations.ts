import { threekitRequest } from './request';
import { CONFIGURATIONS_API_ROUTE } from '../utils/constants';
import { getParams } from '../utils/function/navigationParams';
import axios from 'axios';

const location = window.location.host.includes('localhost');
const baseURL = location
  ? 'http://localhost:5000'
  : `https://${window.location.host}`;

interface ISaveParams {
  assetId: string;
  customerId?: string;
  configuration: any; //
  metadata?: Record<string, any>;
  productVersion?: string;
  thumbnailPath?: string;
  attachments?: Record<string, File>;
}
interface Attachment {
  [key: string]: string;
}
export const save = async ({
  assetId,
  customerId,
  configuration,
  metadata,
  productVersion,
  thumbnailPath,
  attachments
}: ISaveParams): Promise<[any | undefined, { message: string } | null]> => {
  if (!assetId || !configuration) {
    return [undefined, { message: 'Requires Asset Id and Configuration' }];
  }

  const requestData: any = {
    productId: assetId,
    variant: configuration,
    productVersion,
  };

  if (metadata && Object.keys(metadata).length > 0) {
    requestData.metadata = metadata;
  }

  if (customerId) {
    requestData.customerId = customerId;
  }

  if (thumbnailPath) {
    requestData.thumbnailPath = thumbnailPath;
  }

  if (attachments && Object.keys(attachments).length > 0) {
    const attachmentsPrepped: Attachment = {};
    for (const [key, file] of Object.entries(attachments)) {
      attachmentsPrepped[key] = file.name;
    }
    requestData.attachments = attachmentsPrepped;
  }

  try {
    const { appName, token, timestamp } = getParams();
    const tokenjwt = localStorage.getItem('tokenjwt') || '';
    const response = await axios.post(
      `${baseURL}/api/postConfiguration`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: { appName, token, timestamp, tokenjwt },
      }
    );

    if (response.status !== 200) {
      throw new Error('HTTP error! status: ' + response.status);
    }

    const data = response?.data;

    return [data, null];
  } catch (error) {
    console.error('Error:', error);
    return [undefined, { message: 'Internal Server Error' }];
  }
};

export const fetchThreekit = (recipeId: string) => {
  let message;
  if (!recipeId) message = 'Requires recipeId';
  if (message) return [undefined, { message }];

  return getSavedConfiguration(recipeId);
};

export const fetchAll = (): Promise<
  [any[] | undefined, { message: string } | undefined]
> =>
  new Promise(async (resolve) => {
    const [data, error]: any = await getConfigurations();
    if (error) return resolve([undefined, error]);
    resolve([data.configurations, undefined]);
  });

interface AttributeGroupingResponse {
  [groupName: string]: string[];
}

export const getAttributeGrouping = async ({
  id,
}: {
  id: string;
}): Promise<AttributeGroupingResponse | null> => {
  try {
    const firstColumnName = 'Attribute Group';
    const response = await getDatatable({
      id
    });

    if (!response) {
      return null;
    }

    const data = response?.rows?.reduce(
      (acc: AttributeGroupingResponse, element: any) => {
        const { [firstColumnName]: groupName, ...restOfObject } =
          element?.value;

        if (!groupName) {
          return acc;
        }

        return {
          ...acc,
          [groupName]: Object.values(restOfObject).filter(
            (el: any) => el.length > 0
          ),
        };
      },
      {}
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const fetchThreekitDatatableTranslations = async ({
  format = 'json',
  id,
  lng = 'Master'
}: {
  format?: string;
  id: string;
  lng: string;
}) => {
  try {
    const firstColumnName = 'Canonical Name';
    const translations = await getDatatable({ id });

    if (!translations) {
      return null;
    }

    const translationMap = translations?.rows?.reduce(
      (acc: any, element: any, rowIdx: any) => {
        if (!rowIdx) {
          return acc;
        }

        const { [firstColumnName]: groupName, ...restOfObject } =
          element?.value;

        const translationValue = restOfObject[lng];

        if (!groupName || !translationValue) {
          return acc;
        }

        return {
          ...acc,
          [groupName]: translationValue,
        };
      },
      {}
    );

    return translationMap;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const getSavedConfiguration = async (recipeId: string) => {
  let error;
  if (!recipeId) error = 'Requires Configuration ID';
  if (error) return [undefined, { message: error }];

  try {
    const { appName, token, timestamp } = getParams();
    const response = await axios.get(`/api/getCustomConfiguration`, {
      params: { recipeId, appName, token, timestamp },
    });

    if (response.status !== 200) {
      throw new Error('HTTP error! status: ' + response.status);
    }

    const data = response.data;

    return [data, null];
  } catch (error) {
    console.error('Error fetching saved configuration:', error);
    return [undefined, { message: 'Internal Server Error' }];
  }
};

export const getSavedConfigurationByProductId = (productId: string) => {
  let error;
  if (!productId) error = 'Requires Product ID';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    url: `${CONFIGURATIONS_API_ROUTE}/`,
    params: {
      productId,
    },
  });
};

export const getConfigurations = () => {
  return threekitRequest({
    method: 'GET',
    url: `${CONFIGURATIONS_API_ROUTE}`,
    includeOrgId: true,
  });
};

export const getDatatable = async ({
  id
}: any) => {
  const { appName, token, timestamp } = getParams();
  const tokenjwt = localStorage.getItem('tokenjwt') || '';
  try {
    const response = await axios.get(`${baseURL}/api/getDatatable`, {
      params: { id, appName, token, timestamp, tokenjwt },
    });

    if (response.status !== 200) {
      throw new Error('HTTP error! status: ' + response.status);
    }

    const data = response?.data;

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching datatable:', error);
    return null;
  }
};

export const getProductIdBySku = async (sku: string) => {
  try {
    const { appName, token, timestamp } = getParams();
    const response = await axios.get(`${baseURL}/api/getProductIdBySku`, {
      params: { sku, appName, token, timestamp },
    });

    if (response.status !== 200) {
      throw new Error('HTTP error! status: ' + response.status);
    }

    const data = response.data;
    return data?.configuratorId;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
