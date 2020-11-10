export const SET_NEIGHBORHOOD = 'SET_NEIGHBORHOOD';
export const SET_YEAR = 'SET_YEAR';
export const YEARS_AVAILABLE = ['2010', '2011', '2012', '2013', '2014'];
export const MAIN_MAP_BOUNDS = ['450', '500'];
export const SIDE_MAP_BOUNDS = ['90', '100'];
export const DEFAULT_NEIGHBORHOOD_INFO = {
  neighborhoods: [],
  years: {},
  yearsAvailable: YEARS_AVAILABLE,
  agg: {
    shape_area: 0,
    total: 0,
    range: { top: 0, bottom: 0 }
  }
};

YEARS_AVAILABLE.forEach((year) => {
  DEFAULT_NEIGHBORHOOD_INFO.years[year] = {
    total: 0,
    range: {
      top: 0,
      bottom: 0
    }
  }
});
