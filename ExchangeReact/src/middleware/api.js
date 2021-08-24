import axios from 'axios';
import * as actions from '../store/api';
import env from '../config';

const api = (store) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);
  const { onSuccess, onError, onStart } = action.payload;
  if (onStart) store.dispatch({ type: onStart });
  next(action);
  try {
    const response = await axios({
      ...action.payload,
    });

    store.dispatch({
      type: actions.apiCallSucceeded.type,
      payload: response.data,
    });
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // console.log({ myError: error })
    store.dispatch({
      type: actions.apiCallFailed.type,
      payload: error.response.data.message,
    });
    if (onError)
      store.dispatch({ type: onError, payload: error.response.data.message });
  }
};

const Head = (headerKey, headerVal) =>
  (axios.defaults.headers.common[headerKey] = headerVal);

export default api;
export const setHeader = Head;
