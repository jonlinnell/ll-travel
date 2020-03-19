import { useEffect, useState, useRef } from 'react';
import api from './api';

/**
  * @name useApi.
  * @description Fetch data from a remote endpoint, with optional interval.
  *
  * @param url {string}       The URL.
  * @param interval {number}  The polling interval (in ms).
  *
  * @return response {object} The response, including data and status code.
  */
function useApi({
  endpoint,
  host,
  interval,
  method = 'get',
}) {
  const [response, setResponse] = useState(null);
  const fetchDataCallback = useRef();

  async function fetchData() {
    try {
      const data = await api(endpoint, host, method);

      setResponse(data);
    } catch (error) {
      console.error('A transport error occurred.');
      setResponse(null);
    }
  }

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  useEffect(() => {
    fetchDataCallback.current = fetchData;

    function tick() {
      fetchDataCallback.current();
    }

    if (interval) {
      const id = setInterval(tick, interval);

      return () => { clearInterval(id); };
    }
  }, [interval]);

  return response;
}

export default useApi;
