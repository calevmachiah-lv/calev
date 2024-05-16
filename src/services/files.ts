import FormData from 'form-data';
import { threekitRequest } from './request';
import { FILES_API_ROUTE } from '../utils/constants';

export const save = (data: any) =>
  new Promise(async (resolve) => {
    let message;
    if (!data) message = 'Requires Data';
    if (message) return resolve([undefined, { message }]);

    const fd = new FormData();
    fd.append(data.fieldname, data.buffer, data.originalname);
    const [fileResponse, error] = await postFile(fd);
    if (error) resolve([undefined, error]);
    resolve([fileResponse, undefined]);
  });

export const postFile = (formData: any): any => {
  let error;
  if (!formData) error = 'Requires Form Data';
  if (error) return [undefined, { message: error }];
  return threekitRequest({
    method: 'POST',
    url: FILES_API_ROUTE,
    formData,
  });
};
