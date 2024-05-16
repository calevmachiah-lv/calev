import axios from 'axios';
import connection from './connection';
import { objectToQueryStr } from '../utils/function/objectToQueryString';
import { getParams } from '../utils/function/navigationParams';

interface RequestOptions {
  url: string;
  method?:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'HEAD'
    | 'OPTIONS'
    | 'CONNECT'
    | 'TRACE'
    | 'get'
    | 'post'
    | 'delete'
    | 'put';
  data?: any;
  params?: { [key: string]: any };
  config?: any;
}

export const serverRequest = (request: RequestOptions) => {
  if (!request) throw new Error('Request missing');
  const { url, method, data, params, config } = Object.assign(
    {
      method: 'GET',
      params: {},
    },
    request
  );

  const { serverUrl } = connection.getConnection();

  const urlRaw = `${serverUrl}${url}`;

  const query = objectToQueryStr(Object.assign({}, params));
  let urlPrepped = `${urlRaw}${query}`;

  return new Promise(async (resolve) => {
    let response;
    try {
      switch (method) {
        case 'GET':
        case 'get':
          response = await axios.get(urlPrepped, config);
          break;
        case 'POST':
        case 'post':
          response = await axios.post(urlPrepped, data, config);
          break;
        case 'put':
        case 'PUT':
          response = await axios.put(urlPrepped, data, config);
          break;
        case 'delete':
        case 'DELETE':
          response = await axios.delete(urlPrepped, config);
          break;
        default:
          return resolve([
            undefined,
            { message: `Unknown request method: ${method}` },
          ]);
      }
      resolve([response.data, undefined]);
    } catch (e) {
      resolve([undefined, e]);
    }
  });
};

export const threekitRequest = (request: any, env?: string) => {
  if (!request) throw new Error('Request missing');
  const { url, method, data, formData, params, config, includeOrgId } =
    Object.assign(
      {
        method: 'GET',
        params: {},
        includeOrgId: false,
      },
      typeof request === 'string' ? { url: request } : request
    );

  const { authToken, orgId, threekitEnv, isServerEnv, useProxy } =
    connection.getConnection();

  const urlRaw = `${env || threekitEnv}${url}`;

  const queryProxy = {
    cacheScope: '123',
    cacheMaxAge: '600',
  };

  const query = objectToQueryStr(
    Object.assign(
      {},
      includeOrgId ? { orgId } : {},
      params,
      useProxy && method.toLowerCase() === 'get' ? queryProxy : queryProxy
    )
  );
  let urlPrepped = `${urlRaw}${query}`;
  let configPrepped = { ...config };

  if (isServerEnv)
    configPrepped.headers = Object.assign({}, configPrepped.headers || {}, {
      authorization: `Bearer ${authToken}`,
    });
  else if (!params.bearer_token)
    urlPrepped += `${query.length ? `&` : `?`}bearer_token=${authToken}`;

  if (formData)
    configPrepped.headers = Object.assign({}, configPrepped.headers || {}, {
      'content-type': `multipart/form-data; boundary=${formData._boundary}`,
    });

  return new Promise(async (resolve) => {
    let response;
    try {
      switch (method) {
        case 'GET':
        case 'get':
          response = await axios.get(urlPrepped, configPrepped);
          break;
        case 'POST':
        case 'post':
          response = await axios.post(
            urlPrepped,
            formData || data,
            configPrepped
          );
          break;
        case 'put':
        case 'PUT':
          response = await axios.put(
            urlPrepped,
            formData || data,
            configPrepped
          );
          break;
        case 'delete':
        case 'DELETE':
          response = await axios.delete(urlPrepped, configPrepped);
          break;
        default:
          return resolve([
            undefined,
            { message: `Unknown request method: ${method}` },
          ]);
      }
      resolve([response.data, undefined]);
    } catch (e) {
      resolve([undefined, e]);
    }
  });
};

const { appName, token, timestamp } = getParams() || {};
const tokenjwt = localStorage.getItem('tokenjwt');

const location = window.location.host.includes('localhost');
const baseURL = location
  ? 'http://localhost:5000'
  : `https://${window.location.host}`;
function timeoutPromise(milliseconds: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, milliseconds);
  });
}

export const apiRequest = async (request: any) => {
  if (!request) throw new Error('Request missing');
  const { path, method, params, config, timeout, ttlTime } = Object.assign(
    {
      method: 'GET',
      params: {},
      timeout: 0,
      // ttlTime: 0,
    },
    typeof request === 'string' ? { path: request } : request
  );

  // const delay = (ms: number) => ttlTime ? new Promise(resolve => setTimeout(resolve, ms)) : null;

  try {
    // await delay(ttlTime);
    const queryParams = objectToQueryStr({
      appName,
      token,
      tokenjwt,
      timestamp,
      ...params,
    });
    const fetchUrl = `${baseURL}/api/${path}${queryParams}`;
    const fetchPromise = async () =>
      await fetch(fetchUrl, {
        method,
        ...config,
      });
    const response: any = timeout
      ? Promise.race([fetchPromise(), timeoutPromise(timeout)])
      : await fetchPromise();

    console.error(response);
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || `HTTP error! status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
