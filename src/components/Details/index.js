import React from 'react';
import Map from '../Map';
import BarChart from '../BarChart';
import './styles.css';

const formatNumber = number => number.toLocaleString();

export default class Details extends React.Component {
  render() {
    const { neighborhood, barChartData, barChartLabels, geojson, bounds } = this.props;
    const { name, total, shape_area, shape_leng } = neighborhood;

    return (
      <div className="details">
        <Map
          id="side-map"
          bounds={bounds}
          geojson={geojson}
        />
        <div className="details__info">
          <h2>{name}</h2>
          <p><strong>Area:</strong> {formatNumber(shape_area)}</p>
          <p><strong>Perimeter:</strong> {formatNumber(shape_leng)}</p>
        </div>
        <p><strong>Total:</strong> {total || 0}</p>
        <BarChart
          id="bar-chart"
          data={barChartData}
          labels={barChartLabels}
        />
      </div>
    )
  }
}
