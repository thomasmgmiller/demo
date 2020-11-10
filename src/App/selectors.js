import { createSelector } from 'reselect';

const getState = (state) => state.app;
const getGeojson = (state) => getState(state).geojson;
const getNeighborhoods = (state) => getState(state).neighborhoods;
const getNeighborhoodID = (state) => getState(state).neighborhoodID;
const getYear = (state) => getState(state).year;
const getYears = (state) => getState(state).years;
const getYearsAvailable = (state) => getState(state).yearsAvailable;
const getShapeArea = (state) => getState(state).agg.shape_area;
const getTotal = (state) => getState(state).agg.total;
const getRange = (state) => getState(state).agg.range;

const getNeighborhoodMemo = createSelector(
  [getNeighborhoodID, getNeighborhoods],
  (id, neighborhoods) => {
    return neighborhoods.find(({objectid}) => id === objectid);
  }
);

const getRangeMemo = createSelector(
  [getYear, getYears, getRange],
  (year, years, range) => {
    const showAll = year === null;

    return showAll ? range : years[year].range
  }
);

const getColorPropertyMemo = createSelector(
  [getYear],
  (year) => {
    const showAll = year === null;

    return showAll ? 'total' : year
  }
);

const getBarChartDataMemo = createSelector(
  [getNeighborhoodMemo, getYearsAvailable],
  (neighborhood, yearsAvailable) => (
    yearsAvailable.map(year => (neighborhood || {})[year] || 0)
  )
);

const getNeighborhoodGeojsonMemo = createSelector(
  [getNeighborhoodID, getGeojson],
  (id, geojson) => {
    const neighborhood = geojson.features.find(({ properties }) => id === properties.objectid);

    return {
      ...geojson,
      features: [neighborhood]
    }
  }
)

const selectors = {
  get: {
    state: getState,
    geojson: getGeojson,
    neighborhoodID: getNeighborhoodID,
    neighborhoods: getNeighborhoods,
    year: getYear,
    yearsAvailable: getYearsAvailable,
    area: getShapeArea,
    total: getTotal,
    years: getYears
  },
  memo: {
    neighborhood: getNeighborhoodMemo,
    range: getRangeMemo,
    colorProp: getColorPropertyMemo,
    barChartData: getBarChartDataMemo,
    neighborhoodGeojson: getNeighborhoodGeojsonMemo,
  }
}

export default selectors;
