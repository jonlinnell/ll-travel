import {
  useEffect, useRef, useState,
} from 'react';
import api from './api';

const resolveArgs = (args) => {
  const defaultResponse = {
    endpoint: undefined,
    host: undefined,
    interval: undefined,
    method: 'get',
    initialFetch: true,
  };

  if (typeof args === 'string') {
    return {
      ...defaultResponse,
      endpoint: args,
    };
  }

  return {
    ...defaultResponse,
    ...args,
  };
};

/**
  * @name useApi.
  * @description Fetch data from a remote endpoint, with optional interval.
  *
  * @param url {string}       The URL.
  * @param interval {number}  The polling interval (in ms).
  *
  * @return response {object} The response, including data and status code.
  */
function useApi(args) {
  const {
    endpoint,
    host,
    interval,
    method,
    initialFetch,
  } = resolveArgs(args);

  const [state, setState] = useState({
    response: {},
    error: false,
    loading: false,
  });

  const fetchDataCallback = useRef();

  async function fetchData() {
    setState({
      ...state,
      loading: true,
    });

    try {
      const response = await api({ endpoint, host, method });

      setState({
        ...state,
        response,
        loading: false,
      });
    } catch (error) {
      setState({
        ...state,
        error,
        loading: false,
      });
    }
  }

  useEffect(() => {
    if (initialFetch) {
      fetchData();
    }
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

  return state;
}

export default useApi;
