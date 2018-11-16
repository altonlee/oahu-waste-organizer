import React from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
// import { InputData } from '../../api/data/data';

/** Renders a chart for use in EventCharts.jsx.
 * https://www.highcharts.com/blog/tutorials/highcharts-react-wrapper/
 * TODO: give Chart sample data to read
 * */
class Chart extends React.Component {
  componentDidMount() {
    const pieStyle = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Browser market shares in January, 2018',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 61.41,
          sliced: true,
          selected: true,
        }, {
          name: 'Internet Explorer',
          y: 11.84,
        }, {
          name: 'Firefox',
          y: 10.85,
        }, {
          name: 'Edge',
          y: 4.67,
        }, {
          name: 'Safari',
          y: 4.18,
        }, {
          name: 'Other',
          y: 7.05,
        }],
      }],
    };
    this.chart = new Highcharts[this.props.type || 'Chart'](
        this.chartEl,
        pieStyle
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
        <div ref={el => this.chartEl = el} />
    );
  }
}

export default Chart;