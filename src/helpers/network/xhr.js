import jsonParser from './jsonParser';

const baseURL = 'https://pokeapi.co/api/v2';

/*************************************************** */
async function xhr(url, params, method = 'GET') {
  url = baseURL + url;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (params) {
    if (method === 'GET') {
      url += '?' + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response = await fetch(url, options);
  const result = jsonParser(response);

  return result;
}

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}
/*************************************************** */

export function get(route, params) {
  return xhr(route, params);
}
