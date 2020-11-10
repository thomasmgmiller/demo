import React from 'react';
import { Chart } from 'chart.js';

export default class BarChart extends React.Component {
  componentDidMount() {
    this.build();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      this.chart.destroy();
      this.build();
    }
  }

  setRef = (canvas) => {
    this.canvas = canvas;
  }

  build = () => {
    const { data, labels } = this.props;
    const ctx = this.canvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        display: false,
        labels: labels,
        datasets: [{
          barPercentage: 1,
          borderWidth: 0,
          backgroundColor: 'rgb(210, 34, 45)',
          data: data
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              suggestedMax: 5,
              min: 0,
              stepSize: 1
            }
          }]
        },
        legend: { display: false },
        title: { display: false },
        tooltips: { enabled: false }
      }
    });
  }

  render() {
    const { id } = this.props;

    return (
      <div id={id} className="bar-chart">
        <canvas ref={this.setRef} />
      </div>
    )
  }
}
