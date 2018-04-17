const defaultStateItems = {
  isLoading: false,
  items: [],
  isFailed: null
};

const defaultStateItem = {
  isLoading: false,
  item: {},
  isFailed: null
};

export function movies(state = { items: [], defaultStateItems}, action) {
  switch (action.type) {
    case 'FETCH_DATA_LOADING':
      return {
        ...state,
        isLoading: true,
      }
    case 'FETCH_DATA_SUCCESS':
    return {
      ...state,
      isLoading: false,
      items: action.items
    }
    case 'FETCH_DATA_FAILED':
      return {
        ...state,
        isLoading: false,
        failed: action.failed
      }
    default:
      return state;
  }
}

export function movie(state = defaultStateItem, action) {
  switch (action.type) {
    case 'FETCH_DATA_LOADING':
      return {
        ...state,
        isLoading: true,
      }
    case 'FETCH_SINGLE_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        item: action.item
      }
    case 'FETCH_DATA_FAILED':
      return {
        ...state,
        isLoading: false,
        isFailed: action.isFailed
      }
    default:
      return state;
  }
}