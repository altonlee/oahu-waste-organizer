import React from 'react';
import Highcharts from 'highcharts';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a chart for use in EventCharts.jsx.
 * https://www.highcharts.com/blog/tutorials/highcharts-react-wrapper/
 * TODO: give Chart sample data to read
 * */
class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const pieStyle = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: `${this.props.event.campus}`,
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

/** Require a document to be passed to this component. */
Chart.propTypes = {
  event: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,

};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Chart);
