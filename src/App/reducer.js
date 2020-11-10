import geojson from './data.json';
import {
  SET_NEIGHBORHOOD,
  SET_YEAR,
  YEARS_AVAILABLE,
  DEFAULT_NEIGHBORHOOD_INFO,
} from './constants';
import { buildNeighborhoodInfo } from './utils';

const DEFAULT_STATE = {
  ...buildNeighborhoodInfo(geojson),
  geojson,
  neighborhoodID: null,
  year: null
};

export default function reducer(
  state = DEFAULT_STATE,
  action
) {
  switch (action.type) {
    case SET_NEIGHBORHOOD:
      return {
        ...state,
        neighborhoodID: action.id
      };
    case SET_YEAR:
      return {
        ...state,
        year: action.year
      }
    default:
      return state;
  }
}
