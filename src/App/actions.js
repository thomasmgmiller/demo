import {
  SET_NEIGHBORHOOD,
  SET_YEAR
} from './constants';

export const setNeighborhood = (id) => ({
  id,
  type: SET_NEIGHBORHOOD
});

export const setYear = (year) => ({
  year,
  type: SET_YEAR
});
