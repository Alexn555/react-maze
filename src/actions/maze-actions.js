import { client, url } from './';

// for now this is required as without it will add slash (/) which result to CORS problem

export function fetchMap() {
  return dispatch => {
    dispatch({
      type: 'FETCH_MAP',
      payload: client.get(`${url}/maze-map`)
    })
  }
}

export function sendStep(map = [], wantedPos = []) {
  return dispatch => {
    dispatch({
      type: 'SEND_STEP',
	  payload: client.post(`${url}/maze-game`, { map: map, wantedPos: wantedPos })
    })
  }
}

