import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

const CORS_URL = "https://cors-anywhere.herokuapp.com/";
// You need a server to act as a proxy to cors so we are using this.

const BASE_URL = CORS_URL + "https://jobs.github.com/positions.json";

function reducer(state, action) {
  //whatever we pass the dispatch goes to this action & state is state
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] }; //making a new request for search

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };

    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error };

    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    const cancelToken = axios.CancelToken.source(); //for canceling request

    axios
      .get(BASE_URL, {
        cancelToken: cancelToken.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
      });

    return () => {
      cancelToken.cancel();
    };
    // cleanup code for cancel token request
  }, [params, page]);

  return state;
}
