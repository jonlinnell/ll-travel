import axios from 'axios';

const { API } = process.env;

/**
 * api.
 * Fetch data from a remote HTTP endpoint.
 *
 * @param {string} endpoint The endpoint on the remote host to use, e.g. '/data'.
 * @param {string} host     The host to use. Defaults to process.env.API.
 */
function api(endpoint, host = API, method = 'get') {
  const url = `${host}${endpoint}`;

  return new Promise((resolve, reject) => {
    axios[method](url)
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

export default api;
