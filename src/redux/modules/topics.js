const LOAD = 'redux-example/topics/LOAD';
const LOAD_SUCCESS = 'redux-example/topics/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/topics/LOAD_FAIL';
const SAVE = 'redux-example/topics/SAVE';
const SAVE_SUCCESS = 'redux-example/topics/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/topics/SAVE_FAIL';
const UPVOTE = 'redux-example/topics/UPVOTE';
const UPVOTE_SUCCESS = 'redux-example/topics/UPVOTE_SUCCESS';
const UPVOTE_FAIL = 'redux-example/topics/UPVOTE_FAIL';

const initialState = {
  loaded: false,
  saveError: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = state.data;
      data.topics.push(action.result);
      return {
        ...state,
        data: data,
        editing: false,
        saveError: false
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: action.error
      } : state;
    case UPVOTE:
      return state;
    case UPVOTE_SUCCESS:
      return {
        ...state,
        upvoting: false,
        upvoted: true,
        data: action.result,
        error: null
      };
    case UPVOTE_FAIL:
      return {
        ...state,
        upvoting: false,
        upvoted: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.topics && globalState.topics.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/topic/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function save(topic) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: topic._id,
    promise: (client) => client.post('/topic/update', {
      data: topic
    })
  };
}

export function saveUpvote(topic) {
  return {
    types: [UPVOTE, UPVOTE_SUCCESS, UPVOTE_FAIL],
    id: topic._id,
    promise: (client) => client.post('/topic/upvote', {
      data: topic
    })
  };
}
