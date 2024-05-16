import { popUpTypes } from '../../components/PopUp/PopUpType';
import { showPopUp } from '../../components/PopUp/ShowPopUp';
import { apiRequest } from '../../services/request';
import { getParams } from '../function/navigationParams';

interface FetchLeadTimeParams {
  storeCode: string;
  sku: string | undefined;
  country: string;
  isMobile: boolean;
}

//NOT SURE - need to check how the data is coming in
interface LeadTimeResponse {
  distribution_leadtime?: {
    min: number;
    max: number;
  };
  min: number;
  max: number;
}
interface FetchStockQuantityParams {
  storeCode: string;
  sku: string;
  isMobile: boolean;
}

interface StockQuantityResponse {
  totalQuantity: number;
}

interface FetchPriceParams {
  storeCode: string | undefined;
  lng: string | undefined;
  skus: String[] | String | undefined;
  country: string | undefined;
  isMobile: boolean;
}

interface PriceSpecification {
  priceCurrency: string;
  price: number;
}

interface SkuItem {
  sku: string;
  priceSpecification: PriceSpecification;
}

interface PriceResponse {
  totalPrice: number;
  currency: string;
  locale: string;
  skuList: SkuItem[];
}

interface GetProductIdParams {
  sku: string | undefined;
}

interface GetSavedConfigParams {
  recipeId: string;
  isMobile: boolean;
}

interface CheckTextPurityParams {
  text: string;
  lng: string;
  isMobile: boolean;
}

interface CheckTextResponse {
  valid: boolean;
}

interface skusAvailabilityResponse {
  items: Record<string, boolean>;
  leadTime: Record<string, number>;
  allSkusAvailable: boolean;
}

function timeoutPromise(milliseconds: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, milliseconds);
  });
}

const { appName, token, timestamp } = getParams() || {};
const tokenjwt = localStorage.getItem('tokenjwt');
const location = window.location.host.includes('localhost');
const baseURL = location
  ? 'http://localhost:5000'
  : `https://${window.location.host}`;

export const fetchConfigVariables = async (): Promise<any> => {
  try {
    const data = await apiRequest({
      method: 'GET',
      path: 'getConfigVariables',
    });
    return data || {};
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error:', errorMessage);
    return Promise.reject(errorMessage);
  }
};

export const fetchStockQuantity = async ({
  storeCode,
  sku,
  isMobile,
}: FetchStockQuantityParams): Promise<StockQuantityResponse> => {
  try {
    const data = await apiRequest({
      method: 'GET',
      path: 'getStockQuantity',
      params: {
        storeCode: String(storeCode),
        sku: String(sku),
      },
      timeout: 20000,
    });

    return data || { totalQuantity: 0 };
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error:', errorMessage);
    showPopUp({ popUpType: popUpTypes.quantityError });
    return Promise.reject(errorMessage);
  }
};

export const fetchPrice = async ({
  lng,
  skus,
  country,
}: FetchPriceParams): Promise<PriceResponse> => {
  try {
    const data = await apiRequest({
      method: 'GET',
      path: 'getPrices',
      params: {
        skus,
        lng,
        country,
      },
    });

    return data || {};
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error:', errorMessage);
    showPopUp({ popUpType: popUpTypes.priceError });
    return Promise.reject(errorMessage);
  }
};

export const getCatalogProductBySku = async ({ sku }: GetProductIdParams) => {
  try {
    const data = await apiRequest({
      method: 'GET',
      path: 'getCatalogProductBySku',
      params: {
        sku: String(sku),
      },
    });

    return data || {};
  } catch (error) {
    console.error('Error:', error.message);
    return Promise.reject(error.message);
  }
};

type savedConfig = {
  attachments?: any;
  configuration?: any;
  skus?: string[];
};

export const getSavedConfig = async ({
  recipeId,
  isMobile,
}: GetSavedConfigParams): Promise<savedConfig> => {
  try {
    const data = await apiRequest({
      method: 'GET',
      path: 'getCustomConfiguration',
      params: {
        recipeId: String(recipeId),
      },
    });

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid JSON data in response');
    }

    return data || {};
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error:', errorMessage);
    showPopUp({ popUpType: popUpTypes.getConfigurationError });
    return Promise.reject(errorMessage);
  }
};

export const checkTextPurity = async ({
  text,
  lng,
  isMobile,
}: CheckTextPurityParams): Promise<CheckTextResponse> => {
  try {
    const data = await apiRequest({
      method: 'GET',
      path: 'checkText',
      params: {
        text: String(text),
        lang: String(lng),
      },
    });

    if (data?.found === '1') {
      return { valid: false };
    } else {
      return { valid: true };
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error:', errorMessage);
    showPopUp({ popUpType: popUpTypes.webPurifyError });
    return Promise.reject(errorMessage);
  }
};

export const fetchLeadTime = async ({
  storeCode,
  sku,
  country,
}: FetchLeadTimeParams): Promise<LeadTimeResponse> => {
  try {
    const queryParams = new URLSearchParams({
      storeCode: String(storeCode),
      sku: String(sku),
      country: String(country),
      appName: String(appName),
      token: String(token),
      tokenjwt: String(tokenjwt),
      timestamp: String(timestamp),
    }).toString();
    const fetchPromise = fetch(
      `${baseURL}/api/getSkuAvailability?${queryParams}`
    );

    const response = await Promise.race([fetchPromise, timeoutPromise(20000)]);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return (
      data.distribution_leadtime || {
        distribution_leadtime: { min: 0, max: 0 },
      }
    );
  } catch (error) {
    let errorMessage: string;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'An unknown error occurred';
    }
    console.error('Error:', errorMessage);
    showPopUp({ popUpType: popUpTypes.leadTimeError });
    return Promise.reject(errorMessage);
  }
};

export const fetchSkusAvailability = async ({
  items,
  storeCode,
  appName = '',
}: {
  items: { item_id: string; qty: number }[];
  storeCode: string;
  appName?: string;
}): Promise<skusAvailabilityResponse> => {
  try {
    const data = await apiRequest({
      method: 'GET',
      path: 'getSkusAvailability',
      params: {
        items: JSON.stringify(items),
        storeCode,
        appName,
      },
    });
    return data;
  } catch (error) {
    console.error('Error:', error);
    return Promise.reject(error);
  }
};
