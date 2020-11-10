import {
  YEARS_AVAILABLE,
  DEFAULT_NEIGHBORHOOD_INFO,
} from './constants';

export const buildNeighborhoodInfo = (geojson) => geojson.features.reduce(
  (acc, curr) => {
    const neighborhood = curr.properties;
    const total = neighborhood.total || 0;

    acc.neighborhoods.push(neighborhood);
    acc.agg.shape_area += neighborhood.shape_area;
    acc.agg.total += total;

    if (total > acc.agg.range.top) {
      acc.agg.range.top = total;
    }

    YEARS_AVAILABLE.forEach((year) => {
      const amount = neighborhood[year] || 0;

      acc.years[year].total += amount;

      if (amount > acc.years[year].range.top) {
        acc.years[year].range.top = amount;
      }
    })

    return acc;
  },
  DEFAULT_NEIGHBORHOOD_INFO
);
