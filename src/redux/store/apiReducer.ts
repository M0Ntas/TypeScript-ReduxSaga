const defaultState = {
  beers: []
}

export const GET_BEERS = "GET_BEERS";
export const FETCH_BEERS = "FETCH_BEERS";
export const DELETE_BEERS = "DELETE_BEERS";

interface Action {
  type: string
  payload?: string | object
}

export const beersReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case GET_BEERS:
      return {...state, beers: action.payload}
    case DELETE_BEERS:
      return {...state, beers: action.payload}
  }
  return state
};

export const getBeers = (payload?: string | object) => ({type: GET_BEERS, payload});
export const deleteBeers = (payload?: string | object) => ({type: DELETE_BEERS, payload})
export const fetchBeers = () => ({type: FETCH_BEERS});
