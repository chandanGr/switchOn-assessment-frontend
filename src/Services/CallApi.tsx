export const setHeaders = () => {
  // const token = localStorage.get('token', true);
  const additionalHeaders: any = {};
  additionalHeaders['Content-Type'] = 'application/json';
  additionalHeaders.Accept = 'application/json';
  additionalHeaders['Cache-Control'] = 'no-cache';
  additionalHeaders.Pragma = 'no-cache';
  // if (token && token.token && token.role && token.userName && token.userGuid) {
  //   additionalHeaders.Authorization = `Bearer ${token.token}`;
  // }
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

export async function CallApi(url: string, requestType: IRequestType, data?: any) {

  if (requestType === 'GET') {
    const response = await fetch(url);
    const parsedData = await response.json();
    return parsedData;
  } else {
    const response = await fetch(url, {
      method: requestType,
      headers: setHeaders(),
      body: JSON.stringify(data),
    })
    const parsedData = await response.json();
    return parsedData;
  }

}
