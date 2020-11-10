import React from 'react';
import { connect } from 'react-redux';
import selector from './selectors';
import { setNeighborhood, setYear } from './actions';
import { MAIN_MAP_BOUNDS, SIDE_MAP_BOUNDS } from './constants';
import Map from '../components/Map';
import Controls from '../components/Controls';
import Details from '../components/Details';
import './styles.css';

class App extends React.Component {

  setNeighborhood = (d) => {
    this.props.setNeighborhood(d.properties.objectid)
  }

  render() {
    const {
      geojson,
      year,
      yearsAvailable,
      range,
      neighborhood,
      colorProp,
      barChartData,
      neighborhoodGeojson
    } = this.props;

    return (
      <div className="app">
        <div className="main-map">
          <Map
            id="main-map"
            bounds={MAIN_MAP_BOUNDS}
            geojson={geojson}
            range={range}
            colorProp={colorProp}
            onClick={this.setNeighborhood}
          />
          <Controls
            onClick={this.props.setYear}
            options={yearsAvailable}
            value={year}
          />
        </div>
        {neighborhood && (
          <div className="sidebar">
            <Details
              neighborhood={neighborhood}
              barChartLabels={yearsAvailable}
              barChartData={barChartData}
              bounds={SIDE_MAP_BOUNDS}
              geojson={neighborhoodGeojson}
            />
          </div>
        )}
      </div>
    )
  }
}

const mapSateToProps = (state) => ({
  geojson: selector.get.geojson(state),
  year: selector.get.year(state),
  yearsAvailable: selector.get.yearsAvailable(state),
  colorProp: selector.memo.colorProp(state),
  range: selector.memo.range(state),
  neighborhood: selector.memo.neighborhood(state),
  neighborhoodGeojson: selector.memo.neighborhoodGeojson(state),
  barChartData: selector.memo.barChartData(state)
})

const mapDispatchToProps = {
  setNeighborhood,
  setYear
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
