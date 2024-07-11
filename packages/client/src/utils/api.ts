import {TOKEN_KEY, API_URL} from '../config';
import {isJSONResponse, noop} from './misc';
import {isNotEmpty} from './string';

type HeaderType = Record<string, string>;

class Api {
  async invokeApi<ResponseType, BodyType>({
    path,
    method,
    body,
    headers = {},
    contentType,
    cache = 'default'
  }: {
    path: string;
    method: string;
    body?: BodyType;
    headers?: HeaderType;
    contentType?: string;
    cache?: RequestCache;
  }): Promise<ResponseType> {
    const requestHeaders = new Headers();

    if (body !== undefined || contentType !== undefined) {
      requestHeaders.set('Content-Type', contentType || 'application/json');
    }

    for (const headerKey of Object.keys(headers)) {
      requestHeaders.set(headerKey, headers[headerKey]);
    }

    // Detect the url from the outside of the app
    // There are something we should not do with OutsidePath
    // Such as adding the token header and the ${API_URL}
    const isOutsidePath = path.startsWith('http://') || path.startsWith('https://');

    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !isOutsidePath) {
      requestHeaders.set('Authorization', 'Bearer ' + token);
    }

    try {
      const url = isOutsidePath ? path : `${API_URL}/${path}`;
      const res = await fetch(url, {
        method: method.toUpperCase(),
        body: body ? JSON.stringify(body) : undefined,
        headers: requestHeaders,
        cache
      });

      const text = await res.text();
      const responseData = isNotEmpty(text) && isJSONResponse(res) ? JSON.parse(text) : text;

      return res.ok ? responseData : Promise.reject(responseData);
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async get<ResponseType>({
    path,
    headers,
    cache
  }: {
    path: string;
    headers?: HeaderType;
    cache?: RequestCache;
  }): Promise<ResponseType> {
    return this.invokeApi<ResponseType, undefined>({method: 'get', path, headers, cache});
  }

  async post<ResponseType, BodyType = void>({
    path,
    body,
    headers,
    contentType,
    cache
  }: {
    path: string;
    body?: BodyType;
    headers?: HeaderType;
    contentType?: string;
    cache?: RequestCache;
  }): Promise<ResponseType> {
    return this.invokeApi<ResponseType, BodyType>({method: 'post', path, body, headers, contentType, cache});
  }

  async put<ResponseType, BodyType = void>({
    path,
    body,
    headers,
    contentType,
    cache
  }: {
    path: string;
    body?: BodyType;
    headers?: HeaderType;
    contentType?: string;
    cache?: RequestCache;
  }): Promise<ResponseType> {
    return this.invokeApi<ResponseType, BodyType>({method: 'put', path, body, headers, contentType, cache});
  }

  async delete<ResponseType, BodyType = void>({
    path,
    body,
    headers,
    contentType,
    cache
  }: {
    path: string;
    body?: BodyType;
    headers?: HeaderType;
    contentType?: string;
    cache?: RequestCache;
  }): Promise<ResponseType> {
    return this.invokeApi<ResponseType, BodyType>({method: 'delete', path, body, headers, contentType, cache});
  }

  async patch<ResponseType, BodyType = void>({
    path,
    body,
    headers,
    contentType,
    cache
  }: {
    path: string;
    body?: BodyType;
    headers?: HeaderType;
    contentType?: string;
    cache?: RequestCache;
  }): Promise<ResponseType> {
    return this.invokeApi<ResponseType, BodyType>({method: 'patch', path, body, headers, contentType, cache});
  }

  postSync<BodyType>({path, body}: {path: string; body: BodyType}) {
    const token = localStorage.getItem(TOKEN_KEY);
    const requestHeaders = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Authorization', `Bearer ${token}`);
    return fetch(`${API_URL}/${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: requestHeaders,
      keepalive: true
    });
  }

  async postWithFile<ResponseType>({
    path,
    formData,
    headers,
    cache
  }: {
    path: string;
    formData: FormData;
    headers?: HeaderType;
    cache?: RequestCache;
  }): Promise<ResponseType> {
    const requestHeaders = new Headers(headers);

    const isOutsidePath = path.startsWith('http://') || path.startsWith('https://');

    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !isOutsidePath) {
      requestHeaders.set('Authorization', 'Bearer ' + token);
    }

    try {
      const response = await fetch(`${API_URL}/${path}`, {
        method: 'POST',
        body: formData,
        headers: requestHeaders,
        cache
      });

      const responseData = await response.json();

      return response.ok ? responseData : Promise.reject(responseData);
    } catch (error) {
      throw new Error(String(error));
    }
  }
}

export default new Api();

export function putToS3ByPresignedUrl(
  presignedUrl: string,
  file: File | Blob,
  onProgress: (percent: number) => void = noop
): Promise<Response> {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(new Error('Put to S3 failed'));
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject(new Error('Put to S3 failed'));
    };

    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percentCompleted = (e.loaded / file.size) * 100;
        onProgress(percentCompleted);
      }
    };

    xhr.open('PUT', presignedUrl);
    // See https://github.com/aws/aws-sdk-php/issues/1691
    xhr.setRequestHeader('Cache-Control', 'private, max-age=31536000');
    xhr.send(file);
  });
}
