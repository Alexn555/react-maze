const defaultState = {
  map: [],
  result: {},
  loading: false,
  errors:{}
};

export default (state=defaultState, action={}) => {
  switch (action.type) {	  
    case 'FETCH_MAP_FULFILLED': {
      return {
        ...state,
        map: action.payload.data,
        loading: false,
        errors: {}
      }
    }

    case 'FETCH_MAP_PENDING': {
      return {
        ...state,
        loading: true,
        errors: {}
      }
    }

    case 'FETCH_MAP_REJECTED': {
      return {
        ...state,
        loading: false,
        errors: { global: 'map Nothing found' }
      }
    }
	
	
	case 'SEND_STEP_PENDING': {
      return {
        ...state,
        loading: true,
        result: {}
      }
    }

    case 'SEND_STEP_FULFILLED': {
      return {
        ...state,
        result: action.payload.data,
        errors: {},
        loading: false
      }
    }
	
	case 'SEND_STEP_REJECTED': {
      return {
        ...state,
        loading: false,
        errors: { global: 'Result Not found' }
      }
    }

    default:
      return state;
  }
}
