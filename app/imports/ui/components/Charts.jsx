import React from 'react';
import Highcharts from 'highcharts';

/** Renders a chart for use in EventCharts.jsx.
 * https://www.highcharts.com/blog/tutorials/highcharts-react-wrapper/
 * */
class Charts extends React.Component {
  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
        this.chartEl,
        this.props.options
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

export default Charts;