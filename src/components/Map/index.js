import React from 'react';
import * as d3 from 'd3';
import './styles.css';

export default class Map extends React.Component {
  componentDidMount() {
    this.setup();
  }

  componentDidUpdate(prevProps) {
    const { colorProp, geojson, id } = this.props;

    if (geojson !== prevProps.geojson) {
      d3.selectAll(`#${id} g.map path`).remove();
      this.setup();
    } else if (colorProp !== prevProps.colorProp) {
      this.update();
    }
  }

  setup = () => {
    const { bounds, geojson } = this.props;

    this.projection = d3.geoMercator();
    this.projection.fitExtent([[0, 0], bounds], geojson);
    this.geoGenerator = d3.geoPath().projection(this.projection);

    this.build();
  }

  build = () => {
    const { geojson, id, colorProp } = this.props;
    const getColor = colorProp ? this.getColorGenerator() : null;
    const color = colorProp ? d => getColor(d.properties[colorProp]) : '#6699cc';
    const map = d3.select(`#${id} g.map`)
      .selectAll('path')
      .data(geojson.features);

    map.enter()
      .append('path')
      .attr('d', this.geoGenerator)
      .attr('fill', color)
      .on('mouseover', this.handleMouseover)
      .on('mouseout', this.handleMouseout)
      .on('click', this.handleClick)
      .append('title')
        .text(d => d.properties.name);
  }

  update = () => {
    const { id, colorProp } = this.props;
    const getColor = colorProp ? this.getColorGenerator() : null;
    const color = colorProp ? d => getColor(d.properties[colorProp]) : '#6699cc';

    d3
      .selectAll(`#${id} g.map path`)
      .attr('fill', color);
  }

  handleMouseover() {
    d3.select(this).attr('opacity', '0.5');
  }

  handleMouseout(e, d) {
    d3.select(this).attr('opacity', null);
  }

  handleClick = (e, d) => {
    const { onClick } = this.props;

    if (onClick) {
      onClick(d);
    }
  }

  getColorGenerator = () => {
    const { top, bottom } = this.props.range;

    return d3
      .scaleLinear()
      .domain([bottom, top])
      .range(['#238823', '#d2222d'])
  }

  render() {
    const { id, bounds } = this.props;

    return (
      <div id={id} className="map-wrapper">
        <svg width={`${bounds[0]}px`} height={`${bounds[1]}px`}>
          <g className="map"></g>
        </svg>
      </div>
    )
  }
}
