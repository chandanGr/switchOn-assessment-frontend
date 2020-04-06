export const setHeaders = () => {
  const additionalHeaders: any = {};
  additionalHeaders['Content-Type'] = 'application/json';
  additionalHeaders.Accept = 'application/json';
  additionalHeaders['Cache-Control'] = 'no-cache';
  additionalHeaders.Pragma = 'no-cache';
  return additionalHeaders;
};

export const postDataOptions = (url: string, data: any = {}) => {
  let options: any;
  if (data) {
    options.data = data;
  }
  options.headers = setHeaders();
  return options;
};

async function postRequest(url: string, body: any, headers: {}) {
  try {
    const resposne = await fetch(url, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    });
    const parsedResponse = await resposne.json();
    JSON.stringify(body);
    return parsedResponse;
  } catch (error) {
    return Promise.reject(error);
  }
}

type IRequestType = 'POST' | 'GET';
const REACT_APP_BASE_APP_URL = "https://assessment-demo.herokuapp.com";

export async function CallApi(url: string, requestType: IRequestType, data?: any) {
  if (requestType === 'GET') {
    const response = await fetch(REACT_APP_BASE_APP_URL + url, {
      method: requestType,
      headers: setHeaders(),
    });
    const parsedData = await response.json();
    return parsedData;
  } else {
    const response = await fetch(REACT_APP_BASE_APP_URL + url, {
      method: requestType,
      headers: setHeaders(),
      body: JSON.stringify(data),
    })
    const parsedData = await response.json();
    return parsedData;
  }

}
