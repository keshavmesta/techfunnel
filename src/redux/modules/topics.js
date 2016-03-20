const LOAD = 'redux-example/topics/LOAD';
const LOAD_SUCCESS = 'redux-example/topics/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/topics/LOAD_FAIL';
const SAVE = 'redux-example/topics/SAVE';
const SAVE_SUCCESS = 'redux-example/topics/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/topics/SAVE_FAIL';

const initialState = {
  loaded: false,
  saveError: {}
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
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
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
    id: topic.id,
    promise: (client) => client.post('/topic/update', {
      data: topic
    })
  };
}
